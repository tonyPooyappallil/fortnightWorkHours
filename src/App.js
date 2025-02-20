// src/App.js
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import { auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const PrivateRoute = ({ children }) => {
  const [user] = useAuthState(auth)
  return user ? children : <Navigate to='/login' />
}

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/home'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
