import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/home')
      }
    })
    return () => unsubscribe()
  }, [navigate])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/home')
    } catch (err) {
      setError('Failed to log in. Check your credentials.')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate('/home')
    } catch (err) {
      setError('Google Login Failed: ' + err.message)
    }
  }

  // Styling with mobile responsiveness
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    },
    button: {
      backgroundColor: '#007BFF',
      color: 'white',
      padding: '12px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s',
      margin: '10px 0',
      width: '100%'
    },
    buttonGoogle: {
      backgroundColor: '#DB4437',
      color: 'white',
      padding: '12px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s',
      margin: '10px 0',
      width: '100%'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
      fontSize: '24px'
    },
    form: {
      width: '100%',
      maxWidth: '400px',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px'
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '15px'
    },
    footer: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#333',
      marginTop: '10px'
    },
    signupLink: {
      display: 'block',
      textAlign: 'center',
      marginTop: '10px',
      color: '#007BFF',
      textDecoration: 'none'
    }
  }

  return (
    <div style={styles.container}>
      <div>
        <h2 style={styles.header}>Login</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />
          <button
            type='submit'
            style={styles.button}
            onMouseEnter={e =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseLeave={e =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          style={styles.buttonGoogle}
          onMouseEnter={e => (e.target.style.backgroundColor = '#c1351d')}
          onMouseLeave={e => (e.target.style.backgroundColor = '#DB4437')}
        >
          Login with Google
        </button>

        <a href='/signup' style={styles.signupLink}>
          Don't have an account? Sign Up
        </a>
        <div style={styles.footer}>
          © {new Date().getFullYear()} Tony Pooyappallil. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Login
