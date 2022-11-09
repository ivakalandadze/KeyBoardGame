import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import StartPage from './StartPage'
import { Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    const {player} = useContext(UserContext)
  return ( 
    player.name ? <Outlet /> : <StartPage />
  )
}
