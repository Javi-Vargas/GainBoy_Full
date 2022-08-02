import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View, SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import colors from "../assets/colors"

function VerificationScreen({ navigation }) {

    const [code, setCode] = useState('');

    // The error message state
    const [txtError, setTextError] = useState('');
    
    const finish = async () => {
        try {
            if (code === '') {
                setTextError("Enter in the code sent to your email's inbox");
            }
    
            var obj = {code: code.trim()}
            var js = JSON.stringify(obj);
    
            const response = await fetch(
                'https://gainzboy.herokuapp.com/auth/verify',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
            );
    
            let res = JSON.parse(await response.text());
    
            if (res.status == 'good') {
                // Navigation is a property given from the Stack.Screen component in App.js. Inside this 'navigation' property 
                // is a function called navigate() that takes the name of another screen, in this case 'Login', again defined in App.js
                navigation.navigate('Login');
            }
            else {
                setTextError(res.errorMessage);
            }
        }
        catch(e) {
            setTextError(e.message);
        }
    }

    // The render of the error message if there was one
    const errorRender = () => {
        if (txtError != '')
            return (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.txtError}>{txtError}</Text>
            </View>);
        else
            return (<View />);
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: colors.black }}>
            <View style={{height: '10%'}}/>
            
            {/*Verify email text*/}
            <View>
                <Text style={styles.txtVerifyTitle}>Please verify your email</Text>

                <View style={{height: 20}} />

                <Text style={styles.txtVerifyMessage}>
                    We sent an email to your inbox. Click on the link in the email to complete your signup.
                </Text>
            </View>

            <View style={{height: 50}} />

            <View>
                <Image style={styles.img} source={require('../assets/verificationImage.png')} />
            </View>

            <View style={{height: 50}} />

            {errorRender()}

            <View style={{height: 30}} />

            <View style={{alignItems: 'center'}}>
            <TextInput style={styles.txtSingleFactorInfo}
                placeholder="code" placeholderTextColor={colors.black}
                onChangeText={(value) => setCode(value)} />
                
                <TouchableOpacity style={{paddingTop: '10%'}} onPress={() => {finish();}}>
                    <Text style={{fontSize: 25, color:colors.green, textDecorationLine: 'underline'}}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    txtVerifyTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: colors.green
    },
    txtVerifyMessage: {
        fontSize: 20,
        color: colors.white
    },
    img: {
        width:  400,
        height: 250,
        opacity: 0.4
    },
    txtError: {
        fontSize: 20,
        color: colors.red
    },
    txtSingleFactorInfo: {
        height: 65,
        width: 300,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 8,
        borderRadius: 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 50,
        fontSize: 25,
        backgroundColor: colors.white,
        color: colors.black,
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 10, },
        shadowOpacity: 0.5,
    },
});

export default VerificationScreen;
