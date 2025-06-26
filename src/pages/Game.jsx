import ButtonStart from "../components/ButtonStart/ButtonStart";
import GameInfo from "../components/GameInfo/GameInfo";
import "./Game.css";

const Game = () => {
  return (
    <div className="game-vision">
      <div className="game-card">
        <GameInfo />
        <ButtonStart />
      </div>
    </div>
  );
};

export default Game;
