// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBDd9E_jmFhaToTyx2m_Ez8Uq5TO8JFOtg',
  authDomain: 'shiftscheduler-eea7f.firebaseapp.com',
  projectId: 'shiftscheduler-eea7f',
  storageBucket: 'shiftscheduler-eea7f.firebasestorage.app',
  messagingSenderId: '330432293935',
  appId: '1:330432293935:web:db934dd2b857665bf02ada',
  measurementId: 'G-Z9HBSWM5VR'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const analytics = getAnalytics(app)

const provider = new GoogleAuthProvider()

export { auth, provider }
