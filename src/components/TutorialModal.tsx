import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { useSounds } from '../hooks/useSounds';
import { 
    ChevronRight, ChevronLeft, X, 
    Printer, Ban, Pencil, Wallet, Users, Siren, Mail, CheckCircle 
} from 'lucide-react';

const slides = [
    {
        id: 'context',
        title: 'O Editor-Chefe',
        icon: <div className="text-4xl">📰</div>,
        text: "Brasil, 1964. Você acaba de assumir um jornal em meio ao turbilhão político. Sua missão é decidir o que vai para as bancas e o que vai para o lixo. Lembre-se: toda palavra tem um preço."
    },
    {
        id: 'actions',
        title: 'Suas Ferramentas',
        customContent: (
            <div className="grid grid-cols-3 gap-2 w-full mt-4">
                <div className="flex flex-col items-center p-2 bg-red-900/50 border border-red-700 rounded text-center">
                    <Ban className="text-red-400 mb-1" size={20} />
                    <span className="text-[12px] uppercase font-bold text-red-200">Censurar</span>
                    <span className="text-[11px] text-stone-400 leading-tight">Gasta dinheiro, agrada o regime.</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-yellow-600/50 border border-yellow-500 rounded text-center">
                    <Pencil className="text-yellow-300 mb-1" size={20} />
                    <span className="text-[12px] uppercase font-bold text-yellow-100">Alterar</span>
                    <span className="text-[11px] text-stone-400 leading-tight">Suaviza a notícia. Custo médio.</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-stone-800 border border-stone-600 rounded text-center">
                    <Printer className="text-stone-300 mb-1" size={20} />
                    <span className="text-[12px] uppercase font-bold text-stone-200">Publicar</span>
                    <span className="text-[11px] text-stone-400 leading-tight">Arriscado. Define sua lealdade.</span>
                </div>
            </div>
        )
    },
    {
        id: 'money',
        title: 'Recursos (Caixa)',
        icon: <Wallet className="text-green-500" size={48} />,
        text: "Manter o jornal aberto custa caro. Censurar matérias gera prejuízo imediato (propina, recolhimento de edição). Se o dinheiro acabar, o jornal vai à falência."
    },
    {
        id: 'public',
        title: 'Opinião Pública',
        icon: <Users className="text-blue-500" size={48} />,
        text: "A credibilidade é a alma do jornalismo. Se o público perceber que você só publica propaganda do governo, eles param de ler. Sem leitores, o jornal se torna irrelevante."
    },
    {
        id: 'censor',
        title: 'O Censor',
        icon: <Siren className="text-red-600 animate-pulse" size={48} />,
        text: "O regime vigia cada vírgula. A barra do Censor indica o perigo. Se encher (100%), o povo se revolta e destrói o jornal. Se zerar (0%), o governo te considera subversivo e fecha as portas."
    },
    {
        id: 'letters',
        title: 'Correio & Cartas',
        icon: <Mail className="text-yellow-500" size={48} />,
        text: "Fique atento ao ícone de carta. Ofertas de suborno, pedidos de socorro e ordens militares chegam pelo correio. Aceitar ou recusar traz consequências imediatas e libera notícias especiais."
    },
    {
        id: 'final',
        title: 'Boa Sorte',
        icon: <CheckCircle className="text-[#f0e6d2]" size={48} />,
        text: "Suas escolhas definem a história. Você será a voz da resistência, um colaborador do regime ou apenas tentará sobreviver? A edição começa agora."
    }
];

export const TutorialModal = () => {
    const { completeTutorial, toggleScreen, previousScreen } = useGameStore();
    const { playSound } = useSounds();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        playSound('paper');
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        } else {
            handleClose();
        }
    };

    const handlePrev = () => {
        playSound('paper');
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    const handleClose = () => {
        // Se veio do menu (consulta), volta pro menu. Se veio do StartGame, começa o jogo.
        if (previousScreen === 'MENU') {
            toggleScreen('MENU');
        } else {
            completeTutorial();
        }
    };

    const slide = slides[currentSlide];
    const isLast = currentSlide === slides.length - 1;

    return (
        <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#1a1a1a] border-2 border-[#f0e6d2] shadow-2xl overflow-hidden flex flex-col relative min-h-[400px]">
                
                {/* Header do Manual */}
                <div className="bg-[#f0e6d2] p-3 flex justify-between items-center border-b-2 border-[#1a1a1a]">
                    <span className="font-headline font-bold text-[#1a1a1a] uppercase tracking-widest">
                        Manual do Editor
                    </span>
                    <button onClick={handleClose} className="text-[#1a1a1a] hover:bg-black/10 rounded p-1">
                        <X size={20} />
                    </button>
                </div>

                {/* Área do Slide */}
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center text-[#f0e6d2]">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center gap-6 w-full"
                        >
                            {/* Ícone */}
                            <div className="p-4 bg-white/5 rounded-full border border-stone-700 shadow-inner">
                                {slide.icon}
                            </div>

                            {/* Título */}
                            <h2 className="font-headline text-2xl uppercase tracking-wider text-white border-b border-stone-700 pb-2 w-full">
                                {slide.title}
                            </h2>

                            {/* Texto ou Conteúdo Custom */}
                            {slide.customContent ? slide.customContent : (
                                <p className="font-body text-sm leading-relaxed text-stone-300">
                                    {slide.text}
                                </p>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer / Navegação */}
                <div className="p-4 border-t border-stone-800 flex justify-between items-center bg-[#121212]">
                    
                    {/* Botão Anterior */}
                    <button 
                        onClick={handlePrev} 
                        disabled={currentSlide === 0}
                        className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition
                            ${currentSlide === 0 ? 'opacity-0 cursor-default' : 'text-stone-400 hover:text-white'}
                        `}
                    >
                        <ChevronLeft size={16} /> Anterior
                    </button>

                    {/* Indicadores (Bolinhas) */}
                    <div className="flex gap-2">
                        {slides.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`w-2 h-2 rounded-full transition-colors ${idx === currentSlide ? 'bg-[#f0e6d2]' : 'bg-stone-700'}`}
                            />
                        ))}
                    </div>

                    {/* Botão Próximo / Fechar */}
                    <button 
                        onClick={handleNext} 
                        className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#f0e6d2] hover:text-white bg-stone-800 px-3 py-2 rounded border border-stone-600 hover:border-white transition"
                    >
                        {isLast ? (
                            <>Jogar <CheckCircle size={14}/></>
                        ) : (
                            <>Próximo <ChevronRight size={14}/></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};