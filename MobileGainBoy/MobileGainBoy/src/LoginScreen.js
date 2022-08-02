import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View, SafeAreaView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import colors from '../assets/colors'

// PREPROCESSORS for Unit testing
const UNIT_VALID_LOGIN = false;
const UNIT_INVALID_LOGIN = false;
const UNIT_NOT_VERIFIED = false;

function LoginScreen({ navigation }) {

    //The states to check if text input was received
    const [txtEmail, setTextEmail] = useState('');
    const [txtPassword, setTextPassword] = useState('');

    // The error message state
    const [txtError, setTextError] = useState('');

    // Use this to navigate to pages so that the error message always clears
    const navigateTo = (screen) => {
        setTextError('');

        // navigation is a property given from the Stack.Screen component in App.js. Inside this 'navigation' property 
        // is a function called navigate() that takes the name of another screen
        navigation.navigate(screen);
    }

    const login = async () => {
        try {

            var obj;

            // <----------UNIT TESTING----------> 
            //  Automated test for logging in with existing user
            if (UNIT_VALID_LOGIN) {
                obj = { email: 'christopher.beltran.cop4331@gmail.com', password: 'COP4331' };
            }
            // Automated test for wrong email/password combination
            else if (UNIT_INVALID_LOGIN) {
                obj = { email: 'no_way_this_would_ever_be_valid@cop4331.com', password: 'SUPER_STRONG_PASSWORD' };
            }
            // Automated test for unverified users
            else if (UNIT_NOT_VERIFIED) {
                obj = { email: 'do_not_verify_cop4331@gmail.com', password: 'COP4331' };
            }
            // --------------------------------->
            else {
                obj = { email: txtEmail.trim(), password: txtPassword.trim() };
            }

            var js = JSON.stringify(obj);

            const response = await fetch(
                'https://gainzboy.herokuapp.com/auth/login',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
            );

            var res = JSON.parse(await response.text());

            if (res.errorMessage != undefined) {
                setTextError(res.errorMessage);
            }
            else {
                global.userId = res.userID;
                global.token = res.token;
                global.fullName = res.fullname;
                global.email = txtEmail.trim();
                global.password = txtPassword.trim();

                setTextError('');

                // The 'Landing' screen is defined in App.js
                navigateTo('Landing');
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', top: '20%' }}>
                <View style={styles.LogoContainer}>
                    <Text style={styles.GAINZ}>
                        GAINZ
                    </Text>
                    <Text style={styles.BOY}>
                        BOY
                    </Text>
                </View>
            </View>

            <View style={{ height: '25%' }} />

            {/*Text Entries.*/}
            <View style={{ alignItems: 'center' }}>
                <TextInput style={styles.txtSingleFactorInfo}
                    placeholder="email" placeholderTextColor={colors.black}
                    onChangeText={(value) => setTextEmail(value)} />

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtSingleFactorInfo}
                    placeholder="password" placeholderTextColor={colors.black} secureTextEntry={true}
                    onChangeText={(value) => setTextPassword(value)} />

                <View style={{ height: 35 }} />
            </View>

            <View style={{ alignItems: 'center' }}>
                {/*Forgot Password Button.
                   The 'Forgot Password' Stack.Screen is defined in App.js
                */}
                <TouchableOpacity onPress={() => navigateTo('Forgot Password')}>
                    <Text style={styles.txtForgotPassword}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>
            </View>

            {errorRender()}

            <View style={{ height: 70 }} />

            <View style={{ paddingLeft: '50%', paddingTop: '10%' }}>
                <View style={styles.indentContainer}>

                    {/*Sign Up Button.*/}
                    <TouchableOpacity style={styles.btn} onPress={() => navigateTo('Sign Up')}>
                        <Text style={styles.txtSignUp}>New User</Text>
                    </TouchableOpacity>

                    <View style={{ width: 50 }} />

                    {/*Login Button.*/}
                    <TouchableOpacity style={styles.btn} onPress={() => { login(); }}>
                        <Text style={styles.txtLogin}>Start</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    spaceContainer: {
        height: 50
    },
    indentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 90,
        width: 220,
        backgroundColor: colors.blackLite,
        borderRadius: 100,
        transform: [{ rotate: "-50deg" }],
    },
    LogoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 220,
        backgroundColor: colors.blackLite,
        borderRadius: 100,
    },
    txtSingleFactorInfo: {
        height: 65,
        width: 300,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 8,
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
    btn: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: colors.CJpurple,
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 5, },
        shadowOpacity: 0.5,
    },
    txtForgotPassword: {
        fontSize: 20,
        color: colors.green
    },
    txtLogin: {
        fontSize: 25,
        color: colors.green,
        transform: [{ rotate: "50deg" }],
    },
    txtSignUp: {
        fontSize: 18,
        color: colors.green,
        transform: [{ rotate: "50deg" }],
    },
    txtError: {
        fontSize: 20,
        color: colors.red
    },
    GAINZ: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    BOY: {
        fontSize: 30,
    }
});

export default LoginScreen;
