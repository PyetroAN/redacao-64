import { create } from 'zustand';
import type { NewsItem, Impact, Letter } from '../types/game';
import { HEADLINES, FILLERS, LETTERS } from '../data/content'; 
import { Howl } from 'howler';

// --- CONFIGURAÇÃO DE ÁUDIO GLOBAL ---
const bgMusic = new Howl({ 
    src: ['/sounds/music_bg.mp3'], 
    loop: true, 
    volume: 0.3,
    html5: true,
    preload: true
});

interface GameState {
  // Telas e Navegação
  screen: 'MENU' | 'TUTORIAL' | 'GAME' | 'SETTINGS' | 'ENDING' | 'TEACHERS_GUIDE';
  previousScreen: 'MENU' | 'TUTORIAL' | 'GAME' | 'SETTINGS' | 'ENDING' | 'TEACHERS_GUIDE' | null; 
  
  // Tutorial Check
  hasSeenTutorial: boolean; // NOVO
  completeTutorial: () => void; // NOVO

  // Stats Principais
  money: number;
  censorMeter: number; // 0 a 100
  publicMeter: number; // 0 a 100
  
  // Pontuação Oculta (Define o Final)
  scorePeople: number;
  scoreGov: number;
  
  // Loop Principal (Notícias)
  deck: NewsItem[];
  currentIndex: number;
  currentNews: NewsItem | null;
  lastAction: 'CENSURADO' | 'PUBLICADO' | 'ALTERADO' | null; 
  
  // Sistema de Cartas (Correio)
  mailQueue: Letter[];         
  activeLetter: Letter | null; 
  isMailOpen: boolean;         
  usedLetterIds: string[];     
  
  // Controle de Cutscene (Evento Crítico)
  criticalEvent: {
    type: 'money' | 'censor' | 'public';
    value: 'EMPTY' | 'FULL'; 
  } | null;
  
  gameOverReason: 'BANKRUPTCY' | 'CENSORED' | 'RIOT' | 'IRRELEVANT' | 'VICTORY' | null;

  // Configurações
  musicVolume: number;
  sfxVolume: number;
  
  // Ações
  initGame: () => void;
  startGame: () => void;
  stopMusic: () => void;
  handleAction: (action: 'PUBLISH' | 'CENSOR') => void;
  applyAlteration: (optionId: string) => void;
  
  openMail: () => void;
  closeMail: () => void;
  handleLetterDecision: (accepted: boolean) => void;
  
  setVolume: (type: 'music' | 'sfx', val: number) => void;
  toggleScreen: (screen: GameState['screen']) => void;
}

