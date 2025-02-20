import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './../firebase'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async e => {
    e.preventDefault()

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/home') // Redirect after signup
    } catch (err) {
      setError('Failed to sign up. Try again.')
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword)

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      padding: '30px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '100%',
      maxWidth: '400px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '8px'
    },
    button: {
      padding: '12px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    buttonHover: {
      backgroundColor: '#0056b3'
    },
    errorText: {
      color: 'red',
      textAlign: 'center'
    },
    loginPrompt: {
      textAlign: 'center', // Center the text
      marginTop: '20px' // Space above the text
    },
    loginLink: {
      color: '#007BFF',
      textDecoration: 'none',
      fontWeight: 'bold' // Make the link stand out
    },
    passwordVisibilityToggle: {
      cursor: 'pointer',
      color: '#007BFF',
      fontSize: '14px',
      textAlign: 'right',
      marginTop: '-10px' // Space between the input field and the toggle
    }
  }

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      {error && <p style={styles.errorText}>{error}</p>}
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <div
          style={styles.passwordVisibilityToggle}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? 'Hide Password' : 'Show Password'}
        </div>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <div
          style={styles.passwordVisibilityToggle}
          onClick={toggleConfirmPasswordVisibility}
        >
          {showConfirmPassword
            ? 'Hide Confirm Password'
            : 'Show Confirm Password'}
        </div>
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
          Sign Up
        </button>
      </form>
      <p style={styles.loginPrompt}>
        Already have an account?{' '}
        <a href='/login' style={styles.loginLink}>
          Login
        </a>
      </p>
    </div>
  )
}

export default Signup
