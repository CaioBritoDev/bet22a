import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// AirPlaneAnimation.js
const AirPlaneAnimation = ({
  setRoundState,
  setRoundMultiplier,
  roundMultiplier,
  handleCashOut,
  players,
}) => {
  const [t, setT] = useState(0);
  const [tMax, setTMax] = useState(0);

  // Gerar tMax com distribuição exponencial
  useEffect(() => {
    const lambda = 0.2; // 0.1 é um bom valor
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
          setRoundState("paused");
          clearInterval(interval);
        }

        return newT;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [tMax, setRoundState, setRoundMultiplier]);

  // Capturar eventos de tecla para cash-out
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      const playerKeys = {
        Q: 1,
        " ": 2,
        Enter: e.location === 0 ? 3 : 4,
      };

      const playerId = playerKeys[e.key.toUpperCase() === "Q" ? "Q" : e.key];
      if (playerId) {
        handleCashOut(playerId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCashOut]);

  // Cores diferentes para cada segmento
  const segmentColors = [
    "#b3e0ff", // Azul claro
    "#ffd6e0", // Rosa claro
    "#fff3b0", // Amarelo claro
    "#caffbf", // Verde claro
    "#f1c0e8", // Lilás claro
    "#ffe5b4", // Laranja claro
    "#e0c3fc", // Roxo claro
    "#f9f9f9", // Branco gelo
  ];

  const segmentIndex = Math.floor(t / 3);

  const cashouts = players.filter((p) => p.cashedOutAt && p.currentBetSize > 0);

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            color: segmentColors[segmentIndex % segmentColors.length],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translate(-50%, -50%)",
            fontSize: `${roundMultiplier <= 5 ? (roundMultiplier * 2).toFixed(2) : 10}rem`,
            fontWeight: "bold",
            textShadow: `
      0 0 8px rgb(255, 128, 0),
      0 0 16px rgb(68, 0, 255),
      0 0 32px rgb(89, 255, 0),
      0 0 2px #fff,
      0 0 4px #fff
    `,

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
                +{(player.currentBetSize * player.cashedOutAt).toFixed(2)}{" "}
                BIGATO$
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
