import { motion } from 'framer-motion';
import { Siren, Users, Wallet, AlertTriangle } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { useEffect } from 'react';
import { Howl } from 'howler';

const alarmSound = new Howl({
    src: ['/sounds/alarm.mp3'],
    volume: 0.6,
    loop: false
});

export const CriticalOverlay = () => {
    const { criticalEvent } = useGameStore();

    // Efeito para tocar o som quando o componente montar
    useEffect(() => {
        if (criticalEvent) {
            alarmSound.play();
        }
        // Opcional: Parar o som se o componente desmontar (fade out)
        return () => { alarmSound.stop(); };
    }, [criticalEvent]);

    if (!criticalEvent) return null;

    // Configuração visual baseada no tipo
    const config = {
        money: {
            icon: Wallet,
            color: 'text-green-500',
            bgColor: 'bg-green-500',
            title: 'FALÊNCIA DECRETADA',
            msg: 'Recursos Esgotados'
        },
        censor: {
            icon: Siren,
            color: criticalEvent.value === 'FULL' ? 'text-red-600' : 'text-red-500',
            bgColor: criticalEvent.value === 'FULL' ? 'bg-red-600' : 'bg-red-500',
            title: criticalEvent.value === 'FULL' ? 'ALERTA MÁXIMO' : 'INTERVENÇÃO',
            msg: criticalEvent.value === 'FULL' ? 'Revolta Popular Iminente' : 'Jornal Fechado pelo Regime'
        },
        public: {
            icon: Users,
            color: 'text-blue-400',
            bgColor: 'bg-blue-400',
            title: 'JORNAL IRRELEVANTE',
            msg: 'Público Abandonou o Jornal'
        }
    }[criticalEvent.type];

    const Icon = config.icon;

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-8 font-headline">
            
            {/* Fundo Piscando (Alerta) */}
            <motion.div 
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className={`absolute inset-0 ${config.bgColor}`}
            />

            <div className="relative z-10 text-center flex flex-col items-center gap-8 w-full max-w-md">
                
                {/* Ícone Gigante Pulsando */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                    transition={{ duration: 0.5, times: [0, 0.5, 1], repeat: Infinity }}
                    className={`p-8 rounded-full border-4 border-white/20 ${config.bgColor}/20 backdrop-blur-sm`}
                >
                    <Icon size={120} className={config.color} />
                </motion.div>

                <div className="w-full space-y-2">
                    <motion.h2 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl text-white font-bold tracking-widest uppercase drop-shadow-lg"
                    >
                        {config.title}
                    </motion.h2>
                    <p className="text-stone-400 font-body tracking-[0.3em] uppercase text-xs">
                        {config.msg}
                    </p>
                </div>

                {/* Barra Gigante Animando */}
                <div className="w-full h-12 bg-stone-900 border-4 border-stone-600 rounded-lg overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <motion.div
                        initial={{ width: criticalEvent.value === 'FULL' ? '0%' : '100%' }}
                        animate={{ width: criticalEvent.value === 'FULL' ? '100%' : '0%' }}
                        transition={{ duration: 3, ease: "circOut" }} // Enche/Esvazia em 3 segundos
                        className={`h-full ${config.bgColor} absolute top-0 left-0`}
                    />
                    
                    {/* Efeito de "Scanline" ou textura na barra */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-30 mix-blend-overlay"></div>
                </div>

                {/* Aviso Piscando em Vermelho se for algo ruim */}
                <motion.div 
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className="mt-8 flex items-center gap-2 text-red-500 font-mono font-bold bg-black/50 px-4 py-2 rounded"
                >
                    <AlertTriangle size={24} />
                    <span>SISTEMA CRÍTICO</span>
                    <AlertTriangle size={24} />
                </motion.div>

            </div>
        </div>
    );
};