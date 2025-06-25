import React from 'react'
import PlayerDisplayInfo from '../PlayerDisplayInfo/PlayerDisplayInfo'
import PlayerBalance from '../PlayerBalance/PlayerBalance'
import "../Players/Players.css";

const PlayerInfo = ({nickname, balance}) => {
  return (
    <div className='player-info player-card'>
      <PlayerDisplayInfo nickname={nickname} />
      <PlayerBalance balance={balance} />
    </div>
  )
}

export default PlayerInfo