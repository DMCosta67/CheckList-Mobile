// offlineSync.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../src/firebase.config.js';
import NetInfo from '@react-native-community/netinfo';

// Função para salvar dados localmente
export const saveDataLocally = async (data) => {
    try {
        const existingData = await AsyncStorage.getItem('offlineData');
        const newData = existingData ? JSON.parse(existingData) : [];
        newData.push(data);
        await AsyncStorage.setItem('offlineData', JSON.stringify(newData));
    } catch (error) {
        console.error("Erro ao salvar dados localmente:", error);
    }
};

export const syncData = async () => {
    try {
        const offlineData = await AsyncStorage.getItem('offlineData');
        if (offlineData) {
            const dataToSync = JSON.parse(offlineData);
            for (const data of dataToSync) {
                try {
                    await addDoc(collection(db, "inspections"), data);
                    console.log("Dados sincronizados:", data);
                } catch (error) {
                    console.error("Erro ao enviar dados offline:", error);
                }
            }
            // Limpeza dos dados armazenados offline após sucesso
            await AsyncStorage.removeItem('offlineData');
        }
    } catch (error) {
        console.error("Erro ao acessar dados armazenados:", error);
    }
};

// Função para verificar a conexão e sincronizar dados se estiver online
export const checkConnectionAndSync = () => {
    NetInfo.fetch().then(state => {
        if (state.isConnected) {
            syncData(); // Tenta sincronizar os dados quando a conexão é restabelecida
        }
    });

    
    const unsubscribe = NetInfo.addEventListener(state => {
        if (state.isConnected) {
            syncData(); // Tenta sincronizar os dados ao voltar online
        }
    });

    return unsubscribe; 
};
