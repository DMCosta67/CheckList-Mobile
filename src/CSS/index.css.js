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
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  senh: {
    fontWeight: 'bold', 
    fontSize: 13,
    textDecorationLine: 'underline',
}
});

export default styles;
