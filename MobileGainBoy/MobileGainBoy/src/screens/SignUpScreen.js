import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View, SafeAreaView,
    TouchableOpacity,
    TextInput,
} from 'react-native';

// PREPROCESSORS for Unit testing
const UNIT_SECURE_PASSWORD = false;
const UNIT_REGISTER        = false;
const UNIT_MISMATCH        = false;

function SignUpScreen({ navigation }) {

    //The states to check if text input was received
    const [txtUserFullName,    setTextFullName]        = useState('');
    const [txtEmail,           setTextEmail]           = useState('');
    const [txtPassword,        setTextPassword]        = useState('');
    const [txtConfirmPassword, setTextConfirmPassword] = useState('');

    // The error message state
    const [txtError, setTextError] = useState('');

    // Use this to navigate to pages so that the error message always clears
    const navigateTo = (screen) => {
        setTextError('');
        
        // navigation is a property given from the Stack.Screen component in App.js. Inside this 'navigation' property 
        // is a function called navigate() that takes the name of another screen
        navigation.navigate(screen);
    }

    const register = async () => {
        try {

            var obj;

            // <----------UNIT TEST----------> 
            //  Automated test for making sure password.length is >= 6
            if (UNIT_SECURE_PASSWORD)
            {
                obj = {fullname: 'test', email:'no_way_this_would_ever_be_valid@wut.com',password:'five',passwordVerify:'five'};
            }
            //  Automated test for registering in with existing user
            else if (UNIT_REGISTER)
            {
                obj = {fullname: 'Chris Lee', email:'monkncheese@gmail.com',password:'nuggets',passwordVerify:'nuggets'};
            }
            //  Automated test for passwords not matching
            else if (UNIT_MISMATCH)
            {
                obj = {fullname: 'test', email:'no_way_this_would_ever_be_valid@wut.com',password:'nuggets',passwordVerify:'warriors'};
            }
            // --------------------------------->
            else
            {
                obj = {fullname: txtUserFullName.trim(), email:txtEmail.trim(),
                       password:txtPassword.trim(),passwordVerify:txtConfirmPassword.trim()};
            }

            var js = JSON.stringify(obj);

            const response = await fetch(
                'https://gainzboy.herokuapp.com/auth/Register',
                {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}
            );

            var res = JSON.parse(await response.text());
            
            if(res.status == 'PENDING')
            {
                // Need to cache these so the verification page can access them
                global.email    = txtEmail.trim();
                global.password = txtPassword.trim();
                
                // The 'Verification' screen is defined in App.js
                navigateTo('Verification');
            }
            else
            {
                setTextError(res.errorMessage);
            }
        }
        catch(e) 
        {
            setTextError(e.message);
        }
    }

    // The render of the error message if there was one
    const errorRender = () => {
        if (txtError != '')
            return (<View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.txtError}>{txtError}</Text>
                    </View>);
        else
            return (<View/>);
    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#8fcbbc', justifyContent: 'center' }}>
            <View style={styles.newTitleContainer}>
                <Text>Create New Profile</Text>
            </View>

            <View style={styles.singleFactorContainer}>
                <TextInput style={styles.txtSingleFactorInfo}
                           placeholder="full name" placeholderTextColor={global.gameBoyPrimaryTxtClr}
                           onChangeText={(value) => setTextFullName(value)}/>

                <View style={styles.spaceContainer}/>

                <TextInput style={styles.txtSingleFactorInfo} 
                           placeholder= "email" placeholderTextColor={global.gameBoyPrimaryTxtClr}
                           onChangeText={(value) => setTextEmail(value)}/>

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtSingleFactorInfo}
                           placeholder="password" placeholderTextColor={global.gameBoyPrimaryTxtClr}
                           onChangeText={(value) => setTextPassword(value)}/>

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtSingleFactorInfo}
                           placeholder="confirm password" placeholderTextColor={global.gameBoyPrimaryTxtClr}
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
                <TouchableOpacity style={styles.btnLogin} onPress={() => navigateTo('Login')}>
                    <Text style={styles.txtBtn}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={{height: 30}} />

            {errorRender()}
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
        paddingRight: 25,
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
    },
    txtError: {
        fontSize: 20,
        color: 'red'
    }
});

export default SignUpScreen;