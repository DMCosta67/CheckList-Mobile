import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: { 
    width: '100%',
    alignItems: 'center',
  },
  formTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 50, 
    width: '80%', 
    maxWidth: 400, 
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
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  refSenha: {
    flexDirection: 'row',
  }, 
});

export default styles;
