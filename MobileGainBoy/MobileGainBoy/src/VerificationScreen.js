import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View, SafeAreaView,
    Image,
    TouchableOpacity
} from 'react-native';
import colors from "../assets/colors"

function VerificationScreen({ navigation }) {

    const finish = async () => {
        // Navigation is a property given from the Stack.Screen component in App.js. Inside this 'navigation' property 
        // is a function called navigate() that takes the name of another screen, in this case 'Login', again defined in App.js
        navigation.navigate('Login');
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

            <View>
                <TouchableOpacity onPress={() => {finish();}}>
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
    }
});

export default VerificationScreen;
