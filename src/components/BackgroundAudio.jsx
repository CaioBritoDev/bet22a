import { useEffect, useRef } from "react";

function BackgroundAudio({ isActive, name }) {
  const audioRef = useRef(null);

  useEffect(() => {
    // Cria o elemento de áudio apenas uma vez
    if (!audioRef.current) {
      audioRef.current = new Audio("/bet22a/sounds/" + name + ".mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5; // ajuste o volume se quiser
    }

    if (isActive) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      }
    } else {
      audioRef.current.pause();
    }

    // Cleanup opcional ao desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isActive, name]);

  return null; // Não renderiza nada na tela
}

export default BackgroundAudio;
