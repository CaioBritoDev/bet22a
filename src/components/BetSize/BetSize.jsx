import { useEffect } from "react";

const BetSize = ({setBetSize, players}) => {
  useEffect(() => {
    const handleSetBetSize = (e) => {
      const hasActiveBets = players.some(player => player.currentBetSize > 0);
      
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (hasActiveBets) {
          alert("Você não pode alterar o tamanho da aposta enquanto houver apostas ativas.");
          return;
        }
        setBetSize(prev => prev * 2);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (hasActiveBets) {
          alert("Você não pode alterar o tamanho da aposta enquanto houver apostas ativas.");
          return;
        }
        setBetSize(prev => Math.max(prev / 2, 1));
      }
    };
    
    window.addEventListener("keydown", handleSetBetSize);
    return () => window.removeEventListener("keydown", handleSetBetSize);
  }, [players, setBetSize]);

  return null;
};


export default BetSize;