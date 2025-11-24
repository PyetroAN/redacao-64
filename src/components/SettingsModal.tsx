import { useGameStore } from '../store/useGameStore';
import { Volume2, Music } from 'lucide-react';

export const SettingsModal = () => {
    const { musicVolume, sfxVolume, setVolume, toggleScreen, previousScreen } = useGameStore();

    return (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-body">
            <div className="bg-[#1a1a1a] border-2 border-[#f0e6d2] p-8 w-full max-w-md shadow-2xl relative text-[#f0e6d2]">
                <h2 className="font-headline text-3xl mb-8 text-center uppercase tracking-widest border-b border-stone-700 pb-4">
                    Configurações
                </h2>

                <div className="space-y-8">
                    {/* Volume Música */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-1">
                            <Music size={20} />
                            <label className="text-sm font-bold uppercase">Música de Fundo</label>
                        </div>
                        <input 
                            type="range" min="0" max="1" step="0.1" 
                            value={musicVolume}
                            onChange={(e) => setVolume('music', parseFloat(e.target.value))}
                            className="w-full accent-[#f0e6d2] h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Volume Efeitos */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-1">
                            <Volume2 size={20} />
                            <label className="text-sm font-bold uppercase">Efeitos Sonoros</label>
                        </div>
                        <input 
                            type="range" min="0" max="1" step="0.1" 
                            value={sfxVolume}
                            onChange={(e) => setVolume('sfx', parseFloat(e.target.value))}
                            className="w-full accent-[#f0e6d2] h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3">
                    <button 
                        onClick={() => toggleScreen(previousScreen || 'MENU')} 
                        className="w-full bg-[#f0e6d2] text-[#1a1a1a] py-3 font-bold uppercase tracking-widest hover:bg-white transition"
                    >
                        Voltar ao Jogo
                    </button>
                    
                    {previousScreen === 'GAME' && (
                        <button 
                            onClick={() => toggleScreen('MENU')} 
                            className="w-full border border-red-800 text-red-500 py-3 font-bold uppercase tracking-widest hover:bg-red-900/20 transition text-xs"
                        >
                            Sair para o Menu
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};