import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils'
import React, { useContext, useEffect, useState, useRef} from 'react'
import { UserContext } from '../UserContext'

export default function Game() {
    const [apiWord, setApiWord] = useState("")
    const [inputWord, setInputWord] = useState("")
    const [start, setStart] = useState("")
    const {gameOn, player, setStats} = useContext(UserContext)
    const [countDown, setCountDown] = useState({state: false, display: 3})
    const [charNumber, setCharNumber] = useState(0)
    const [timer, setTimer] = useState(0.0)
    const [game, setGame] = useState(false)
    const intervalRef = useRef(null)
    
    const getWord = async() => {
      const result = await fetch(`https://random-word-api.herokuapp.com/word?length=${player.letters}`)
      const word = await result.json()
      return word
    }

    const typeletter = (e) => {
      setInputWord(prevState=>prevState+e.key)
    }
    useEffect(()=>{
      if(start===""){
        getWord().then(result=>{
        setApiWord(result[0])
      })}
    },[start])

    useEffect(()=>{
      localStorage.setItem("state", JSON.stringify(gameOn))
    },[])

    useEffect(()=>{
      if(inputWord){
        console.log(apiWord.length)
        if(apiWord.charAt(charNumber)===inputWord.charAt(charNumber)){
          if(charNumber===apiWord.length-1){
            setStart("won")
          }
          setCharNumber(prevNumber=>prevNumber+1)
        }else {
          setStart("lost")
        }
      }
    },[inputWord])


    useEffect(()=>{
      
      if(start==="pre"){
          let counter = countDown.display
          const interval = setInterval(()=>{
            counter--;
            setCountDown(prevState=>({...prevState, display:counter}))
            if(counter===0){
              setCountDown(prevState=>({...prevState,  display: "Start!"}))
              setStart("game")
              clearInterval(interval)
            }
          },1000)
      }
      if (start==="game"){
        setGame(true)
       
      }else if(start==="won" || start==="lost"){
        setGame(false)
        console.log("start changed to", start)
        return 
      }
      },[start])

      useEffect(()=>{
        if(game){
          document.addEventListener("keydown", typeletter)
          let time = 0.0
          intervalRef.current = setInterval(()=>{
          time=time+0.01
          setTimer(time)
          
        },10)
        }
        return ()=>{
          clearInterval(intervalRef.current)
          document.removeEventListener("keydown", typeletter)
        }
      },[game])

      const addToLeaderBoard = () => {
        if(start==="won"){
        setStats(prevState=>{
          if(prevState[`${player.letters} letters`]){
            return {
              ...prevState,
              [`${player.letters} letters`]:[...prevState[`${player.letters} letters`],{ name:player.name, time:timer}].sort((a, b)=>a.time-b.time)
            }
          }else {
            return {
              ...prevState,
              [`${player.letters} letters`]:[{ name:player.name, time:timer}]
            }
          }
        })}
      }
      useEffect(()=>{
        localStorage.setItem(`${player.letters} letter stats`, JSON.stringify(player))
      })

      const handleCountDown = () => {
        setCountDown(prevState=>({...prevState, state:true}))
        setStart("pre")
      }

      const handlePlayAgain = () => {
        setCountDown({state: false, display: 3})
        setInputWord("")
        setCharNumber(0)
        setStart("")
      }
      
      const blankLetters = apiWord.split("")
      const inputWordLetters = blankLetters.map((letter,index)=>(
          inputWord[index] || "_"
      ))

      const displayedLetters = inputWordLetters.map(letter=>(
        <h1 className='letter'>{letter.toUpperCase()}</h1>
      ))

  return (
    <div className='game-box'>
      <h1 className='welcome-header'>Welocme {player.name}</h1>
      <h3 className='word-introduction-header'>Your word is:</h3>
      <h2 className='word'>{apiWord.toUpperCase()}</h2>
      {!countDown.state&&start!=="game"&&<button className="count-down-button"onClick={handleCountDown}>Start the Count Down</button>}
      {countDown.state&&<p className='count-down'>{countDown.display}</p>}
      <div className='displayed-letters'>{displayedLetters}</div>
      <h3 className='timer'>{start!=="pre"&&start!="" && timer.toFixed(2)}</h3>
      {start==="won" && <h1 className='outcome'>Congrats You Won!</h1>}
      {start==="lost" && <h1 className='outcome'>Game Over!</h1>}
      {(start==="lost" || start==="won") && 
      <div className='outcome-buttons-box'>
        <button className='play-again-button' onClick={handlePlayAgain}>Play Again</button>
        {start==="won" && <button className="leader-board-button" onClick={addToLeaderBoard}>Add to LeaderBoard</button>}
        </div>}

    </div>
  )
}
