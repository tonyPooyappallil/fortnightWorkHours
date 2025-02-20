import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database' // For Realtime Database

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBDd9E_jmFhaToTyx2m_Ez8Uq5TO8JFOtg',
  authDomain: 'shiftscheduler-eea7f.firebaseapp.com',
  databaseURL:
    'https://shiftscheduler-eea7f-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'shiftscheduler-eea7f',
  storageBucket: 'shiftscheduler-eea7f.firebasestorage.app',
  messagingSenderId: '330432293935',
  appId: '1:330432293935:web:db934dd2b857665bf02ada',
  measurementId: 'G-Z9HBSWM5VR' // Optional for Analytics
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const dbRealtime = getDatabase(app) // Initialize Realtime Database
const provider = new GoogleAuthProvider()

export { auth, provider, db, dbRealtime }
