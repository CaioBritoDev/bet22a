import BestPlayersRanking from '../BestPlayersRanking/BestPlayersRanking'
import { Link } from 'react-router-dom';

const ButtonStart = () => {

  return (
  
    <Link to="/start">
      <button className='start'>Start</button>
    </Link>
    
  )
}

export default ButtonStart;

// BestPlayersRanking({
//   players: [
//     { id: 1, name: 'Jogador 1', formattedScore: '100 BIGATO$' },
//     { id: 2, name: 'Jogador 2', formattedScore: '90 BIGATO$' },
//     { id: 3, name: 'Jogador 3', formattedScore: '80 BIGATO$' },
//   ]
// })

// props: {
//   players: [
//     { id: 1, name: 'Jogador 1', formattedScore: '100 BIGATO$' },
//     { id: 2, name: 'Jogador 2', formattedScore: '90 BIGATO$' },
//     { id: 3, name: 'Jogador 3', formattedScore: '80 BIGATO$' },
//   ]
// })

// const { players } = props;
