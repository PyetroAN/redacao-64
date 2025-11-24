import { useGameStore } from '../store/useGameStore';
import { Users, Wallet, Siren, Ban, Printer, Pencil } from 'lucide-react';
import { useState } from 'react';

export const GameControls = () => {
  const { currentNews, handleAction, applyAlteration } = useGameStore();
  const [showAlterModal, setShowAlterModal] = useState(false);

  if (!currentNews) return null;

  // Helpers para ícones de impacto
  const ImpactIcons = ({ impact }: { impact: any }) => (
    <div className="flex gap-1 absolute -top-3 right-0 bg-white/90 px-1 rounded border border-stone-300">
      {impact.money !== 0 && <Wallet size={12} className={impact.money > 0 ? 'text-green-600' : 'text-red-600'} />}
      {impact.censor !== 0 && <Siren size={12} className={impact.censor > 0 ? 'text-red-600' : 'text-green-600'} />} {/* Logica invertida visualmente talvez? */}
      {impact.public !== 0 && <Users size={12} className={impact.public > 0 ? 'text-green-600' : 'text-red-600'} />}
    </div>
  );

  // Define qual impacto usar para Publicar (Original vs Alterado)
  const activePublishImpact = currentNews.isAltered && currentNews.currentImpact 
    ? currentNews.currentImpact 
    : currentNews.publishImpact;

  return (
    <>
      <div className="w-full max-w-md p-4 grid grid-cols-3 gap-3 z-20">
        {/* Botão Censurar */}
        <button 
            onClick={() => handleAction('CENSOR')}
            className="relative group bg-red-900 text-white h-20 rounded-xl shadow-[0_4px_0_#5a0000] active:translate-y-1 active:shadow-none flex flex-col items-center justify-center border-2 border-red-950 transition-all hover:bg-red-800"
        >
            <ImpactIcons impact={currentNews.censorImpact} />
            <Ban size={24} className="mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Censurar</span>
            {currentNews.censorImpact.money !== 0 && (
                 <span className="text-[9px] text-red-200 mt-1">Custo: ${Math.abs(currentNews.censorImpact.money || 0)}</span>
            )}
        </button>

        {/* Botão Alterar */}
        <button 
            onClick={() => setShowAlterModal(true)}
            disabled={!currentNews.canAlter}
            className={`relative group h-20 rounded-xl shadow-[0_4px_0_#92400e] active:translate-y-1 active:shadow-none flex flex-col items-center justify-center border-2 border-yellow-900 transition-all
                ${!currentNews.canAlter ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-yellow-600 hover:bg-yellow-500 text-white'}
            `}
        >
            <Pencil size={24} className="mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Alterar</span>
        </button>

        {/* Botão Publicar */}
        <button 
            onClick={() => handleAction('PUBLISH')}
            className="relative group bg-stone-900 text-white h-20 rounded-xl shadow-[0_4px_0_#000] active:translate-y-1 active:shadow-none flex flex-col items-center justify-center border-2 border-black transition-all hover:bg-stone-800"
        >
            <ImpactIcons impact={activePublishImpact} />
            <Printer size={24} className="mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Publicar</span>
        </button>
      </div>

      {/* Modal de Alteração */}
      {showAlterModal && currentNews.alterOptions && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-[#f0e6d2] w-full max-w-sm border-2 border-stone-800 shadow-2xl p-4">
              <h3 className="font-headline text-lg uppercase mb-4 flex items-center gap-2"><Pencil size={18}/> Mesa de Edição</h3>
              <div className="space-y-2">
                 {currentNews.alterOptions.map(opt => (
                    <button 
                        key={opt.id}
                        onClick={() => {
                            applyAlteration(opt.id);
                            setShowAlterModal(false);
                        }}
                        className="w-full text-left p-3 text-sm bg-white border border-stone-400 hover:border-black hover:bg-stone-50 font-body"
                    >
                        {opt.text}
                        {/* Ícones de impacto da alteração */}
                        <div className="flex gap-2 mt-2 justify-end opacity-60">
                            {opt.impactModifier.censor && <span className="text-[10px] flex items-center gap-1"><Siren size={10}/> Censor</span>}
                        </div>
                    </button>
                 ))}
              </div>
              <button onClick={() => setShowAlterModal(false)} className="mt-4 text-xs underline w-full text-center text-stone-600">Cancelar</button>
           </div>
        </div>
      )}
    </>
  );
};