import React, { useEffect, useState } from 'react';
import { Pressable, TextInput, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
// CSS
import styles from '../src/CSS/index.css.js';
// Autentificação com Firebase
import { auth } from '../src/firebase.config.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
// ROTAs
import { useRouter } from 'expo-router';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace('/home'); 
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe(); 
  }, [router]);

  const replacePass = () => {
    router.replace('/replacePass');
  }

  // Fazer Login
  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password) 
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.replace('/home'); 
      })
      .catch((error) => {
        const errorMsg = error.message;
        alert('Seu email ou senha está incorreto...'); 
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; 
  }

  return (
    <LinearGradient
      colors={['blue', '#0080ff', '#00b200', 'green']}
      start={{ x: 0.5, y: 0.3 }}
      end={{ x: 0.9, y: 0.7 }}
      style={styles.container}
    >
      <StatusBar style="auto" />

      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable  onPress={replacePass}>
        <Text style={styles.senh} >Esqueci a senha</Text>
      </Pressable>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Logar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
