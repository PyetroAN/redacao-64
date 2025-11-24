import { motion, AnimatePresence } from 'framer-motion';
import { Info, ExternalLink } from 'lucide-react';
import type { NewsItem } from '../types/game';
import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { useSounds } from '../hooks/useSounds';


interface Props {
  news: NewsItem;
}

export const NewspaperCard = ({ news }: Props) => {
  const [showContext, setShowContext] = useState(false);
  const { lastAction } = useGameStore();
  const { playSound } = useSounds();

  // Memória local para saber a direção da saída mesmo após a Store limpar o lastAction
  const exitDirection = useRef<'left' | 'right'>('left');

  // Toca o som de papel quando a notícia muda (entra na tela)
  useEffect(() => {
    playSound('paper');
  }, [news.id, playSound]);

  // Monitora a ação para tocar som e definir direção
  useEffect(() => {
    if (lastAction) {
      playSound('stamp');
      
      // Salva a direção baseada na ação ATUAL
      if (lastAction === 'PUBLICADO') {
        exitDirection.current = 'right';
      } else {
        exitDirection.current = 'left'; // CENSURADO ou ALTERADO (assume censura visualmente)
      }
    }
  }, [lastAction, playSound]);

  const displayTitle = news.currentTitle || news.title;
  const displayBody = news.currentBody || news.body;

  // Variantes de animação para manter o código limpo
  const variants = {
    enter: { 
      y: 500, // Entra sempre vindo de baixo (pilha nova)
      x: 0,
      opacity: 0, 
      rotate: 5 
    },
    center: { 
      y: 0, 
      x: 0,
      opacity: 1, 
      rotate: 0 
    },
    exit: { 
      // Usa a referência local para decidir o lado
      x: exitDirection.current === 'right' ? 1000 : -1000, 
      y: 50, // Cai um pouco enquanto sai
      opacity: 0, 
      rotate: exitDirection.current === 'right' ? 20 : -20,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  return (
    <div className="relative w-full max-w-md h-[65vh] perspective-1000 group">
      
      {/* --- EFEITO DE PILHA DE PAPEL (FUNDO) --- */}
      <div className="absolute top-2 left-2 w-full h-full bg-[#d6cfc2] border border-stone-500 rounded-sm rotate-0 z-0 shadow-xl"></div>
      <div className="absolute top-1 left-1 w-full h-full bg-[#e6dbc4] border border-stone-400 rounded-sm -rotate-1 z-0 shadow-lg"></div>
      
      <AnimatePresence mode='popLayout'> {/* popLayout ajuda a evitar bugs de layout na troca */}
        <motion.div
          key={news.id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
          className="relative w-full h-full bg-[#f0e6d2] shadow-2xl border border-[#d6cfc2] overflow-hidden flex flex-col z-10 origin-bottom"
          style={{ backgroundImage: "url('/images/cream-paper.png')" }}
        >
          {/* Header do Jornal */}
          <div className="h-14 border-b-[3px] border-double border-stone-800 flex items-end justify-between px-5 pb-2 bg-[#eaddcf] opacity-90">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-600 font-body">
              {news.type === 'HEADLINE' ? 'Manchete do Dia' : news.editionTitle}
            </span>
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-stone-500">Nº {news.id.slice(-3)}</span>
                <button onClick={() => setShowContext(true)} className="text-stone-600 hover:text-black transition-colors">
                    <Info size={18} />
                </button>
            </div>
          </div>

          {/* Conteúdo Scrollável */}
          <div className="flex-1 overflow-y-auto p-6 pb-24 no-scrollbar">
            <span className="inline-block bg-[#1a1a1a] text-[#f0e6d2] text-[10px] font-bold px-2 py-1 uppercase mb-4 tracking-widest">
              {news.tag}
            </span>

            <h2 className="font-headline text-4xl leading-[0.9] text-[#1a1a1a] mb-5 uppercase tracking-tighter drop-shadow-sm">
              {displayTitle}
            </h2>

{news.images && news.images.length > 0 && (
              <div className="mb-6 border-[3px] border-[#1a1a1a] bg-stone-300">
                
                {/* Container da Imagem */}
                <div className="relative">
                  <img 
                    src={news.images[0]} 
                    className="w-full h-48 object-cover filter sepia-[0.4] grayscale contrast-125 brightness-90 block" 
                  />
                  {/* Sombra interna para dar aspecto de foto velha impressa */}
                  <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.3)] pointer-events-none"></div>
                </div>

                {/* Barra da Legenda */}
                <div className="border-t-[3px] border-[#1a1a1a] bg-[#d6cfc2] py-1 px-2">
<p className="text-[11px] text-center mt-1 italic text-stone-500 font-body">Foto: Arquivo / Agência</p>
                </div>
              </div>
            )}

            <div className="font-subhead text-xl leading-relaxed text-justify text-stone-900">
               <span className="float-left text-5xl font-headline mr-3 leading-none mt-[-8px]">
                  {displayBody.charAt(0)}
               </span>
               {displayBody.slice(1)}
            </div>
          </div>

          {/* --- CARIMBO GIGANTE (Centralizado e Animado) --- */}
          <AnimatePresence>
            {lastAction && (
              <motion.div
                initial={{ scale: 3, opacity: 0, rotate: 20, x: '-50%', y: '-50%' }}
                animate={{ scale: 1, opacity: 0.95, rotate: -15, x: '-50%', y: '-50%' }}
                exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className={`
                  absolute top-1/2 left-1/2 
                  border-8 border-double px-6 py-4 
                  font-stamp text-6xl md:text-7xl font-black uppercase z-50 
                  mix-blend-multiply pointer-events-none whitespace-nowrap
                  ${lastAction === 'CENSURADO' ? 'border-red-800 text-red-800' : ''}
                  ${lastAction === 'PUBLICADO' ? 'border-green-900 text-green-900' : ''}
                  ${lastAction === 'ALTERADO' ? 'border-blue-900 text-blue-900' : ''}
                `}
              >
                {lastAction}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Marca d'água "Alterado" */}
          {news.isAltered && !lastAction && (
              <div className="absolute bottom-2 right-2 opacity-50 rotate-[-5deg]">
                  <span className="font-stamp text-blue-800 text-sm font-bold border border-blue-800 px-1 rounded">✏️ Texto Editado</span>
              </div>
          )}

        </motion.div>
      </AnimatePresence>

{/* Modal de Contexto */}
      {showContext && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-[#f0e6d2] p-6 border-2 border-stone-600 shadow-2xl rotate-1 w-full max-w-sm flex flex-col max-h-[80vh]">
                
                {/* Título */}
                <h3 className="font-headline text-xl font-bold uppercase mb-3 border-b border-stone-400 pb-2 text-[#1a1a1a]">
                    Arquivo Histórico
                </h3>
                
                {/* Texto do Contexto (com scroll se for grande) */}
                <div className="overflow-y-auto mb-4 pr-2 custom-scrollbar">
                    <p className="font-body text-sm leading-relaxed text-[#1a1a1a]">
                        {news.context}
                    </p>
                </div>

                {/* --- AQUI ESTÁ O LINK SAIBA MAIS --- */}
                {news.sourceUrl && (
                    <a 
                        href={news.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-800 hover:text-blue-600 hover:underline font-bold text-xs uppercase mb-6 transition-colors"
                    >
                        <ExternalLink size={14} />
                        Acessar fontes
                    </a>
                )}

                {/* Botão Fechar */}
                <button 
                    onClick={() => setShowContext(false)} 
                    className="mt-auto w-full bg-[#1a1a1a] text-[#f0e6d2] py-3 font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition shadow-lg"
                >
                    Fechar Arquivo
                </button>
            </div>
        </div>
      )}
    </div>
  );
};