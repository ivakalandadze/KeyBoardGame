import React from 'react'

export default function Stat(props) {
    console.log(props)
  return (
    <div className='stat-box'>
        <p className='name'>Name: {props.name}</p>
        <p className='time'>Time: {props.time}</p>
    </div>
  )
}
