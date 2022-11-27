import './App.css';
import './Header.css'
import './StartPage.css'
import './LeaderBoard.css'
import { Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import Game from './pages/Game';
import LeaderBoard from './pages/LeaderBoard';
import Header from './components/Header';
import { UserContext } from './UserContext';
import { useState } from 'react';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {

  const [stats, setStats] = useState({})
  const [letterOptions, setLetterOptions] = useState([5, 6, 7, 8, 9, 10])
  const [player, setPlayer] = useState(JSON.parse(localStorage.getItem("player")) || {name: "", letters: letterOptions[0]})
  const [gameOn, setGameOn] = useState(JSON.parse(localStorage.getItem("state")) || false)
  return (
    <div className="App">
      <UserContext.Provider value={{gameOn, setGameOn, player, setPlayer, stats, setStats, letterOptions}}>
        <Header />
        <Routes>
          <Route path="/" element={<StartPage />}/>
          <Route element={<ProtectedRoute />}>
            <Route path="/game" element={<Game />}/>
          </Route>
          <Route path="/leader-board" element={<LeaderBoard />}/>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
