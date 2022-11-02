import './App.css';
import { Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Game from './pages/Game';
import LeaderBoard from './pages/LeaderBoard';
import { UserContext } from './UserContext';
import { useState } from 'react';

function App() {

  const [player, setPlayer] = useState('')
  const [stats, setStats] = useState([{}])
  return (
    <div className="App">
      <UserContext.Provider value={{player, setPlayer, stats, setStats}}>
        <Routes>
          <Route path="/" element={<StartPage />}/>
          <Route path="/game" element={<Game />}/>
          <Route path="/leader-board" element={<LeaderBoard />}/>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
