import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

export default function LeaderBoard() {
    const {stats} = useContext(UserContext)
  return (
    <div>{JSON.stringify(stats)}</div>
  )
}
