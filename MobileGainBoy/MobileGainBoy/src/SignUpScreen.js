import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View, SafeAreaView,
    TouchableOpacity,
    TextInput,
} from 'react-native';

const gameBoyPrimaryTxtClr = "#E2E5DE";

function SignUpScreen({ navigation }) {

    //The states to check if text input was received
    const [txtUserFullName,    setTextFullName]        = useState('');
    const [txtEmail,           setTextEmail]           = useState('');
    const [txtPassword,        setTextPassword]        = useState('');
    const [txtConfirmPassword, setTextConfirmPassword] = useState('');

    const register = async () => {
        try {
            if (txtUserFullName === '') {
                alert('Enter your full name');
                return;
            }
    
            if (txtEmail === '') {
                alert('Enter email');
                return;
            }
    
            if (txtPassword === '') {
                alert('Enter password');
                return;
            }
    
            if (txtConfirmPassword === '') {
                alert('Confirm password');
                return;
            }

            if (txtConfirmPassword != txtPassword)
            {
                alert('Confirmed password does not match given password');
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
                let names = txtUserFullName.split(' ');
                global.firstName = names[0].trim();
                global.lastName  = names[1].trim();
                var obj = {firstName:global.firstName,lastName:global.lastName,email:txtEmail.trim(),password:txtConfirmPassword.trim()};
                var js = JSON.stringify(obj);

                const response = await fetch(
                    'https://gainboy.herokuapp.com/api/login',
                    {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}
                );

                var res = JSON.parse(await response.text());
                
                if(res.id <= 0)
                {
                    alert("Couldn't create new account");
                }
                else
                {
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#8fcbbc', justifyContent: 'center' }}>
            <View style={styles.newTitleContainer}>
                <Text>Create New Profile</Text>
            </View>

            <View style={styles.singleFactorContainer}>
                <TextInput style={styles.txtSingleFactorInfo}
                           placeholder="full name" placeholderTextColor={gameBoyPrimaryTxtClr}
                           onChangeText={(value) => setTextFullName(value)}/>

                <View style={styles.spaceContainer}/>

                <TextInput style={styles.txtSingleFactorInfo} 
                           placeholder= "email" placeholderTextColor={gameBoyPrimaryTxtClr}
                           onChangeText={(value) => setTextEmail(value)}/>

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtSingleFactorInfo}
                           placeholder="password" placeholderTextColor={gameBoyPrimaryTxtClr}
                           onChangeText={(value) => setTextPassword(value)}/>

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtSingleFactorInfo}
                           placeholder="confirm password" placeholderTextColor={gameBoyPrimaryTxtClr}
                           onChangeText={(value) => setTextConfirmPassword(value)}/>

                <View style={{ height: 50 }} />
            </View>

            <View style={{ paddingLeft: 120 }}>
                {/*The Create button.*/}
                <TouchableOpacity style={styles.btnCreate} onPress={() => { register(); }}>
                    <Text style={styles.txtBtn}>Create</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 30 }} />

            <View style={{ paddingLeft: 120 }}>
                {/*Button for going back to login page.
                   The 'Login' Stack.Screen is defined in App.js
                */}
                <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.txtBtn}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    newTitleContainer: {
        paddingTop: "10%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    singleFactorContainer: {
        paddingTop: 75,
        paddingLeft: 70,
    },
    spaceContainer: {
        height: 50
    },
    txtSingleFactorInfo: {
        height: 70,
        width: 275,
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
    btnCreate: {
        height: 40,
        width: 150,
        paddingTop: 3,
        paddingLeft: 40,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#d3d3d3',
    },
    btnLogin: {
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
    txtBtn: {
        fontSize: 25,
        color: '#5D3FD3'
    }
});

export default SignUpScreen;