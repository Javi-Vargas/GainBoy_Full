import React from 'react';
import {
    StyleSheet,
    Text,
    View, SafeAreaView,
    Image,
    TouchableOpacity
} from 'react-native';

function VerificationScreen({ navigation }) {

    const resend = async () => {
        try {
            var obj = { email: global.email, password: global.password, passwordVerify: global.password };
            var js = JSON.stringify(obj);

            const response = await fetch(
                'https://gainzboy.herokuapp.com/auth/Register',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
            );

            var res = JSON.parse(await response.text());

            alert(res.errorMessage);
        }
        catch (e) {
            alert(e.message);
        }
    }

    const finish = async () => {
        try {
            var obj = { email: global.email, password: global.password, passwordVerify: global.password };
            var js = JSON.stringify(obj);

            const response = await fetch(
                'https://gainzboy.herokuapp.com/auth/Register',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
            );

            var res = JSON.parse(await response.text());

            if (res.errorMessage == "An account with this email already exists.")
            {
                // Navigation is a property given from the Stack.Screen component in App.js. Inside this 'navigation' property 
                // is a function called navigate() that takes the name of another screen, in this case 'Landing', again defined in App.js
                navigation.navigate('Landing');
            }
            else
            {
                alert(res.errorMessage)
            }
        }
        catch (e) {
            alert(e.message);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#8fcbbc' }}>
            <View style={styles.imgContainer}>
                <Image style={styles.logo} source={require('./../../assets/gameboy2.0.png')} />
            </View>

            {/*Verify email text*/}
            <View>
                <Text style={styles.txtVerifyTitle}>Please verify your email</Text>

                <View style={styles.spaceContainer} />

                <Text style={styles.txtVerifyMessage}>
                    We sent an email to your inbox. Click on the link in the email to complete your signup.
                </Text>
            </View>

            <View style={{height: 40}} />

            <View style={{paddingLeft: 100}}>
                {/*The Resend button.*/}
                <TouchableOpacity style={styles.btn} onPress={() => {resend(); }}>
                    <Text style={styles.txtBtn}>Resend Email</Text>
                </TouchableOpacity>

                <View style={{height: 40}} />

                <View style={{paddingLeft: 50}}>
                <TouchableOpacity onPress={() => {finish();}}>
                    <Text style={{fontSize: 25, color:'#5D3FD3'}}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
            </View>

            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    verifyButton: {
        paddingTop: "30%",
        paddingLeft: "30%",
        flexDirection: 'column',
        justifyContent: 'center',
        color: 'blue',
        fontSize: 40,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 50,
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '35%'
    },
    txtVerifyTitle: {
        paddingLeft: 20,
        fontSize: 35
    },
    txtVerifyMessage: {
        paddingLeft: 25,
        fontSize: 20
    },
    spaceContainer: {
        height: 20
    },
    btn: {
        height: 40,
        width: 200,
        paddingTop: 5,
        paddingLeft: 35,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#d3d3d3',
    },
    txtBtn: {
        fontSize: 20,
        color: '#5D3FD3'
    },
    logo: {
        width: 200,
        height: 200,
    }
});

export default VerificationScreen;
