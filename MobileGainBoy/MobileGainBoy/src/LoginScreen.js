import React, { useState } from 'react';
import { 
    Keyboard,
    StyleSheet, 
    Text, 
    View, SafeAreaView, 
    Image, 
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';

const gameBoyPrimaryTxtClr = "#E2E5DE";

function LoginScreen({ navigation }) {

    //The states to check if text input was received
    const [txtEmail,    setTextEmail]    = useState('');
    const [txtPassword, setTextPassword] = useState('');

    const login = async () => {
        try {
            if (txtEmail === '') {
                alert('Enter email');
                return;
            }
    
            if (txtPassword === '') {
                alert('Enter password');
                return;
            }

            //This is to avoid hitting the API since it's currently not working
            let preprocessor = true

            if (preprocessor)
            {
                navigation.navigate('Workout');
            }
            else
            {
                var obj = {login:txtEmail.trim(),password:txtPassword.trim()};
                var js = JSON.stringify(obj);

                const response = await fetch(
                    'https://gainboy.herokuapp.com/api/login',
                    {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}
                );

                var res = JSON.parse(await response.text());
                
                if(res.id <= 0)
                {
                    alert("User/Password combination incorrect");
                    alert(txtEmail);
                }
                else
                {
                    global.firstName = res.firstName;
                    global.lastName = res.lastName;
                    global.userId = res.id;

                    // Navigation is a property given from the Stack.Screen component in App.js. Inside this 'navigation' property 
                    // is a function called navigate() that takes the name of another screen, in this case 'Workout', again defined in App.js
                    navigation.navigate('Workout');
                }
            }
        }
        catch(e) 
        {
            alert(e.message);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#8fcbbc' }}>
            <View style={styles.imgContainer}>
                <Image style={styles.logo} source={require('./../assets/gameboy2.0.png')} />
                {/* <Image style= {styles.logo} source= {require('./../assets/favicon.png')} /> */}
            </View>

            <View style={styles.singleFactorContainer}>
                <TextInput style={styles.txtSingleFactorInfo} 
                           placeholder="email" placeholderTextColor={gameBoyPrimaryTxtClr}
                           onChangeText={(value) => setTextEmail(value)}/>

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtSingleFactorInfo} 
                           placeholder="password" placeholderTextColor={gameBoyPrimaryTxtClr} secureTextEntry={true}
                           onChangeText={(value) => setTextPassword(value)}/>

                <View style={{ height: 30 }} />
            </View>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
                <View style={{ paddingLeft: 125 }}>
                    {/*The Start/Login button*/}
                    <TouchableOpacity style={styles.btnStart} onPress={() => { login(); }}>
                        <Text style={styles.txtBtnStart}>Start</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.spaceContainer} />

            <View style={{ paddingLeft: 125 }}>
                {/*The Create Account button.
                   The 'SignUp' Stack.Screen is defined in App.js
                */}
                <TouchableOpacity style={styles.btnCreate} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.txtBtnCreate}>New User</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '45%',
    },
    singleFactorContainer: {
        paddingTop: 10,
        paddingLeft: 80,
    },
    spaceContainer: {
        height: 20
    },
    txtSingleFactorInfo: {
        height: 70,
        width: 250,
        paddingLeft: 25,
        paddingBottom: 8,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 50,
        fontSize: 25,
        backgroundColor: '#A482FF',
        color: '#E2E5DE'
    },
    btnStart: {
        height: 40,
        width: 150,
        paddingTop: 3,
        paddingLeft: 45,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#d3d3d3',
    },
    btnCreate: {
        height: 40,
        width: 150,
        paddingTop: 5,
        paddingLeft: 35,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#d3d3d3',
    },
    txtBtnStart: {
        fontSize: 25,
        color: '#5D3FD3'
    },
    txtBtnCreate: {
        fontSize: 20,
        color: '#5D3FD3'
    },
    logo: {
        width: 100,
        height: 100,
    }
});

export default LoginScreen;