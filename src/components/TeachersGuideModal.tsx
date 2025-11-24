import { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, GraduationCap, Clock, PlayCircle, FileText, CheckCircle } from 'lucide-react';

// Conteúdo EXATO do prompt original
const SECTIONS = [
    {
        id: 'obj',
        navTitle: 'Objetivo', // Texto do botão (curto para caber)
        icon: <BookOpen size={18} />,
        content: (
            <div className="space-y-4 text-[#1a1a1a]">
                <h3 className="font-headline text-2xl uppercase border-b border-stone-400 pb-2">Objetivo do Guia</h3>
                <p className="leading-relaxed text-base">
                    Este artefato didático orienta professores do Ensino Médio a utilizarem o jogo-simulador <span className="font-bold">“Redação 64”</span> como ferramenta para compreender a censura, a imprensa e os mecanismos de controle político na ditadura civil-militar brasileira (1964–1985). O guia oferece instruções de aplicação, mediação, contextualização e avaliação.
                </p>
            </div>
        )
    },
    {
        id: 'educ',
        navTitle: 'Finalidade',
        icon: <GraduationCap size={18} />,
        content: (
            <div className="space-y-4 text-[#1a1a1a]">
                <h3 className="font-headline text-2xl uppercase border-b border-stone-400 pb-2">Finalidade Educacional</h3>
                <p className="text-base">
                    O jogo permite que o estudante vivencie o papel de editor-chefe de um jornal durante o período ditatorial, enfrentando dilemas éticos reais. Ele desenvolve:
                </p>
                
                <ul className="space-y-3 mt-2">
                    {[
                        "Compreensão histórica da censura e das práticas autoritárias;",
                        "Habilidades de análise crítica de fontes e discursos;",
                        "Reflexão sobre imprensa, responsabilidade social e democracia;",
                        "Capacidade de tomada de decisão sob pressão."
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-white/50 p-2 rounded border border-stone-300">
                            <CheckCircle size={16} className="text-[#8b0000] mt-1 shrink-0" />
                            <span className="text-sm leading-tight">{item}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-6 p-4 bg-[#e6dbc4] border border-stone-400 rounded text-sm font-bold text-stone-900">
                    Relaciona-se às competências da BNCC (<span className="underline">EM13CHS601</span> e <span className="underline">EM13CHS602</span>), destacando o entendimento das formas de repressão política.
                </div>
            </div>
        )
    },
    {
        id: 'prep',
        navTitle: 'Preparação',
        icon: <Clock size={18} />,
        content: (
            <div className="space-y-6 text-[#1a1a1a]">
                <h3 className="font-headline text-2xl uppercase border-b border-stone-400 pb-2">Preparação da Aula</h3>
                
                {/* 3.1 */}
                <div>
                    <h4 className="font-bold uppercase text-[#8b0000] mb-2 text-base">
                        3.1 Contextualização inicial (10 min)
                    </h4>
                    <p className="mb-2 text-sm">O professor deve apresentar brevemente:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm marker:text-[#8b0000]">
                        <li>O golpe de 1964 e o início da nova ordem política;</li>
                        <li>Papel da imprensa antes e depois do AI-5;</li>
                        <li>Mecanismos de censura e autocensura;</li>
                        <li>Importância da informação livre numa democracia.</li>
                    </ul>
                    <p className="mt-3 text-sm italic bg-stone-200/50 p-2 rounded border border-stone-300">
                        Sugestão de disparador: mostrar manchetes reais de 1964 e discutir quais poderiam ter sido censuradas.
                    </p>
                </div>

                {/* 3.2 e 3.3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-stone-200/50 p-4 rounded border border-stone-300">
                        <h4 className="font-bold uppercase text-sm mb-2 text-[#8b0000]">3.2 Materiais necessários</h4>
                        <ul className="text-sm space-y-1 list-disc pl-4">
                            <li>Acesso ao jogo (computador, tablet ou projetor, conforme escolha do professor);</li>
                            <li>Caderno/folha de registro para cada aluno;</li>
                            <li>Quadro ou projeção para discussão coletiva.</li>
                        </ul>
                    </div>
                    <div className="bg-stone-200/50 p-4 rounded border border-stone-300">
                        <h4 className="font-bold uppercase text-sm mb-2 text-[#8b0000]">3.3 Tempo sugerido</h4>
                        <ul className="text-sm space-y-1 list-disc pl-4">
                            <li>1 aula de 50 min para jogar até a Fase 3;</li>
                            <li>1 aula de 50 min para debate, análise e redação final.</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'dinamica',
        navTitle: 'Dinâmica',
        icon: <PlayCircle size={18} />,
        content: (
            <div className="space-y-6 text-[#1a1a1a]">
                <h3 className="font-headline text-2xl uppercase border-b border-stone-400 pb-2">Aplicação do Jogo</h3>
                
                {/* 4.1 */}
                <div>
                    <h4 className="font-bold uppercase text-[#8b0000] mb-2 text-base">4.1 Como funciona o jogo (explicação resumida aos alunos)</h4>
                    <ul className="text-sm space-y-2 border-l-4 border-stone-400 pl-4 bg-stone-100/50 py-2">
                        <li>• O jogador assume o comando de um jornal a partir de 1964.</li>
                        <li>• Cada fase apresenta manchetes reais ou inspiradas na época.</li>
                        <li>• Para cada manchete, o aluno deve escolher: <span className="font-bold">Censurar; Alterar conteúdo; Publicar.</span></li>
                        <li>• As decisões afetam três indicadores invisíveis: repercussão pública, reação do censor e credibilidade.</li>
                        <li>• Em 1985, o jogo revela o destino final do jornal.</li>
                    </ul>
                </div>

                {/* 4.2 */}
                <div className="bg-[#1a1a1a] text-[#f0e6d2] p-5 rounded shadow-lg">
                    <h4 className="font-bold uppercase text-yellow-500 mb-3 flex items-center gap-2 text-base">
                        <FileText size={18}/> 4.2 Estratégias de mediação
                    </h4>
                    <p className="text-sm mb-3">Incentive que os estudantes anotem por que tomaram cada decisão.</p>
                    <p className="text-sm mb-4">Peça que observem padrões: quando a censura aumenta? O que o Estado tenta controlar? O que acontece quando o jornal resiste?</p>
                    
                    <p className="text-xs uppercase font-bold text-stone-500 mb-2">Durante o jogo, o professor não deve dizer qual decisão é “certa”, mas pode provocar com perguntas:</p>
                    <div className="space-y-2 text-sm italic pl-4 border-l-2 border-yellow-500/50">
                        <p>“Que riscos essa manchete traz ao jornal?”</p>
                        <p>“Por que o censor reagiria negativamente?”</p>
                        <p>“O público confiaria nesse tipo de decisão?”</p>
                    </div>
                </div>
            </div>
        )
    }
];

export const TeachersGuideModal = () => {
    const { toggleScreen } = useGameStore();
    const [activeTab, setActiveTab] = useState(0);
    
    // Referências para o Auto-Scroll
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const tabsRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Efeito para centralizar o botão ativo
    useEffect(() => {
        const activeBtn = tabsRefs.current[activeTab];
        const container = scrollContainerRef.current;

        if (activeBtn && container) {
            // Calcula a posição para centralizar o botão
            const scrollLeft = activeBtn.offsetLeft - (container.offsetWidth / 2) + (activeBtn.offsetWidth / 2);
            
            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }, [activeTab]);

    return (
        <div className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center md:p-4 font-body">
            
            {/* Container Principal */}
            <div className="w-full h-[100dvh] md:h-[85vh] md:max-w-5xl bg-[#f0e6d2] md:rounded-sm shadow-2xl flex flex-col md:flex-row overflow-hidden md:border-2 md:border-[#d6cfc2] relative">
                
                {/* === HEADER MOBILE (Fixo no topo) === */}
                <div className="md:hidden bg-[#1a1a1a] p-3 text-[#f0e6d2] flex justify-between items-center shrink-0 shadow-md z-20">
                    <div className="flex flex-col">
                         <span className="font-headline font-bold uppercase tracking-widest text-sm">Guia do Professor</span>
                         <span className="text-[9px] text-stone-400 uppercase">Documento Pedagógico</span>
                    </div>
                    <button onClick={() => toggleScreen('MENU')} className="bg-stone-800 p-1.5 rounded-full hover:bg-stone-700">
                        <X size={20}/>
                    </button>
                </div>

                {/* === BARRA DE NAVEGAÇÃO / SIDEBAR === */}
                <div 
                    ref={scrollContainerRef}
                    className="bg-[#e6dbc4] border-b md:border-b-0 md:border-r border-[#d6cfc2] flex flex-row md:flex-col md:w-64 shrink-0 overflow-x-auto md:overflow-visible no-scrollbar scroll-smooth"
                >
                    {/* Logo MEC (Só Desktop) */}
                    <div className="hidden md:flex p-6 border-b border-[#d6cfc2] mb-2 flex-col gap-1">
                        <div className="text-[#8b0000] font-headline text-3xl font-bold">MEC</div>
                        <div className="text-xs uppercase tracking-widest text-stone-600">Ministério da Educação</div>
                    </div>

                    {/* Botões das Abas */}
                    {SECTIONS.map((section, idx) => (
                        <button
                            key={section.id}
                            ref={el => tabsRefs.current[idx] = el}
                            onClick={() => setActiveTab(idx)}
                            className={`
                                flex items-center gap-2 md:gap-3 p-4 text-xs md:text-sm uppercase font-bold tracking-widest transition-all whitespace-nowrap flex-shrink-0
                                md:border-l-4
                                ${activeTab === idx 
                                    ? 'bg-[#f0e6d2] text-[#8b0000] border-b-4 border-[#8b0000] md:border-b-0 md:border-l-[#8b0000]' 
                                    : 'text-stone-500 border-b-4 border-transparent md:border-b-0 md:border-l-transparent hover:bg-[#dcd1ba]'}
                            `}
                        >
                            <span className="opacity-70">{section.icon}</span>
                            <span>{section.navTitle}</span>
                        </button>
                    ))}
                    
                    {/* Espaçador para garantir que o último item possa ser scrollado até o centro no mobile */}
                    <div className="w-4 md:hidden flex-shrink-0"></div>

                    <div className="flex-1 hidden md:block"></div>

                    {/* Botão Fechar (Desktop) */}
                    <button 
                        onClick={() => toggleScreen('MENU')}
                        className="hidden md:flex items-center gap-2 p-4 text-stone-500 hover:text-red-600 hover:bg-red-50 transition border-t border-[#d6cfc2] uppercase text-xs font-bold"
                    >
                        <X size={16} /> Fechar Guia
                    </button>
                </div>

                {/* === ÁREA DE CONTEÚDO === */}
                <div className="flex-1 bg-[#f0e6d2] relative flex flex-col h-full overflow-hidden">
                    
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none"></div>

                    <div className="flex-1 overflow-y-auto p-5 md:p-10 relative z-10 custom-scrollbar pb-24 md:pb-10">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {SECTIONS[activeTab].content}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer Decorativo */}
                    <div className="p-2 border-t border-[#d6cfc2] text-center md:text-right text-[9px] text-stone-400 font-mono uppercase bg-[#eaddcf]/30 shrink-0">
                        Uso Exclusivo Docente • Reprodução Permitida
                    </div>
                </div>

            </div>
        </div>
    );
};