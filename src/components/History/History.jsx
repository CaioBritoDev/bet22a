import "./History.css";
import { useState } from "react";

const History = ({ arrayMultipliers }) => {
  const MAX_TO_SHOW = 15;
  const [showMore, setShowMore] = useState(false);
  const multipliersToShow = showMore
    ? arrayMultipliers.slice(0, arrayMultipliers.length)
    : arrayMultipliers.slice(0, MAX_TO_SHOW);

  const findRightColor = (nMulti) => {
    // Por padrão, fundo branco e texto preto
    let colors = {
      backgroundColor: "#C0C0C0",
      color: "#000000",
    };

    if (nMulti > 2 && nMulti <= 10) {
      // Bronze: texto branco para melhor contraste
      colors = {
        backgroundColor: "#CD7F32",
        color: "#FFFFFF",
      };
    } else if (nMulti > 10 && nMulti <= 50) {
      // Ouro escuro: texto branco para melhor contraste
      colors = {
        backgroundColor: "#179A0B",
        color: "#FFFFFF",
      };
    } else if (nMulti > 50 && nMulti <= 200) {
      // Esmeralda escura: texto branco para melhor contraste
      colors = {
        backgroundColor: "#2563EB", // Verde esmeralda mais escuro
        color: "#FFFFFF",
      };
    } else if (nMulti > 200 && nMulti < 1000) {
      // Roxo reluzente escuro: texto branco para melhor contraste
      colors = {
        backgroundColor: "#6C2BC1", // Roxo mais escuro e ainda vibrante
        color: "#FFFFFF",
      };
    } else if (nMulti >= 1000) {
      // Rosa neon escuro: texto branco para melhor contraste
      colors = {
        backgroundColor: "#B1135A", // Rosa neon mais fechado
        color: "#FFFFFF",
      };
    }

    return colors;
  };

  return (
    <div className="history">
      <p>Histórico de Multiplicadores</p>
      <div className="history-list">
        {multipliersToShow.map((multi, index) => {
          const nMulti = Number(multi);
          const colors = findRightColor(nMulti);
          return (
            <div key={index} className="history-item" style={colors}>
              {multi}x
            </div>
          );
        })}
        <button
          id="show-more-button"
          onClick={() => setShowMore((current) => !current)}
        >
          {arrayMultipliers.length > MAX_TO_SHOW &&
            (showMore ? "Ver menos" : "Ver mais")}
        </button>
      </div>
    </div>
  );
};

export default History;
