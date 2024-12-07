import { useState, useEffect } from "react";
import { Pressable, Text, TextInput, View, BackHandler, Alert} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
// CSS
import styles from '../src/CSS/replace.css.js';
// ROTAs
import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from "firebase/auth";
// Autentificação com Firebase
import { auth } from '../src/firebase.config.js';

export default function ReplacePass() {
    const [userMail, setUserMail] = useState('');
    const router = useRouter();

    //Botão de voltar para voltar ao Login
    useEffect(() => {
    const backAction = () => {
        Alert.alert("Sair", "Você tem certeza que deseja voltar?", [
            {
                text: "Cancelar",
                onPress: () => null,
                style: "cancel",
            },
            { 
                text: "SIM", 
                onPress: () => router.push('/')
            }
        ]);
        return true; 
    };

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return () => backHandler.remove(); 
}, [router]);

    function replacePass() {
        if (userMail !== '') {
            sendPasswordResetEmail(auth, userMail)
            .then(() => {
                alert("Foi enviado um email para: " + userMail + ". Verifique sua caixa de email.");
                router.replace('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert("Ops! Alguma coisa não deu certo. " + errorMessage + ". Tente novamente ou pressione voltar");
            });
        } else {
            alert("É preciso informar um e-mail válido para fazer a redefinição de senha");
        }
    }

    return (
        <LinearGradient
            colors={['blue', '#0080ff', '#00b200', 'green']}
            start={{ x: 0.5, y: 0.3 }}
            end={{ x: 0.9, y: 0.7 }}
            style={styles.container}
        >

            <View style={styles.innerContainer}>
                <Text style={styles.formTitle}>Redefinição de senha:</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Informe o email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={userMail}
                    onChangeText={setUserMail}
                />
                <View style={styles.refSenha}>
                    
                <Pressable
                    style={styles.button}
                    onPress={() => router.push("/")}
                >
                    <Text style={styles.buttonText}>Voltar</Text>
                </Pressable>

                <Pressable
                    style={styles.button}
                    onPress={replacePass}
                >
                    <Text style={styles.buttonText}>Enviar</Text>
                </Pressable>

                </View>
            </View>
        </LinearGradient>
    );
}
