import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, SafeAreaView,
    TouchableOpacity,
    TextInput,
} from 'react-native';

function ForgotPasswordScreen({ navigation }) {
    
    //The states to check if text input was received
    const [txtEmail, setTextEmail]    = useState('');

    const request = async () => {
        try {
            // Since we don't currently have a forgot password api, using this to act
            // as a conditional preprocessor of sorts
            let preprocessor = true;

            if (preprocessor)
            {
                navigation.navigate('Login');
            }
            else
            {
                // NOTE: No idea if this branch would work at all, just a template for
                // when we have the needed api
                var obj = {email:txtEmail.trim()};
                var js = JSON.stringify(obj);

                // !!! Change api to correct one for forgot password !!!
                const response = await fetch(
                    'https://gainzboy.herokuapp.com/auth/login',
                    {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}
                );

                var res = JSON.parse(await response.text());
                
                if(res.errorMessage != undefined)
                {
                    alert(res.errorMessage);
                }
                else
                {
                    navigation.navigate('Login');
                }
            }
        }
        catch(e) 
        {
            alert(e.message);
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text>Please enter your account email to reset your password: </Text>

            <View style={{ height: 30 }} />

            <View>
                <TextInput style={styles.txtSingleFactorInfo} 
                           placeholder="email" placeholderTextColor={global.gameBoyPrimaryTxtClr}
                           onChangeText={(value) => setTextEmail(value)}/>

                <View style={{ height: 30 }} />

                <TouchableOpacity style={styles.btnRequest} onPress={() => { request(); }}>
                    <Text style={styles.txtBtnRequest}>Request Password Reset</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
    txtSingleFactorInfo: {
        height: 70,
        width: 300,
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
    btnRequest: {
        height: 40,
        width: 300,
        paddingTop: 5,
        paddingLeft: 40,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#d3d3d3',
    },
    txtBtnRequest: {
        fontSize: 20,
        color: '#5D3FD3'
    }
})

export default ForgotPasswordScreen;