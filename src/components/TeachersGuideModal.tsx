import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, GraduationCap, Clock, PlayCircle, FileText, CheckCircle } from 'lucide-react';

const SECTIONS = [
    {
        id: 'obj',
        title: 'Objetivo',
        shortTitle: 'Objetivo', // Título curto para mobile
        icon: <BookOpen size={18} />,
        content: (
            <div className="space-y-4">
                <h3 className="font-headline text-xl uppercase border-b border-stone-400 pb-2 text-[#1a1a1a]">Objetivo do Guia</h3>
                <p className="leading-relaxed text-stone-800">
                    Este artefato didático orienta professores do Ensino Médio a utilizarem o jogo-simulador “Redação 64” como ferramenta para compreender a censura, a imprensa e os mecanismos de controle político na ditadura civil-militar brasileira (1964–1985).
                </p>
                <div className="bg-stone-200/60 p-4 border-l-4 border-[#8b0000] italic text-stone-700">
                    O guia oferece instruções de aplicação, mediação, contextualização e avaliação.
                </div>
            </div>
        )
    },
    {
        id: 'educ',
        title: 'Finalidade Educacional',
        shortTitle: 'Finalidade',
        icon: <GraduationCap size={18} />,
        content: (
            <div className="space-y-4">
                <h3 className="font-headline text-xl uppercase border-b border-stone-400 pb-2 text-[#1a1a1a]">Finalidade Educacional</h3>
                <p className="text-stone-800">O jogo permite que o estudante vivencie o papel de editor-chefe de um jornal durante o período ditatorial, enfrentando dilemas éticos reais. Ele desenvolve:</p>
                
                <ul className="space-y-3 mt-2">
                    {[
                        "Compreensão histórica da censura e das práticas autoritárias;",
                        "Habilidades de análise crítica de fontes e discursos;",
                        "Reflexão sobre imprensa, responsabilidade social e democracia;",
                        "Capacidade de tomada de decisão sob pressão."
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-white/40 p-2 rounded border border-stone-300">
                            <CheckCircle size={16} className="text-[#8b0000] mt-1 shrink-0" />
                            <span className="text-sm text-stone-800 leading-tight">{item}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-6 p-3 bg-[#e6dbc4] border border-stone-400 rounded text-sm font-bold text-stone-900">
                    <span className="uppercase text-[#8b0000]">BNCC:</span> Relaciona-se às competências <span className="underline">EM13CHS601</span> e <span className="underline">EM13CHS602</span>.
                </div>
            </div>
        )
    },
    {
        id: 'prep',
        title: 'Preparação da Aula',
        shortTitle: 'Preparação',
        icon: <Clock size={18} />,
        content: (
            <div className="space-y-6 text-stone-800">
                <h3 className="font-headline text-xl uppercase border-b border-stone-400 pb-2 text-[#1a1a1a]">Preparação da Aula</h3>
                
                {/* 3.1 */}
                <div>
                    <h4 className="font-bold uppercase text-[#8b0000] mb-2 flex items-center gap-2 text-sm">
                        <span className="bg-[#8b0000] text-[#f0e6d2] px-1.5 py-0.5 text-xs rounded">3.1</span> Contextualização (10 min)
                    </h4>
                    <p className="mb-2 text-sm">Apresentar brevemente:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm marker:text-[#8b0000]">
                        <li>O golpe de 1964 e a nova ordem política;</li>
                        <li>Papel da imprensa e o AI-5;</li>
                        <li>Mecanismos de censura;</li>
                        <li>Importância da informação livre.</li>
                    </ul>
                </div>

                {/* Grid Responsivo */}
                <div className="flex flex-col gap-3">
                    <div className="bg-stone-200/60 p-3 rounded border border-stone-300">
                        <h4 className="font-bold uppercase text-xs mb-2 text-[#1a1a1a]">3.2 Materiais</h4>
                        <ul className="text-sm space-y-1 text-stone-700">
                            <li>• Acesso ao jogo;</li>
                            <li>• Caderno de registro;</li>
                            <li>• Quadro/Projeção.</li>
                        </ul>
                    </div>
                    <div className="bg-stone-200/60 p-3 rounded border border-stone-300">
                        <h4 className="font-bold uppercase text-xs mb-2 text-[#1a1a1a]">3.3 Tempo</h4>
                        <ul className="text-sm space-y-1 text-stone-700">
                            <li>• 1 aula (50 min): Jogo (Fases 1-3);</li>
                            <li>• 1 aula (50 min): Debate.</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'dinamica',
        title: 'Dinâmica e Mediação',
        shortTitle: 'Dinâmica',
        icon: <PlayCircle size={18} />,
        content: (
            <div className="space-y-6 text-stone-800">
                <h3 className="font-headline text-xl uppercase border-b border-stone-400 pb-2 text-[#1a1a1a]">Dinâmica de Aplicação</h3>
                
                {/* 4.1 */}
                <div>
                    <h4 className="font-bold uppercase text-[#8b0000] mb-2 text-sm">4.1 Como funciona</h4>
                    <ul className="text-sm space-y-2 border-l-2 border-stone-400 pl-3">
                        <li>1. Aluno assume jornal em 1964.</li>
                        <li>2. Fases com manchetes reais.</li>
                        <li>3. Escolhas: <span className="font-bold">Censurar, Alterar ou Publicar</span>.</li>
                        <li>4. Gestão de 3 indicadores invisíveis.</li>
                        <li>5. Final narrativo em 1985.</li>
                    </ul>
                </div>

                {/* 4.2 */}
                <div className="bg-[#1a1a1a] text-[#f0e6d2] p-4 rounded shadow-lg">
                    <h4 className="font-bold uppercase text-yellow-500 mb-3 flex items-center gap-2 text-sm">
                        <FileText size={16}/> 4.2 Estratégias
                    </h4>
                    <p className="text-xs mb-3 text-stone-300">Incentive anotações. Pergunte:</p>
                    
                    <div className="space-y-2 text-sm italic opacity-90 pl-2 border-l border-yellow-500/30">
                        <p>“Que riscos essa manchete traz?”</p>
                        <p>“Por que o censor reagiria mal?”</p>
                        <p>“O público confiaria nisso?”</p>
                    </div>
                </div>
            </div>
        )
    }
];

export const TeachersGuideModal = () => {
    const { toggleScreen } = useGameStore();
    const [activeTab, setActiveTab] = useState(0);

    return (
        // Wrapper: Fullscreen no mobile (h-[100dvh]), Modal no Desktop
        <div className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center md:p-4 font-body">
            
            {/* Container Principal */}
            <div className="w-full h-[100dvh] md:h-[85vh] md:max-w-5xl bg-[#f0e6d2] md:rounded-sm shadow-2xl flex flex-col md:flex-row overflow-hidden md:border-2 md:border-[#d6cfc2] relative">
                
                {/* === HEADER MOBILE (Fixo no topo) === */}
                <div className="md:hidden bg-[#1a1a1a] p-3 text-[#f0e6d2] flex justify-between items-center shrink-0 shadow-md z-20">
                    <div className="flex flex-col">
                         <span className="font-headline font-bold uppercase tracking-widest text-sm">Guia do Professor</span>
                         <span className="text-[9px] text-stone-400 uppercase">MEC • Documento Pedagógico</span>
                    </div>
                    <button onClick={() => toggleScreen('MENU')} className="bg-stone-800 p-1.5 rounded-full hover:bg-stone-700">
                        <X size={18}/>
                    </button>
                </div>

                {/* === SIDEBAR / NAVEGAÇÃO === */}
                {/* Mobile: Barra horizontal com scroll | Desktop: Coluna lateral */}
                <div className="bg-[#e6dbc4] border-b md:border-b-0 md:border-r border-[#d6cfc2] flex flex-row md:flex-col md:w-64 shrink-0 overflow-x-auto md:overflow-visible no-scrollbar">
                    
                    {/* Logo MEC (Só Desktop) */}
                    <div className="hidden md:flex p-6 border-b border-[#d6cfc2] mb-2 flex-col gap-1">
                        <div className="text-[#8b0000] font-headline text-3xl font-bold">MEC</div>
                        <div className="text-xs uppercase tracking-widest text-stone-600">Ministério da Educação</div>
                    </div>

                    {/* Botões das Abas */}
                    {SECTIONS.map((section, idx) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(idx)}
                            className={`
                                flex items-center gap-2 md:gap-3 p-3 md:p-4 text-xs md:text-sm uppercase font-bold tracking-widest transition-all whitespace-nowrap
                                md:border-l-4
                                ${activeTab === idx 
                                    ? 'bg-[#f0e6d2] text-[#8b0000] border-b-4 border-[#8b0000] md:border-b-0 md:border-l-[#8b0000]' 
                                    : 'text-stone-500 border-b-4 border-transparent md:border-b-0 md:border-l-transparent hover:bg-[#dcd1ba]'}
                            `}
                        >
                            <span className="opacity-70">{section.icon}</span>
                            {/* Mostra título curto no mobile, longo no desktop */}
                            <span className="md:hidden">{section.shortTitle}</span>
                            <span className="hidden md:inline">{section.title}</span>
                        </button>
                    ))}

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
                    
                    {/* Textura de Fundo */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none"></div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-10 relative z-10 custom-scrollbar pb-20 md:pb-10">
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