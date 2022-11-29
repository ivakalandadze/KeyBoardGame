import React, { useContext, useState} from 'react'
import Stat from '../components/Stat'
import { UserContext } from '../UserContext'

export default function LeaderBoard() {
    const {stats, letterOptions} = useContext(UserContext)
    const [option, setOption]= useState(5)
    const optionElements = letterOptions.map(opt=>(
      <button 
        className={`${option===opt ? "choosen-" : ""}option-button`}
        onClick={()=>setOption(opt)}>
          {`${opt} letter`}
        </button>
    ))
    console.log(option)
    const statElements = stats[`${option} letters`] && stats[`${option} letters`].map(stat=>(
      <Stat {...stat}/>
    ))
  return (
    <div className='leader-board'>
      <div className='leader-board-header'>
        {optionElements}
      </div>
      <div className='stats-container'>
        {statElements ? statElements : <h1 className='warning'>{`No stats yet for ${option} letter word`}</h1>}
      </div>
    </div>
  )
}
