import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    logo: {
        width: 150,    
        height: 150,   
        marginBottom: 20,
    },  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, 
  },
  formTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%', 
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fundo semi-transparente
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  button12: {
    backgroundColor: '#00FF7F',  
        paddingVertical: 20,  
        paddingHorizontal: 40,  
        borderRadius: 50,  
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,  
},
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  backButton: {
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center', 
  },
});

export default styles;
