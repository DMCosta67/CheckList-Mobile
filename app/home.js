import React, { useEffect, useState } from 'react'; 
import { View, Image, Text, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
// CSS
import styles from '../src/CSS/home.css.js'
// Autenticação com Firebase
import { auth } from '../src/firebase.config.js';
import { signOut } from 'firebase/auth';
// Sincronização offline
import { syncData } from './offlineSync.js'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
    const router = useRouter();
    const [hasOfflineData, setHasOfflineData] = useState(false); 
    const [isSyncing, setIsSyncing] = useState(false); // Estado de carregamento (evitar múltiplos cliques)
    
    // Função para verificar se há dados offline
    const checkOfflineData = async () => {
        try {
            const offlineData = await AsyncStorage.getItem('offlineData');
            if (offlineData) {
                const data = JSON.parse(offlineData);
                setHasOfflineData(data.length > 0); 
            }
        } catch (error) {
            console.error("Erro ao verificar dados offline:", error);
        }
    };

    // Função para sincronizar dados offline
    const handleSync = async () => {
        if (isSyncing) return; // Impede múltiplos cliques enquanto já está sincronizando

        setIsSyncing(true); 
        try {
            await syncData(); 
            Alert.alert("Sucesso", "Dados sincronizados com sucesso!");

            // Após sincronizar, limpa os dados armazenados no AsyncStorage
            await AsyncStorage.removeItem('offlineData');
            setHasOfflineData(false); 
        } catch (error) {
            console.error("Erro ao sincronizar dados:", error);
            Alert.alert("Erro", "Ocorreu um erro ao sincronizar os dados.");
        } finally {
            setIsSyncing(false); 
        }
    };

    // Botão de voltar para sair do App
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Sair", "Você tem certeza que deseja sair do aplicativo?", [
                {
                    text: "Cancelar",
                    onPress: () => null,
                    style: "cancel"
                },
                {
                    text: "SIM", 
                    onPress: () => {
                        BackHandler.exitApp(); 
                    }
                }
            ]);
            return true; 
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    // Verifica se está logado
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // Usuário logado
            } else {
                alert('É necessário estar logado para acessar esse recurso!');
                router.replace('/');
            }
        });
        return () => unsubscribe();
    }, [router]);

    const cadastrarForm = () => {
        router.replace('/form'); 
    };

    const logout = () => {  
        signOut(auth)
            .then(() => {
                alert('Você desconectou do sistema!');
                router.replace('/');  
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    // Verifica se há dados offline assim que o componente for montado
    useEffect(() => {
        checkOfflineData();
    }, []);

    return (
        <LinearGradient
            colors={['blue', '#0080ff', '#00b200', 'green']}
            start={{ x: 0.5, y: 0.3 }}
            end={{ x: 0.9, y: 0.7 }}
            style={styles.container}
        >
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={cadastrarForm}>
                    <Text style={styles.buttonText}>Cadastrar Form</Text>
                </TouchableOpacity>

                {/* Exibe o botão de sincronização apenas se houver dados offline */}
                {hasOfflineData && (
                    <TouchableOpacity 
                        style={[styles.button12, isSyncing && { backgroundColor: 'gray' }]} // Desabilita o botão durante a sincronização
                        onPress={handleSync}
                        disabled={isSyncing} // Desabilita o botão durante a sincronização
                    >
                        <Text style={styles.buttonText}>
                            {isSyncing ? 'Sincronizando...' : 'Sincronizar Dados' }
                        </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.button} onPress={logout}>
                    <Text style={styles.buttonText}>Logout</Text> 
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}
