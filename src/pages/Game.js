import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'

export default function Game() {
    const [word, setWord] = useState("")
    console.log("renderd")
    const {player} = useContext(UserContext)

    const getWord = async() => {
      console.log("daifecha")
      const result = await fetch("https://random-word-api.herokuapp.com/word?length=5")
      const word = await result.json()

      return word
      
    }

    // const getWord = () => {
    //   fetch("https://random-word-api.herokuapp.com/word?length=5")
    //   .then(result=>result.json())
    //   .then(data=>setWord(data))
    // }

    useEffect(()=>{
      
      getWord().then(result=>{
        setWord(result)
      })
    },[])



    useEffect(()=>{
      const logEvent = (e) => {
        console.log(e)
      }
        document.addEventListener("keydown", (e)=>logEvent(e))
        
        return document.removeEventListener("keydown", (e)=>logEvent(e))
    },[])
  return (
    <div>
      {word!=="" ? <div>welocme {player} your word is {word}</div> : null
        }
    </div>
  )
}
