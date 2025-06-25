import React from 'react'

const RankedPlayer = ({ player }) => {
  return (
    <li key={player.id}> {player.name} - {player.formattedScore}</li>
  ) 
}

export default RankedPlayer;