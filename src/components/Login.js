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

  // Styling
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      // padding: '30px',
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      backgroundColor: '#007BFF',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s',
      margin: '10px 0',
      width: '100%',
      maxWidth: '400px' // Same max width as the form inputs
    },
    buttonGoogle: {
      backgroundColor: '#DB4437', // Google red
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s',
      margin: '10px 0',
      width: '100%',
      maxWidth: '450px' // Same max width as the form inputs and other buttons
    },
    buttonHover: {
      backgroundColor: '#0056b3' // Darker blue for button hover
    },
    header: {
      textAlign: 'center',
      marginTop: '30px',
      marginBottom: '20px',
      color: '#333',
      fontSize: '30px'
    },
    form: {
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    },
    input: {
      width: '380px',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
      maxWidth: '400px'
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '15px'
    },
    footer: {
      textAlign: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: '20px',
      fontSize: '14px',
      color: '#333',
      width: '400px',
      margin: 'auto'
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
