import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

export default function StartPage() {
    const {player, setPlayer} = useContext(UserContext)
  return (
    <div>
        <h4 className='start-header'>Welcome to the KeyBoard Game</h4>
        <p className='welocme-text'>To start the game, please enter your name and press Start button, or see the LeaderBoard</p>
        <input type="text" placeholder="Enter Your Name" value={player} onChange={(event)=>{setPlayer(event.target.value)}}/>
        <Link to="/game"><button className='start-button'>Start!</button></Link>
        <Link to="leader-board"><button className='leader-board-button'>Leaderboard</button></Link>
    </div>
  )
}
