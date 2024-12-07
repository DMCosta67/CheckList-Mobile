// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBRQ9bc1Yl1H0iuuP-PxHRJmCVUMeZnDfs",
  authDomain: "coelba-checklist.firebaseapp.com",
  projectId: "coelba-checklist",
  storageBucket: "coelba-checklist.appspot.com", 
  messagingSenderId: "927516170397",
  appId: "1:927516170397:web:47750e8f440c473cf4dc74",
  measurementId: "G-7N9378SDWZ"
};

// Inicialize o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializa a autenticação com persistência utilizando AsyncStorage
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage) 
});

// Inicializa o Analytics se suportado
let analytics;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(firebaseApp); 
  } else {
    console.warn("Firebase Analytics não é suportado neste ambiente.");
  }
});

// Inicializa o Firestore
const db = getFirestore(firebaseApp); 

export { firebaseApp, auth, db, analytics }; 
