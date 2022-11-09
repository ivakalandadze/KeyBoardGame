import React, { useContext, useState} from 'react'
import Stat from '../components/Stat'
import { UserContext } from '../UserContext'

export default function LeaderBoard() {
    const {stats, letterOptions} = useContext(UserContext)
    const [option, setOption]= useState("5")
    const optionElements = letterOptions.map(option=>(
      <button onClick={()=>{setOption(option)}}>{`${option} letter`}</button>
    ))
    console.log(stats[`${option} letters`])
    const statElements = stats[`${option} letters`] && stats[`${option} letters`].map(stat=>(
      <Stat {...stat}/>
    ))
  return (
    <div className='leader-board'>
      <div className='leader-board-header'>
        {optionElements}
      </div>
      {statElements ? statElements : <h1>{`No stats yet for ${option} letter word`}</h1>}
    </div>
  )
}
