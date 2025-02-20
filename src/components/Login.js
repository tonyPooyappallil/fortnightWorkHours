import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase' // Ensure Google provider is imported
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Automatically redirect if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/home') // Redirect to home if user is already logged in
      }
    })

    return () => unsubscribe() // Clean up the listener on unmount
  }, [navigate])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/home') // Redirect after login
    } catch (err) {
      setError('Failed to log in. Check your credentials.')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate('/home') // Redirect after successful login
    } catch (err) {
      setError('Google Login Failed: ' + err.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login in with Google</button>
      <p>
        Don't have an account? <a href='/signup'>Sign Up</a>
      </p>
    </div>
  )
}

export default Login
