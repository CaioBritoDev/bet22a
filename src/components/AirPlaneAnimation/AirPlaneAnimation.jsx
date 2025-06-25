import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// AirPlaneAnimation.js
const AirPlaneAnimation = ({
  setRoundInProgress,
  setRoundMultiplier,
  roundMultiplier,
  handleCashOut,
  players,
}) => {
  const [t, setT] = useState(0);
  const [tMax, setTMax] = useState(0);

  // Gerar tMax com distribuição exponencial
  useEffect(() => {
    const lambda = 0.1; // 0.1 é um bom valor
    const u = Math.random();
    const generatedTMax = -Math.log(1 - u) / lambda;
    setTMax(Math.min(generatedTMax, 180));
  }, []);

  // Atualizar o tempo e o multiplicador
  useEffect(() => {
    if (tMax === 0) return;

    const interval = setInterval(() => {
      setT((prev) => {
        const newT = prev + 0.1;

        // Calcular multiplicador baseado no tempo
        const segmentIndex = Math.floor(newT / 3);
        const segmentStart = segmentIndex * 3;
        const segmentProgress = (newT - segmentStart) / 3;
        const startMultiplier = Math.pow(2, segmentIndex);
        const endMultiplier = Math.pow(2, segmentIndex + 1);
        const multiplier =
          startMultiplier + (endMultiplier - startMultiplier) * segmentProgress;

        setRoundMultiplier(multiplier);

        // Finalizar rodada ao atingir tMax
        if (newT >= tMax) {
          setRoundInProgress(true);
          clearInterval(interval);
        }

        return newT;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [tMax, setRoundInProgress, setRoundMultiplier]);

  // Capturar eventos de tecla para cash-out
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      const playerKeys = {
        CapsLock: 1,
        " ": 2,
        Enter: e.location === 0 ? 3 : 4,
      };

      const playerId = playerKeys[e.key];
      if (playerId) {
        handleCashOut(playerId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCashOut]);

  // Cores diferentes para cada segmento
  const segmentColors = [
    "#FF6B6B",
    "#000000",
    "#FFE66D",
    "#1A535C",
    "#FF9F1C",
    "#2EC4B6",
    "#E71D36",
    "#662E9B",
  ];

  const segmentIndex = Math.floor(t / 3);

  const cashouts = players.filter((p) => p.cashedOutAt && p.currentBetSize > 0);

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%,rgb(191, 217, 246) 50%,rgb(160, 192, 238) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* ... (código da animação) ... */}

        <motion.div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translate(-50%, -50%)",
            fontSize: "5rem",
            fontWeight: "bold",
            color: segmentColors[segmentIndex % segmentColors.length],
            zIndex: 10,
          }}
          key={segmentIndex}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 1],
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {roundMultiplier.toFixed(2)}x
        </motion.div>

        {/* ... (painel de jogadores) ... */}
      </div>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "rgba(34,34,34,0.95)",
          color: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          zIndex: 9999,
          minWidth: "220px",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>Cashouts</h4>
        {cashouts.length === 0 && <div>Nenhum cashout ainda</div>}
        {cashouts.map((player) => (
          <div
            key={player.id}
            style={{
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            {player.nickname}:{" "}
            <span style={{ color: "#FFE66D" }}>
              {player.cashedOutAt.toFixed(2)}x (
              <span>
                +{(player.currentBetSize * player.cashedOutAt).toFixed(2)} BIGATO$
              </span>
              )
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default AirPlaneAnimation;
