import { useCallback } from 'react';
import { Howl } from 'howler';

// Configuração dos sons
const sounds = {
  stamp: new Howl({ src: ['/sounds/stamp.mp3'], volume: 0.5 }),
  paper: new Howl({ src: ['/sounds/paper.mp3'], volume: 0.4 }),
  // Adicione outros aqui se quiser
};

export const useSounds = () => {
  const playSound = useCallback((soundName: keyof typeof sounds) => {
    if (sounds[soundName]) {
      sounds[soundName].play();
    }
  }, []);

  return { playSound };
};