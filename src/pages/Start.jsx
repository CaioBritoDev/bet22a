import React, { useContext } from 'react'
import Players from '../components/Players/Players';
import PlayersContext from '../contexts/PlayersContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function addPlayer(players, setPlayers) {
  if (players.length >= 4) {
    alert('Número máximo de jogadores atingido!');
    return;
  }
  const newPlayer = {
    id: players.length + 1,
    nickname: prompt("Nickname do jogador " + String(players.length + 1)),
    balance: 100,
    currentBetSize: 0,
    cashedOutAt: null
  };
  setPlayers([...players, newPlayer]); // => ...players => vários objetos (que já estavam presentes no array) [{}, {}, ..., {}]
}

const Start = () => {
  const [players, setPlayers] = useContext(PlayersContext);
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        addPlayer(players, setPlayers);
      }
      if (e.key === 'Enter') {
        navigate("/crash")
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Limpa o listener ao desmontar o componente
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [players, setPlayers, navigate]);

  return (
    <>
      <Players players={players} />
    </>
  )
}

export default Start;