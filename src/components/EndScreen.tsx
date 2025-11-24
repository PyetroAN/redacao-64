import { useGameStore } from '../store/useGameStore';
import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export const EndScreen = () => {
    const { scorePeople, scoreGov, money, censorMeter, publicMeter, toggleScreen } = useGameStore();
    
    // Referência para controlar a música e poder pará-la ao sair
    const musicRef = useRef<Howl | null>(null);

    // 1. DETERMINAÇÃO DO FINAL (Lógica Visual)
    let endingTitle = "";
    let endingDesc = "";
    let endingType = "";

    // Checagem de Game Overs (Derrotas)
    if (money <= 0) {
        endingTitle = "FALÊNCIA DECRETADA";
        endingDesc = "Sem recursos para manter as impressoras rodando, o jornal fechou as portas. O silêncio tomou conta da redação.";
        endingType = "FAIL";
    } else if (publicMeter <= 0) {
        endingTitle = "IRRELEVÂNCIA TOTAL";
        endingDesc = "O jornal perdeu a confiança do povo. As pilhas de jornais encalhados nas bancas são o triste fim da sua editoria.";
        endingType = "FAIL";
    } else if (censorMeter <= 0) {
        endingTitle = "INTERVENÇÃO MILITAR";
        endingDesc = "Seu jornal foi considerado subversivo. O DOPS lacrou a redação e você foi levado para interrogatório.";
        endingType = "FAIL";
    } else if (censorMeter >= 100) {
        endingTitle = "REVOLTA POPULAR";
        endingDesc = "Visto como porta-voz da ditadura, seu jornal foi invadido por manifestantes enfurecidos. Tudo foi destruído.";
        endingType = "FAIL";
    } 
    // Checagem de Vitórias (Sobreviveu ao deck)
    else {
        if (scorePeople > scoreGov) {
            endingTitle = "A VOZ DA RESISTÊNCIA";
            endingDesc = "Você caminhou no fio da navalha, mas manteve a verdade viva. Seu jornal se tornou um símbolo de esperança para a redemocratização que virá.";
            endingType = "PEOPLE";
        } else if (scoreGov > scorePeople) {
            endingTitle = "O JORNAL CHAPA BRANCA";
            endingDesc = "Você sobreviveu e lucrou, mas a custo da verdade. Seu jornal se tornou o veículo oficial do regime, ignorando os gritos das ruas.";
            endingType = "GOV";
        } else {
            endingTitle = "EQUILÍBRIO SILENCIOSO";
            endingDesc = "Você navegou pelas águas turvas da censura sem afundar, mas também sem grandes heroísmos. O jornal sobrevive, mas a que custo moral?";
            endingType = "NEUTRAL";
        }
    }

    // 2. EFEITO SONORO (Lógica de Áudio)
    useEffect(() => {
        // Define qual arquivo tocar baseado no endingType calculado acima
        let soundFile = '/sounds/ending_fail.mp3'; // Padrão para derrotas

        if (endingType === 'PEOPLE') soundFile = '/sounds/ending_people.mp3';
        else if (endingType === 'GOV') soundFile = '/sounds/ending_gov.mp3';
        else if (endingType === 'NEUTRAL') soundFile = '/sounds/ending_neutral.mp3';

        // Configura o Howl
        const sound = new Howl({
            src: [soundFile],
            volume: 0.5,
            loop: true, // Música de final fica em loop
            // fade: true
        });

        // Toca e salva na referência
        sound.play();
        sound.fade(0, 0.5, 2000); // Fade in suave de 2 segundos
        musicRef.current = sound;

        // Limpeza de segurança (caso o componente desmonte forçadamente)
        return () => {
            sound.stop();
        };
    }, [endingType]);

    // 3. HANDLER PARA SAIR
    const handleBackToMenu = () => {
        // Para a música atual antes de trocar de tela
        if (musicRef.current) {
            musicRef.current.stop();
        }
        toggleScreen('MENU');
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative z-10 text-[#f0e6d2] text-center bg-black/95 animate-in fade-in duration-1000">
            <h2 className="font-subhead text-xl italic mb-4 text-stone-400">Fim da Linha</h2>
            
            <h1 className="font-headline text-4xl md:text-6xl mb-6 text-white uppercase border-b-2 border-red-800 pb-4 tracking-widest drop-shadow-lg">
                {endingTitle}
            </h1>

            <p className="font-body text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
                "{endingDesc}"
            </p>

            {/* Placar Final (Só aparece se não foi Game Over técnico) */}
            {endingType !== 'FAIL' && (
                <div className="grid grid-cols-2 gap-8 mb-12 font-mono text-sm border p-4 border-stone-600 bg-stone-900/50">
                    <div className="text-right border-r border-stone-700 pr-4">
                        <span className="block text-stone-500 uppercase text-xs mb-1">Aliados ao Povo</span>
                        <span className="text-3xl text-blue-400 font-bold">{scorePeople}</span>
                    </div>
                    <div className="text-left pl-4">
                        <span className="block text-stone-500 uppercase text-xs mb-1">Apoio ao Regime</span>
                        <span className="text-3xl text-green-400 font-bold">{scoreGov}</span>
                    </div>
                </div>
            )}

            <button 
                onClick={handleBackToMenu}
                className="bg-[#f0e6d2] text-[#1a1a1a] px-8 py-4 font-bold uppercase tracking-widest hover:scale-105 hover:bg-white transition shadow-[0_0_15px_rgba(240,230,210,0.2)]"
            >
                Voltar ao Menu
            </button>
        </div>
    );
};