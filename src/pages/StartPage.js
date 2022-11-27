import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

export default function StartPage() {
    const {gameOn,setGameOn, player, setPlayer, letterOptions} = useContext(UserContext)
    console.log(player.name)

    const handleChange = (event) =>{
      setPlayer(prevState=>{
        return {
          ...prevState,
          [event.target.name]: event.target.value
        }
      })
    }

    const handleStart = () => {
      player.name&&setGameOn(true)
    }

    useEffect(()=>{
      setGameOn(false)
      localStorage.setItem("state", JSON.stringify(gameOn))
    },[])
    useEffect(()=>{
      localStorage.setItem("player", JSON.stringify(player))
    },[player])

    const optionElements = letterOptions.map(option=>(
      <option value={option}>{option}</option>
    ))
  return (
    <div className='start-page'>
      <div className='start-page-box'>
        <h4 className='start-header'>Welcome to the KeyBoard Game</h4>
        <p className='welcome-text'>To start the game, please enter your name, number of letters in the word and press Start button, or see the LeaderBoard</p>
        <div className='input-box'>
          <div>
            <label className="label" for="name">Enter Name: </label>
            <input type="text" placeholder="Enter Your Name" value={player.name} name="name" onChange={handleChange}/>
          </div>
          <div>
            <label className="label" for="letters">Choose Number of Letters: </label>
            <select value={player.letters} name="letters"onChange={handleChange}>
              {optionElements}
            </select>
          </div>
        </div>
        <div className='start-buttons-box'>
          <Link to="/game"><button onClick={handleStart}className='start-game-button'>Start!</button></Link>
          <Link to="leader-board"><button className='leader-board-button'>Leaderboard</button></Link>
        </div>
      </div>
    </div>
  )
}
