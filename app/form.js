import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, BackHandler, Image, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { collection, addDoc } from "firebase/firestore"; 
import { db, auth } from '../src/firebase.config.js'; 
import styles from '../src/CSS/form.css.js'; // Estilos
import { useRouter } from 'expo-router'; 
import NetInfo from '@react-native-community/netinfo'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function InspectionForm() {
    const router = useRouter();

    // Estados do formulário
    const [inspetor, setInspetor] = useState('');
    const [inspetor2, setInspetor2] = useState('');
    const [dataInsp, setDataInsp] = useState('');
    const [linhaT, setLinhaT] = useState('');
    const [numEstrutura, setNumEstrutura] = useState('');
    const [descricao, setDescricao] = useState(''); 
    const [userEmail, setUserEmail] = useState('');
    //Loading
    const [loading, setLoading] = useState(false);

    // Estrutura e itens do formulário
    const [estrutura, setEstrutura] = useState([
        { name: 'Torre', status: '' },
        { name: 'Concreto', status: '' },
        { name: 'Suspensão', status: '' },
        { name: 'Ancoragem', status: '' },
        { name: 'Chave Secc', status: '' },
        { name: 'Estrutura derivação metálica', status: '' },
        { name: 'Estrutura derivação concreto', status: '' },
        { name: 'Sky', status: '' },
    ]); 

    const [itens, setItens] = useState([
        { name: 'Faixa de Servidão', selected: false },
        { name: 'Base da Estrutura e Estai', selected: false },
        { name: 'Estrut Metálicas e Concreto', selected: false },
        { name: 'Cadeia de Isol. e acessórios', selected: false },
        { name: 'Cabo Condutor e emendas', selected: false },
        { name: 'Chave Secc de LT', selected: false },
        { name: 'Para Raios', selected: false },
        { name: 'Sinaliz, Travessias e cruzamentos', selected: false },
    ]);

    // Inicializações e efeitos
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) setUserEmail(user.email);
            else {
                Alert.alert("Atenção", "É necessário estar logado.");
                router.replace('/');
            }
        });

        const backAction = () => {
            Alert.alert("Sair", "Você tem certeza que quer voltar?", [
                { text: "Cancelar", style: "cancel" },
                { text: "SIM", onPress: () => router.replace('/home') },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        // Define a data atual
        setDataInsp(() => {
            const date = new Date();
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        });

        return () => {
            unsubscribe();
            backHandler.remove();
        };
    }, [router]);

    // Função para salvar dados localmente
    const saveDataLocally = async (data) => {
        try {
            const existingData = await AsyncStorage.getItem('offlineData');
            const newData = existingData ? JSON.parse(existingData) : [];
            newData.push(data);
            await AsyncStorage.setItem('offlineData', JSON.stringify(newData));
        } catch (error) {
            console.error("Erro ao salvar dados localmente:", error);
        }
    };

    // Submissão do formulário
    const handleSubmit = async () => {
        //inicia o Loading
        setLoading(true);
        const docData = {
            email: userEmail,
            inspetor,
            inspetor2,
            dataInsp,
            linhaT,
            numEstrutura,
            descricao,
            itens,
            estrutura,
        };
    
        try {
            const state = await NetInfo.fetch(); 
            if (state.isConnected) {
                
                const docRef = await addDoc(collection(db, "inspections"), docData);
                Alert.alert("Sucesso", `Dados enviados com sucesso! ID do documento: ${docRef.id}`);
                router.replace('/home'); 
            } else {
                
                Alert.alert("Conexão", "Você está offline. Os dados serão salvos localmente, aperte no botão sincronizar quando estiver online!.");
                await saveDataLocally(docData); 
                router.replace('/home'); 
            }
        } catch (error) {
            console.error("Erro durante o envio dos dados:", error);
            Alert.alert("Erro", "Ocorreu um problema ao processar sua solicitação.");
        }finally {
            // Termina o loading
            setLoading(false);
        }
    };
    

    // Confirmar envio
    const confirmSubmission = () => {
        if (!inspetor || !dataInsp || !linhaT || !numEstrutura) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
            return;
        }

        const isEstruturaSelected = estrutura.some(item => item.selected);
        if (!isEstruturaSelected) {
            Alert.alert("Erro", "Por favor, marque pelo menos uma estrutura.");
            return; 
        }

        const todosItensSelecionados = itens.every(item => item.status === 'C' || item.status === 'NC' || item.status === 'NA');
        if (!todosItensSelecionados) {
            Alert.alert("Erro", "Por favor, marque todos os itens como 'C', 'NC', ou 'NA'.");
            return; 
        }

        Alert.alert(
            "Confirmar Envio",
            "Você tem certeza que deseja enviar o formulário?",
            [{ text: "Cancelar", style: "cancel" }, { text: "OK", onPress: handleSubmit }],
        );
    };

    // Seleção de itens
    const setItemSelection = (itemName) => {
        setItens(prev => 
            prev.map(item => 
                item.name === itemName ? { ...item, selected: !item.selected } : item
            )
        );
    };

    // Seleção da estrutura
    const setOption = (itemName, option) => {
        setItens(prev => 
            prev.map(item => 
                item.name === itemName ? { ...item, status: option } : item
            )
        );
    };

    return (
        <LinearGradient
            colors={['blue', '#0080ff', '#00b200', 'green']}
            start={{ x: 0.5, y: 0.3 }}
            end={{ x: 0.9, y: 0.7 }}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={() => router.replace('/home')} style={styles.backButton}>
                    <Image
                        source={require('../assets/seta.png')}
                        style={styles.setaIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Formulário de Inspeção</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Inspetor"
                    value={inspetor}
                    onChangeText={setInspetor}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Inspetor 2"
                    value={inspetor2}
                    onChangeText={setInspetor2}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Linha T"
                    value={linhaT}
                    onChangeText={setLinhaT}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Número da Estrutura"
                    value={numEstrutura}
                    keyboardType="numeric"
                    onChangeText={setNumEstrutura}
                />
    
                    <Text style={styles.subTitle}>Estrutura:</Text>
                    {estrutura.map(item => (
                    <TouchableOpacity
                        key={item.name}
                        style={[styles.checkboxContainer, item.selected && styles.selectedCheckbox]} 
                        onPress={() => setEstrutura(prev =>
                        prev.map(estrut =>
                         estrut.name === item.name ? { ...estrut, selected: !estrut.selected } : estrut
                    ))}
                    >
                    <Text style={[styles.checkboxText, { color: item.selected ? 'black' : 'white' }]}>
                        {item.selected ? '✔️ ' : '❌ '}
                        {item.name.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </Text>
                    </TouchableOpacity>
                    ))}

                    <Text style={styles.subTitle}>Itens:</Text>
                    {itens.map((item) => (
                        <View key={item.name} style={styles.checkboxContainer}>
                        <Text style={styles.labelText}>
                            {item.name.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                        </Text>
                        <View style={styles.buttonGroup}>
                        <TouchableOpacity 
                            style={[styles.optionButton, item.status === 'C' && styles.selectedButton]}
                            onPress={() => setOption(item.name, 'C')}
                        >
                        <Text style={{ color: item.status === 'C' ? 'white' : 'black' }}>C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.optionButton, item.status === 'NC' && styles.selectedButton]}
                            onPress={() => setOption(item.name, 'NC')}
                        >
                        <Text style={{ color: item.status === 'NC' ? 'white' : 'black' }}>NC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.optionButton, item.status === 'NA' && styles.selectedButton]}
                            onPress={() => setOption(item.name, 'NA')}
                        >
                        <Text style={{ color: item.status === 'NA' ? 'white' : 'black' }}>NA</Text>
                        </TouchableOpacity>
                        </View>
                        </View>
                    ))}

                <TextInput
                    style={styles.descricao}
                    placeholder="Descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                />

                <TouchableOpacity style={styles.button} onPress={confirmSubmission}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#FFFFFF" />
                        <Text style={styles.loadingText}>Aguarde, enviando...</Text>
                    </View>
                )}
            </ScrollView>
        </LinearGradient>
    )
};


