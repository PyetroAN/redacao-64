import { useEffect } from 'react';
import { useGameStore } from './store/useGameStore';

// Componentes
import { NewspaperCard } from './components/NewspaperCard';
import { GameControls } from './components/GameControls';
import { SettingsModal } from './components/SettingsModal';
import { StartScreen } from './components/StartScreen';
import { EndScreen } from './components/EndScreen';
import { MailModal } from './components/MailModal';
import { CriticalOverlay } from './components/CriticalOverlay';
import { TutorialModal } from './components/TutorialModal'; // <--- ADIÇÃO AQUI

// Ícones
import { Settings, Siren, Users, Wallet, Mail } from 'lucide-react';

function App() {
  const { 
    screen,
    toggleScreen,
    initGame,
    currentNews, 
    money, censorMeter, publicMeter,
    // Estados do Correio
    mailQueue,
    isMailOpen,
    openMail
  } = useGameStore();

  // Inicia música na primeira interação do usuário
  useEffect(() => {
    const handleInteract = () => initGame();
    window.addEventListener('click', handleInteract, { once: true });
    return () => window.removeEventListener('click', handleInteract);
  }, []);

  // Cores dinâmicas para a barra do Censor
  const getCensorColor = () => {
      if (censorMeter > 70) return 'text-red-500 animate-pulse';
      if (censorMeter > 40) return 'text-yellow-500';
      return 'text-green-500';
  };

  const getCensorBarColor = () => {
      if (censorMeter > 70) return 'bg-red-600';
      if (censorMeter > 40) return 'bg-yellow-500';
      return 'bg-green-600';
  };

  return (
    <div className="h-[100dvh] w-full bg-[#121212] relative overflow-hidden font-body select-none">
       {/* 
          OVERLAY CRÍTICO (Prioridade Máxima de Z-Index)
          Aparece por cima de tudo quando há Game Over dramático
       */}
       <CriticalOverlay />

       {/* === CAMADA DE FUNDO (Mesa e Textura) === */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40 mix-blend-multiply pointer-events-none" />
       <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

       {/* === CAMADA DE MODAIS (Sobreposição Global) === */}
       {screen === 'SETTINGS' && <SettingsModal />}
       {isMailOpen && <MailModal />}

       {/* === ROTEAMENTO DE TELAS === */}

       {/* 1. MENU INICIAL */}
       {screen === 'MENU' && <StartScreen />}

       {/* 2. TUTORIAL (NOVO) */}
       {screen === 'TUTORIAL' && <TutorialModal />}

       {/* 3. TELA FINAL (Epílogos) */}
       {screen === 'ENDING' && <EndScreen />}

       {/* 4. TELA DE JOGO (Gameplay Principal) */}
       {screen === 'GAME' && (
         <div className="h-full w-full flex flex-col relative z-10">
            
            {/* --- HEADER / HUD (Visual Deluxe) --- */}
            <header className="w-full bg-[#1a1a1a] border-b-4 border-[#8b0000] shadow-2xl z-40 relative">
                {/* Linha Superior: Título e Ano */}
                <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="font-headline text-2xl text-[#f0e6d2] tracking-widest drop-shadow-md">
                        REDAÇÃO <span className="text-red-700">64</span>
                    </h1>
                </div>

                {/* Linha Inferior: Status Bars Coloridas */}
                <div className="bg-[#0a0a0a] w-full border-t border-stone-800 py-2">
                    <div className="max-w-md mx-auto px-4 grid grid-cols-3 gap-4 text-xs font-bold font-mono tracking-wide">
                        
                        {/* Caixa (Verde) */}
                        <div className="flex flex-col">
                            <span className="text-stone-500 text-[10px] uppercase mb-0.5 flex items-center gap-1">
                                <Wallet size={10} /> Caixa
                            </span>
                            <span className="text-green-400 text-lg drop-shadow-sm">Cr$ {money}</span>
                        </div>

                        {/* Censor (Dinâmico) */}
                        <div className="flex flex-col justify-center">
                            <div className="flex justify-between text-[10px] uppercase mb-1">
                                <span className="text-stone-500 flex items-center gap-1"><Siren size={10}/> Censor</span>
                                <span className={getCensorColor()}>{censorMeter}%</span>
                            </div>
                            <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden border border-stone-700">
                                <div 
                                    className={`h-full transition-all duration-500 ${getCensorBarColor()}`} 
                                    style={{ width: `${censorMeter}%` }}
                                />
                            </div>
                        </div>

                        {/* Povo (Azul) */}
                        <div className="flex flex-col justify-center">
                            <div className="flex justify-between text-[10px] uppercase mb-1">
                                <span className="text-stone-500 flex items-center gap-1"><Users size={10}/> Povo</span>
                                <span className="text-blue-400 font-bold">{publicMeter}%</span>
                            </div>
                            <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden border border-stone-700">
                                <div 
                                    className="h-full bg-blue-500 transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                                    style={{ width: `${publicMeter}%` }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* --- ÍCONE DE CORREIO (Notificação) --- */}
            {mailQueue.length > 0 && (
                <div className="absolute top-36 right-4 z-30 animate-bounce">
                    <button 
                        onClick={openMail}
                        className="relative bg-[#f0e6d2] p-3 rounded-full border-2 border-[#8b0000] shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-110 transition active:scale-95 group"
                    >
                        <Mail className="text-[#8b0000] group-hover:text-red-600 transition" size={24} />
                        {/* Badge de quantidade */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                            <span className="text-[10px] text-white font-bold">{mailQueue.length}</span>
                        </div>
                    </button>
                </div>
            )}

            {/* --- BOTÃO CONFIGURAÇÕES (In-Game) --- */}
            <button 
                onClick={() => toggleScreen('SETTINGS')}
                className="absolute top-4 right-4 z-50 text-stone-500 hover:text-[#f0e6d2] transition opacity-50 hover:opacity-100"
            >
                <Settings size={20} />
            </button>

            {/* --- ÁREA CENTRAL (Jornal) --- */}
            <main className="flex-1 w-full flex flex-col items-center justify-center p-4 relative z-10 max-w-md mx-auto">
                {currentNews && <NewspaperCard news={currentNews} />}
            </main>

            {/* --- CONTROLES INFERIORES --- */}
            <div className="w-full max-w-md mx-auto pb-6 px-4 relative z-20">
                <GameControls />
            </div>
         </div>
       )}
    </div>
  );
}

export default App;