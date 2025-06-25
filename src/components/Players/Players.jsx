import PlayerInfo from "../PlayerInfo/PlayerInfo";
import "./Players.css";

const Players = ({ players }) => {
  return (
    <div className="players-list">
      {players.map((player) => (
        <PlayerInfo
          key={player.id}
          nickname={player.nickname}
          balance={player.balance}
        />
      ))}
    </div>
  );  
};

export default Players;
