import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils'
import React, { useContext, useEffect, useState, useRef} from 'react'
import { UserContext } from '../UserContext'

export default function Game() {
    const [apiWord, setApiWord] = useState("")
    const [inputWord, setInputWord] = useState("")
    const [start, setStart] = useState("")
    const {player} = useContext(UserContext)
    const [countDown, setCountDown] = useState({state: false, display: 3})
    const [charNumber, setCharNumber] = useState(0)
    const [timer, setTimer] = useState(0.0)
    const [game, setGame] = useState(false)
    const intervalRef = useRef(null)

    const getWord = async() => {
      const result = await fetch("https://random-word-api.herokuapp.com/word?length=5")
      const word = await result.json()

      return word
      
    }

    useEffect(()=>{
      getWord().then(result=>{
        setApiWord(result[0])
      })
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
      const enterLetter = (e) => {
        setInputWord(prevState=>prevState+e.key)
      }
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
      }else if (start==="game"){
        setGame(true)
        document.addEventListener("keydown", (e)=>enterLetter(e))
  
      }
      if(start==="won" || start==="lost"){
        setGame(false)
        console.log("start changed to", start)
        return document.removeEventListener("keydown", (e)=>enterLetter(e))
      }
      },[start])

      useEffect(()=>{
        if(game){
          let time = 0.0
          intervalRef.current = setInterval(()=>{
          time=time+0.01
          setTimer(time)
          
        },10)
        }
        return ()=>clearInterval(intervalRef.current)
      },[game])
  return (
    <div>
      welocme {player} your word is {apiWord}
      {!countDown.state&&start!=="game"&&<button onClick={()=>{
        setCountDown(prevState=>({...prevState, state:true}))
        setStart("pre")
        }}>Start the Count Down</button>}
      <p>{countDown.state ? countDown.display : <></>}</p>
      {inputWord ? inputWord : <></>}
      {start!=="pre" && timer}
      {start==="won" && <h1>Congrats You Won!</h1>}
      {start==="lost" && <h1>Game Over!</h1>}

    </div>
  )
}
