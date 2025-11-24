import { useGameStore } from '../store/useGameStore';
import { Play, BookOpen, GraduationCap, Settings } from 'lucide-react';

export const StartScreen = () => {
    const { startGame, toggleScreen } = useGameStore();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 relative z-10 text-[#f0e6d2]">
            <div className="mb-12 text-center">
                <h1 className="font-headline text-6xl md:text-7xl mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    REDAÇÃO <span className="text-red-700">64</span>
                </h1>
                <p className="font-body text-sm uppercase tracking-[0.4em] opacity-80">
                    A Imprensa sob Censura
                </p>
            </div>

            <div className="w-full max-w-xs flex flex-col gap-4">
                <button 
                    onClick={startGame}
                    className="group relative bg-[#f0e6d2] text-[#1a1a1a] h-16 w-full font-headline font-bold text-xl uppercase tracking-widest hover:scale-105 transition shadow-lg flex items-center justify-center gap-2"
                >
                    <Play fill="black" size={18} /> Iniciar
                </button>

                {/* Botão Tutorial Atualizado */}
                <button 
                    onClick={() => toggleScreen('TUTORIAL')}
                    className="border border-[#f0e6d2] text-[#f0e6d2] h-12 w-full font-body font-bold text-sm uppercase tracking-widest hover:bg-[#f0e6d2] hover:text-[#1a1a1a] transition flex items-center justify-center gap-2"
                >
                    <BookOpen size={16} /> Tutorial
                </button>
                
                <button 
                    className="border border-[#f0e6d2] text-[#f0e6d2] h-12 w-full font-body font-bold text-sm uppercase tracking-widest hover:bg-[#f0e6d2] hover:text-[#1a1a1a] transition flex items-center justify-center gap-2"
                >
                    <GraduationCap size={16} /> Área do Professor
                </button>
            </div>

            {/* Configurações (Canto) */}
            <button 
                onClick={() => toggleScreen('SETTINGS')}
                className="absolute top-6 right-6 p-2 bg-[#1a1a1a] border border-[#f0e6d2] rounded-full hover:rotate-90 transition duration-500"
            >
                <Settings size={24} />
            </button>
            
            <div className="absolute bottom-6 text-xs font-mono text-stone-500">
                v1.0.0 - Projeto Universitário
            </div>
        </div>
    );
};