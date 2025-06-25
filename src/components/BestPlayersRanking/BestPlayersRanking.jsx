import React from 'react'
import RankedPlayer from '../RankedPlayer/RankedPlayer.jsx'

const BestPlayersRanking = ({players}) => {
  return (
    <div>
      <h2>Top 3 Jogadores</h2>
      <ul>
        {players.map((player, index) => (
          <RankedPlayer key={index} player={player} />
        ))}
      </ul>
    </div>
  )
}

export default BestPlayersRanking