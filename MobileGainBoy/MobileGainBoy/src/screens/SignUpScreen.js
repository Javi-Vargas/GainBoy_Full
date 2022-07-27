import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View, SafeAreaView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import colors from '../../assets/colors'

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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black, alignItems: 'center' }}>
            <View style={styles.newTitleContainer}>
                <Text style={{fontSize: 25, color: colors.green}}>Create New Profile</Text>
            </View>

            <View style={{ height: 50 }} />

            {/*Text Entries.*/}
            <View style={{alignItems: 'center'}}>
                <TextInput style={styles.txtSingleFactorInfo}
                           placeholder="full name" placeholderTextColor={colors.black}
                           onChangeText={(value) => setTextFullName(value)}/>

                <View style={styles.spaceContainer}/>

                <TextInput style={styles.txtSingleFactorInfo} 
                           placeholder= "email" placeholderTextColor={colors.black}
                           onChangeText={(value) => setTextEmail(value)}/>

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtSingleFactorInfo}
                           placeholder="password" placeholderTextColor={colors.black}
                           onChangeText={(value) => setTextPassword(value)}/>

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtSingleFactorInfo}
                           placeholder="confirm password" placeholderTextColor={colors.black}
                           onChangeText={(value) => setTextConfirmPassword(value)}/>

                <View style={{ height: 25 }} />
            </View>

            {errorRender()}

            <View style={{ height: 45 }} />

            <View style={{paddingLeft: '25%'}}>
                <View style={styles.indentContainer}>

                    {/*Back Button.*/}
                    <TouchableOpacity style={styles.btn} onPress={() => navigateTo('Login')}>
                        <Text style={styles.txtBtnLabel}>Back</Text>
                    </TouchableOpacity>

                    <View style={{ width: 50 }} />
                    
                    {/*Create Button.*/}
                    <TouchableOpacity style={styles.btn} onPress={() => { register(); }}>
                        <Text style={styles.txtBtnLabel}>Create</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    newTitleContainer: {
        paddingTop: '10%',
        alignItems: 'center'
    },
    spaceContainer: {
        height: 40
    },
    indentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 275,
        backgroundColor: colors.blackLite,
        borderRadius: 100,
        transform: [{rotate: "-10deg"}],
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
    btn: {
        height: 85,
        width:  85,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: colors.CJpurple
    },
    txtBtnLabel: {
        fontSize: 22,
        color:colors.green
    },
    txtError: {
        fontSize: 20,
        color: colors.red
    }
});

export default SignUpScreen;