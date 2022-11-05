import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

export default function StartPage() {
    const {player, setPlayer} = useContext(UserContext)
    console.log(player.name)

    const handleChange = (event) =>{
      setPlayer(prevState=>{
        return {
          ...prevState,
          [event.target.name]: event.target.value
        }
      })
    }
  return (
    <div>
        <h4 className='start-header'>Welcome to the KeyBoard Game</h4>
        <p className='welocme-text'>To start the game, please enter your name, number of letters in the word and press Start button, or see the LeaderBoard</p>
        <input type="text" placeholder="Enter Your Name" value={player.name} name="name" onChange={handleChange}/>
        <input type="text" placeholder="Enter Your Name" value={player.letters} name="letters" onChange={handleChange}/>
        <Link to="/game"><button className='start-game-button'>Start!</button></Link>
        <Link to="leader-board"><button className='leader-board-button'>Leaderboard</button></Link>
    </div>
  )
}
