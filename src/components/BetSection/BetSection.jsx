import PlayersContext from "../../contexts/PlayersContext";
import BetSize from "../BetSize/BetSize";
import Players from "../Players/Players";
import { useContext, useEffect, useState } from "react";
import "./BetSection.css";

const setPlayerBalanceByIdAndBetSize = (
  playerId,
  players,
  setPlayers,
  betSize
) => {
  const player = players.find((p) => p.id === playerId);
  if (player && player.balance > 0) {
    if (player.balance < betSize) {
      player.currentBetSize += player.balance;
      player.balance = 0;
    } else {
      player.currentBetSize += betSize;
      player.balance -= betSize;
    }
    setPlayers([...players]);
  } else {
    console.error(
      `Jogador com ID ${playerId} não encontrado ou já apostou tudo que tinha.`
    );
  }
};

const BetSection = ({ secondsToStart, setSecondsToStart }) => {
  const [players, setPlayers] = useContext(PlayersContext);
  const [betSize, setBetSize] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      let playerId = null;
      if (e.key === "CapsLock") {
        playerId = 1;
      } else if (e.key === " ") {
        playerId = 2;
      } else if (e.key === "Enter") {
        playerId = e.location === 0 ? 3 : 4;
      } else if (e.key === "p") {
        setSecondsToStart(0);
      }

      if (playerId !== null) {
        setPlayerBalanceByIdAndBetSize(playerId, players, setPlayers, betSize);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [players, betSize, setPlayers, setSecondsToStart]);

  return (
    <div className="bet-section">
      <div className="overlay"></div>
      <div className="content">
        <h1>Crash Game 22A</h1>
        <p className="description">Achou que os gráfico ia ser uma merda né kkkkk</p>
        <p className="timer-display">
          Próximo Round Em: {secondsToStart}s
        </p>
        <div className="bet-controls">
          <div className="bet-size-label">Tamanho da Aposta</div>
          <div className="bet-size-display">{betSize} BIGATO$</div>
          <BetSize
            setBetSize={setBetSize}
            players={players}
          />
        </div>
        <div className="keyboard-shortcuts">
          <div className="key-shortcut">
            <div className="key-box">Tab</div>
            <div className="key-label">Jogador 1</div>
          </div>
          <div className="key-shortcut">
            <div className="key-box">Espaço</div>
            <div className="key-label">Jogador 2</div>
          </div>
          <div className="key-shortcut">
            <div className="key-box">Enter</div>
            <div className="key-label">Jogador 3</div>
          </div>
          <div className="key-shortcut">
            <div className="key-box">Num Enter</div>
            <div className="key-label">Jogador 4</div>
          </div>
          <div className="key-shortcut">
            <div className="key-box">p</div>
            <div className="key-label">Pula Tempo</div>
          </div>
        </div>
        <Players players={players} />
      </div>
    </div>
  );
};
export default BetSection;
