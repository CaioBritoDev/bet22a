import React from 'react'

const PlayerBalance = ({ balance }) => {
  return (
    <>
      <p className="player-balance-label">Player Balance</p>
      <p><span className='player-balance'>{balance.toFixed(2)}</span> BIGATO$</p>
    </>
  )
}

export default PlayerBalance;