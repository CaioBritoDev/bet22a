import { BrowserRouter as Router,  Routes, Route} from 'react-router-dom';
import Game from './pages/Game.jsx';
import Start from './pages/Start.jsx';
import Crash from './pages/Crash.jsx';
import {PlayersProvider} from './contexts/PlayersProvider.jsx';
import "./index.css";

const App = () => {
  return (
    <PlayersProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Game/>}></Route>
          <Route path='/start' element={<Start/>}></Route>
          <Route path='/crash' element={<Crash/>}></Route>
        </Routes>
      </Router>
    </PlayersProvider>
  )
}

export default App; 