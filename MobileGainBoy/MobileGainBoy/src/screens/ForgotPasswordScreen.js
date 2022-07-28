import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View, SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import colors from '../../assets/colors'

function ForgotPasswordScreen({ navigation }) {

    //The states to check if text input was received
    const [txtEmail, setTextEmail] = useState('');

    // The error message state
    const [txtError, setTextError] = useState('');

    // The password reset state
    const [passwordReset, setPasswordReset] = useState(false);

    const reset = async () => {
        try {
            //NEED RESET_PASSWORD_API

            //TODO: remove when API is made
            let preprocessor = true;

            if (preprocessor)
            {
                setPasswordReset(preprocessor);
            }
            else
            {
                setTextError('Error occurred');
            }
        }
        catch (e) {
            alert(e.message);
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

    // The render to continue back to login page
    const continueRender = () => {
        if (passwordReset)
            return (<View>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ fontSize: 25, color: colors.green, textDecorationLine: 'underline' }}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>);
        else
            return (<View/>);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: '15%' }} />
            
            <Text style={styles.txtTitle}>Please verify your email</Text>

            <View style={{ height: 75 }} />

            <View style={{width: 375}}>
                <Text style={styles.txtVerifyMessage}>
                    We sent an email to your inbox. Click on the link in the email to complete your signup.
                </Text>
            </View>

            <View style={{ height: 50 }} />

            {/*Verify email text*/}
            <View>
                <TextInput style={styles.txtSingleFactorInfo} 
                           placeholder="email" placeholderTextColor={colors.black}
                           onChangeText={(value) => setTextEmail(value)}/>
            </View>

            <View style={{ height: 40 }} />

            <View style={{ alignItems: 'center' }}>
                {/*The Reset button.*/}
                <TouchableOpacity style={styles.btn} onPress={() => { reset(); }}>
                    <Text style={styles.txtBtnLabel}>Reset Password</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />

                {errorRender()}

                {continueRender()}
            </View>
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
        fontSize: 25,
        backgroundColor: colors.white,
        color: colors.black
    },
    txtTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color:colors.green
    },
    txtVerifyMessage: {
        fontSize: 18,
        color:colors.white
    },
    txtBtnLabel: {
        fontSize: 15,
        color:colors.green
    },
    btn: {
        height: 120,
        width:  120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: colors.CJpurple
    },
    txtError: {
        fontSize: 20,
        color: colors.red
    }
});

export default ForgotPasswordScreen;
