import { StyleSheet } from 'react-native';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        scrollContainer: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 20,
        },
        title: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 24,
            marginBottom: 20,
        },
        subTitle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: 10,
            marginTop: 20,
        },
        input: {
            height: 55,
            width: '100%',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 15,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
        descricao: {
            top: 5,
            height: 70,
            width: '100%',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 15,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
        checkboxContainer: {
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'flex-start', 
            marginBottom: 20, 
            justifyContent: 'space-between', 
            marginBottom: 10,
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'white', 
            width: '100%'
        },
        checkboxContai: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between', 
            marginBottom: 10,
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'white', 
            width: '100%',
        },
        labelText: {
            color: 'white',
            fontSize: 16,
            marginBottom: 5, 
        },
        buttonGroup: {
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginVertical: 10, 
        },
        optionButton: {
            backgroundColor: 'white',
            borderRadius: 5,
            paddingVertical: 10,        
            paddingHorizontal: 5,       
            marginHorizontal: 5,
            borderWidth: 2,
            borderColor: 'transparent',
            width: 80, 
            height: 50,                 
            alignItems: 'center',
            justifyContent: 'center',
        },
        selectedButton: {
            backgroundColor: '#007bff',
            borderColor: '#007bff', 
        },

    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 15,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white', 
    },
    selectedCheckbox: {
        backgroundColor: '#d1e7dd', 
        borderColor: 'green', 
    },
    checkboxText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center', 
        width: '100%', 
    },
    backButton: {
        top: 1,             
        right: 165,   
        zIndex: 1,           
    },
    setaIcon: {
        width: 30,           
        height: 60,          
    },
    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    loadingText: {
        color: 'white',
        marginLeft: 10,
     },
});

export default styles;