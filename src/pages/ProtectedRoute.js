import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    const {gameOn} = useContext(UserContext)
  return ( 
    gameOn ? <Outlet /> : <Navigate  to="/"/>
  )
}
