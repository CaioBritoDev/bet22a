import React from 'react'

const PlayerDisplayInfo = ({ nickname }) => {
  return (
    <div className='player-info'>
      <h2>{nickname}</h2>
    </div>
  )
}

export default PlayerDisplayInfo