// Helper para embaralhar arrays
const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const useGameStore = create<GameState>((set, get) => ({
  // --- ESTADOS INICIAIS ---
  screen: 'MENU',
  previousScreen: null,
  hasSeenTutorial: false, // Começa como false
  
  money: 500,
  censorMeter: 50,
  publicMeter: 50,
  
  scorePeople: 0,
  scoreGov: 0,
  
  deck: [],
  currentIndex: 0,
  currentNews: null,
  lastAction: null,
  
  mailQueue: [],
  activeLetter: null,
  isMailOpen: false,
  usedLetterIds: [], 
  
  criticalEvent: null,
  gameOverReason: null,
  
  musicVolume: 0.3,
  sfxVolume: 0.5,

  // --- MÉTODOS DE SISTEMA ---
  
  initGame: () => {
      if (!bgMusic.playing()) bgMusic.play();
  },

  stopMusic: () => {
      bgMusic.stop();
  },

  setVolume: (type, val) => {
      if (type === 'music') {
          bgMusic.volume(val);
          set({ musicVolume: val });
      } else {
          set({ sfxVolume: val });
      }
  },

  toggleScreen: (target) => {
      const current = get().screen;
      if (target === 'SETTINGS') {
          set({ screen: 'SETTINGS', previousScreen: current === 'SETTINGS' ? 'MENU' : current });
      } else if (target === 'MENU') {
          set({ screen: 'MENU' });
      } else {
          set({ screen: target });
      }
  },

  // Finaliza o tutorial e vai para o jogo
  completeTutorial: () => {
      set({ hasSeenTutorial: true, screen: 'GAME' });
  },

  // --- INÍCIO DO JOGO ---
  startGame: () => {
    // Garante que música toca ao (re)iniciar
    if (!bgMusic.playing()) bgMusic.play();
    
    const { hasSeenTutorial } = get();

    set({ 
        money: 500, censorMeter: 50, publicMeter: 50, 
        scorePeople: 0, scoreGov: 0, 
        currentIndex: 0, lastAction: null, 
        
        // SE JÁ VIU O TUTORIAL, VAI PRO JOGO. SE NÃO, VAI PRO TUTORIAL.
        screen: hasSeenTutorial ? 'GAME' : 'TUTORIAL',
        
        mailQueue: [], activeLetter: null, isMailOpen: false, 
        usedLetterIds: [],
        criticalEvent: null, gameOverReason: null 
    });

    // Lógica de Construção do Deck
    const availableHeadlines = shuffle([...HEADLINES]).slice(0, 12); 
    const availableFillers = shuffle([...FILLERS]);
    const finalDeck: NewsItem[] = [];

    availableHeadlines.forEach((headline) => {
        const fillerCount = Math.random() > 0.5 ? 3 : 4;
        const fillerChunk = availableFillers.splice(0, fillerCount);
        finalDeck.push(...fillerChunk);
        finalDeck.push(headline);
    });

    if (finalDeck.length > 0) {
        set({ deck: finalDeck, currentNews: finalDeck[0] });
    }
  },

  // --- LÓGICA DE ALTERAÇÃO DE TEXTO ---
  applyAlteration: (optionId) => {
    const { currentNews } = get();
    if (!currentNews || !currentNews.alterOptions) return;

    const option = currentNews.alterOptions.find((o: any) => o.id === optionId);
    if (!option) return;

    set({
      currentNews: {
        ...currentNews,
        isAltered: true,
        currentBody: option.text,
        currentTitle: option.title || currentNews.title,
        currentImpact: option.impactModifier
      }
    });
  },

  // --- LÓGICA DE CARTAS ---
  openMail: () => {
      const queue = get().mailQueue;
      if (queue.length > 0) {
          set({ isMailOpen: true, activeLetter: queue[0] });
      }
  },

  closeMail: () => {
      set({ isMailOpen: false, activeLetter: null });
  },

  handleLetterDecision: (accepted) => {
      const { activeLetter, deck, currentIndex, money, censorMeter, publicMeter, mailQueue } = get();
      if (!activeLetter) return;

      let impact: Impact = {};
      let newDeck = [...deck];

      if (accepted) {
          impact = activeLetter.acceptImpact || {};
          if (activeLetter.newsReward) {
              newDeck.splice(currentIndex + 1, 0, activeLetter.newsReward);
          }
      } else {
          impact = activeLetter.refuseImpact || {};
      }

      const newMoney = money + (impact.money || 0);
      const newCensor = Math.max(0, Math.min(100, censorMeter + (impact.censor || 0)));
      const newPublic = Math.max(0, Math.min(100, publicMeter + (impact.public || 0)));

      const newQueue = mailQueue.slice(1);

      set({ 
          money: newMoney, censorMeter: newCensor, publicMeter: newPublic,
          deck: newDeck,
          mailQueue: newQueue, isMailOpen: false, activeLetter: null 
      });
  },

  // --- LOOP PRINCIPAL (AÇÃO) ---
  handleAction: (action) => {
    const { currentNews, money, censorMeter, publicMeter, currentIndex, deck, scorePeople, scoreGov } = get();
    if (!currentNews) return;

    // 1. Feedback Visual Imediato (Carimbo)
    set({ lastAction: action === 'CENSOR' ? 'CENSURADO' : 'PUBLICADO' });

    // Delay para animação do carimbo
    setTimeout(() => {
        // --- CÁLCULO DE IMPACTO ---
        let impact: Impact = {};

        if (action === 'CENSOR') {
            impact = currentNews.censorImpact;
            if (currentNews.type === 'EXTRA_EDITION') {
                impact = { ...impact, money: 0 }; 
            }
        } else {
            impact = currentNews.isAltered && currentNews.currentImpact 
                ? currentNews.currentImpact 
                : currentNews.publishImpact;
        }

        const newMoney = money + (impact.money || 0);
        const newCensor = Math.max(0, Math.min(100, censorMeter + (impact.censor || 0)));
        const newPublic = Math.max(0, Math.min(100, publicMeter + (impact.public || 0)));

        // --- CÁLCULO DE PONTUAÇÃO OCULTA ---
        let newScorePeople = scorePeople;
        let newScoreGov = scoreGov;

        if (currentNews.alignment) {
            if (currentNews.alignment === 'PRO_PEOPLE') {
                if (action === 'PUBLISH') newScorePeople++;
                else newScoreGov++;
            } else if (currentNews.alignment === 'PRO_GOVERNMENT') {
                if (action === 'PUBLISH') newScoreGov++;
                else newScorePeople++;
            }
        }

        // --- DETECÇÃO DE EVENTO CRÍTICO (GAME OVER) ---
        let criticalType: 'money' | 'censor' | 'public' | null = null;
        let criticalValue: 'EMPTY' | 'FULL' = 'EMPTY';
        let reason: GameState['gameOverReason'] = null;

        if (newMoney <= 0) {
            criticalType = 'money'; criticalValue = 'EMPTY'; reason = 'BANKRUPTCY';
        } else if (newPublic <= 0) {
            criticalType = 'public'; criticalValue = 'EMPTY'; reason = 'IRRELEVANT';
        } else if (newCensor <= 0) {
            criticalType = 'censor'; criticalValue = 'EMPTY'; reason = 'CENSORED';
        } else if (newCensor >= 100) {
            criticalType = 'censor'; criticalValue = 'FULL'; reason = 'RIOT';
        }

        // SE HOUVE DERROTA: Toca Cutscene e Para Música
        if (criticalType) {
            bgMusic.stop(); 

            set({ 
                money: newMoney, censorMeter: newCensor, publicMeter: newPublic,
                criticalEvent: { type: criticalType, value: criticalValue } 
            });

            setTimeout(() => {
                set({ 
                    criticalEvent: null,
                    screen: 'ENDING', 
                    gameOverReason: reason,
                    lastAction: null
                });
            }, 4000);
            
            return; 
        }

        // --- CONTINUAÇÃO NORMAL ---
        
        // Lógica de Cartas Aleatórias
        const { mailQueue, usedLetterIds } = get();
        let newMailQueue = mailQueue;
        let newUsedIds = usedLetterIds;

        if (mailQueue.length === 0 && Math.random() < 0.20) {
            const availableLetters = LETTERS.filter(l => !usedLetterIds.includes(l.id));
            if (availableLetters.length > 0) {
                const randomLetter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
                newMailQueue = [...mailQueue, randomLetter];
                newUsedIds = [...usedLetterIds, randomLetter.id];
            }
        }

        const nextIndex = currentIndex + 1;
        
        // CHECAGEM DE VITÓRIA (Fim do Deck)
        if (nextIndex >= deck.length) {
            bgMusic.stop(); 
            
            set({ 
                screen: 'ENDING', 
                gameOverReason: 'VICTORY',
                scorePeople: newScorePeople, scoreGov: newScoreGov,
                lastAction: null 
            });
        } else {
            set({ 
                money: newMoney, 
                censorMeter: newCensor, 
                publicMeter: newPublic,
                scorePeople: newScorePeople, 
                scoreGov: newScoreGov,
                currentIndex: nextIndex, 
                currentNews: deck[nextIndex], 
                lastAction: null,
                mailQueue: newMailQueue,
                usedLetterIds: newUsedIds
            });
        }

    }, 800);
  }
}));