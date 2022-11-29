import React from 'react'

export default function Stat(props) {
    console.log(props)
  return (
    <div className='stat-box'>
        <p className='stat-info'>Name: {props.name}</p>
        <p className='stat-info'>Time: {props.time.toFixed(2)}</p>
    </div>
  )
}
