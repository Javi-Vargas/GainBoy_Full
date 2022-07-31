import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View, SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import colors from '../assets/colors'

// PREPROCESSORS for Unit testing
const UNIT_RESET_PASSWORD = false;

function ForgotPasswordScreen({ navigation }) {

    //The states to check if text input was received
    const [txtEmail, setTextEmail] = useState('');
    const [txtPassword, setTextPassword] = useState('');
    const [txtCode, setTextCode] = useState('');

    // The error message state
    const [txtError, setTextError] = useState('');

    // The password reset state
    const [passwordReset, setPasswordReset] = useState(false);

    const reset = async () => {
        try {
            if (!UNIT_RESET_PASSWORD && txtEmail === '')
            {
                setTextError('Enter an email to send code to inbox');
                return;
            }
            
            var obj;

            // <----------UNIT TESTING----------> 
            //  Automated test for reseting passwords
            if (UNIT_RESET_PASSWORD) {
                obj = {email: 'christopher.beltran.cop4331@gmail.com'};
            }
            // --------------------------------->
            else {
                obj = {email: txtEmail.trim()};
            }

            var js = JSON.stringify(obj);

            const response = await fetch(
                'https://gainzboy.herokuapp.com/auth/sendPasswordReset',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
            );

            let res = JSON.parse(await response.text());

            if (res.status == undefined) {
                setTextError('Could not display your workouts');
            }
            else {
                setTextError('');
                setPasswordReset(true);
            }
        }
        catch (e) {
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

    // The render to continue back to login page
    const resetRender = () => {
        
        const resetContinue = async () => {
            try {
                if (txtCode == '') {
                    setTextError('Enter a code to reset password');
                    return;
                }

                if (txtPassword == '') {
                    setTextError('Enter your password');
                    return;
                }
                
                var obj = {code: Number(txtCode), password: txtPassword.trim()};
                var js = JSON.stringify(obj);
    
                const response = await fetch(
                    'https://gainzboy.herokuapp.com/auth/setPassword',
                    { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
                );
    
                let res = JSON.parse(await response.text());
    
                if (res.errorMessage == 'password reset') {
                    navigation.navigate('Login');
                }
                else {
                    setTextError(res.errorMessage);
                }
            }
            catch (e) {
                setTextError(e.message);
            }
        }
        
        if (passwordReset)
            return (<View style={{alignItems: 'center'}}>
                        <Text style={styles.lblVerifyMessage}>
                            We sent a code to your inbox. Enter the code here to reset password.
                        </Text>

                        <View style={{ height: 40 }} />

                        <TextInput style={styles.txtSingleFactorInfo}
                            placeholder="code" placeholderTextColor={colors.black}
                            onChangeText={(value) => setTextCode(value)} />

                        <View style={{ height: 20 }} />

                        <TextInput style={styles.txtSingleFactorInfo}
                            placeholder="new password" placeholderTextColor={colors.black}
                            onChangeText={(value) => setTextPassword(value)} />

                        <View style={{ height: 20 }} />

                        <TouchableOpacity onPress={() => {resetContinue();}}>
                            <Text style={styles.lblContinue}>Continue</Text>
                        </TouchableOpacity>
                    </View>);
        else
            return (<View />);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                    <View style={{ height: '15%' }} />

                    <Text style={styles.lblTitle}>Please verify your email</Text>

                    <View style={{ height: 125 }} />

                    {/*Verify email text*/}
                    <View>
                        <TextInput style={styles.txtSingleFactorInfo}
                            placeholder="email" placeholderTextColor={colors.black}
                            onChangeText={(value) => setTextEmail(value)} />
                    </View>

                    <View style={{ height: 40 }} />

                    <View style={{ alignItems: 'center' }}>
                        {/*The Reset button.*/}
                        <TouchableOpacity style={styles.btn} onPress={() => { reset(); }}>
                            <Text style={styles.txtBtnLabel}>Reset Password</Text>
                        </TouchableOpacity>

                        <View style={{ height: 40 }} />

                        {errorRender()}

                        {resetRender()}

                        <View style={{ height: 200 }} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.black
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
    lblTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.green
    },
    lblVerifyMessage: {
        fontSize: 18,
        color: colors.white
    },
    txtBtnLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.green,
    },
    lblContinue: {
        fontSize: 25, 
        color: colors.green, 
        textDecorationLine: 'underline'
    },
    btn: {
        height: 90,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: colors.CJpurple,
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 10, },
        shadowOpacity: 0.5,
    },
    txtError: {
        fontSize: 20,
        color: colors.red
    }
});

export default ForgotPasswordScreen;
