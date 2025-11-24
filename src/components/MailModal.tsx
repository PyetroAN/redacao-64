import { useGameStore } from '../store/useGameStore';
import { Check, XCircle } from 'lucide-react';

export const MailModal = () => {
    const { activeLetter, handleLetterDecision } = useGameStore();

    if (!activeLetter) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-sm bg-white rotate-1 shadow-2xl border border-gray-300 animate-in fade-in zoom-in duration-300">
                
                {/* Borda do Envelope (Listrada) */}
                <div className="absolute top-0 left-0 w-full h-3 bg-[repeating-linear-gradient(45deg,#b91c1c,#b91c1c_10px,#ffffff_10px,#ffffff_20px)]"></div>
                <div className="absolute bottom-0 left-0 w-full h-3 bg-[repeating-linear-gradient(45deg,#1d4ed8,#1d4ed8_10px,#ffffff_10px,#ffffff_20px)]"></div>

                <div className="p-8 pt-10 font-body">
                    {/* Cabeçalho da Carta */}
                    <div className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Remetente</span>
                            <span className="font-bold text-red-900 uppercase">{activeLetter.sender}</span>
                        </div>
                        <div className="border border-black px-2 py-1">
                            <span className="text-[9px] font-mono font-bold uppercase">Confidencial</span>
                        </div>
                    </div>

                    <h3 className="font-bold text-lg mb-4 text-center">{activeLetter.subject}</h3>

                    <p className="text-sm leading-relaxed text-justify mb-8 whitespace-pre-line text-gray-800">
                        {activeLetter.body}
                    </p>

                    {/* Botões de Decisão */}
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => handleLetterDecision(false)}
                            className="flex flex-col items-center justify-center p-3 border-2 border-red-200 hover:bg-red-50 hover:border-red-500 transition group"
                        >
                            <XCircle className="text-red-400 group-hover:text-red-600 mb-1" />
                            <span className="text-[10px] font-bold uppercase text-red-800">Recusar</span>
                        </button>

                        <button 
                            onClick={() => handleLetterDecision(true)}
                            className="flex flex-col items-center justify-center p-3 bg-stone-900 text-white hover:bg-black transition shadow-lg"
                        >
                            <Check className="mb-1 text-green-400" />
                            <span className="text-[10px] font-bold uppercase text-[#f0e6d2]">Aceitar</span>
                        </button>
                    </div>
                </div>

                {/* Botão Fechar (X) apenas visual se quiser desistir, mas geralmente tem que decidir */}
                {/* <button onClick={closeMail} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X size={20}/></button> */}
            </div>
        </div>
    );
};