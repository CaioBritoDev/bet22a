// PlayersProvider.js
import { useState } from 'react';
import PlayersContext from './PlayersContext';

export function PlayersProvider({ children }) {
  const [players, setPlayers] = useState([]);

  return (
    <PlayersContext.Provider value={[players, setPlayers]}>
      {children}
    </PlayersContext.Provider>
  );
}
