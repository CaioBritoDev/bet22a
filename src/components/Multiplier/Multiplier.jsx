import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";

const Multiplier = ({
  multiplier,
  setArrayMultipliers,
  setRoundState,
  phraseIndex,
  setPhraseIndex,
}) => {
  const [playMissionPassedGta] = useSound("/bet22a/sounds/multiplier.mp3");
  const phrases = [
    "Foi ganancioso, né? Agora aguenta as consequências!",
    "Aposte com sabedoria, ou pague o preço!",
    "A ganância é uma armadilha, cuidado!",
    "A sorte favorece os audazes, mas a prudência é a chave!",
    "Aposte com cautela, ou a casa (apartamento) sempre ganha!",
  ];

  useEffect(() => {
    playMissionPassedGta();
    const timeout = setTimeout(() => {
      setArrayMultipliers((current) => [multiplier.toFixed(2), ...current]);
      setRoundState("betting");
      if (phraseIndex + 1 >= phrases.length) {
        setPhraseIndex(0);
      } else {
        setPhraseIndex((c) => c + 1);
      }
    }, 6000);
    return () => clearTimeout(timeout);
  }, [
    setPhraseIndex,
    phraseIndex,
    setRoundState,
    phrases.length,
    playMissionPassedGta,
    setArrayMultipliers,
    multiplier,
  ]);

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: "url('/bet22a/background-crash.jpg')",
          backgroundSize: "cover",
        }}
      >
        <p
          style={{
            position: "absolute",
            top: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#f0f0f0",
            zIndex: 10,
            textShadow: `
      0 0 8px #00aaff,
      0 0 16px #00aaff,
      0 0 32px #00aaff,
      0 0 2px #fff,
      0 0 4px #fff
    `,
          }}
        >
          {phrases[phraseIndex]}
        </p>

        <motion.div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translate(-50%, -50%)",
            fontSize: "10rem",
            fontWeight: "bold",
            color: "#fff", // texto branco
            zIndex: 10,
            textShadow: `
      0 0 8px rgb(255, 128, 0),
      0 0 16px rgb(68, 0, 255),
      0 0 32px rgb(89, 255, 0),
      0 0 2px #fff,
      0 0 4px #fff
    `,
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 1],
            opacity: 1,
          }}
          transition={{
            duration: 0.1,
            ease: "easeOut",
          }}
        >
          {multiplier.toFixed(2)}x
        </motion.div>
      </div>
    </>
  );
};

export default Multiplier;
