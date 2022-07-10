import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, SafeAreaView,
    TouchableOpacity,
    TextInput,
} from 'react-native';

const gameBoyPrimaryTxtClr = "#E2E5DE";

function SignUpPage(props) {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#F2F3F5'}}>
            <View style={styles.newTitleContainer}>
                <Text>Create New Profile</Text>
            </View>

            <View style={styles.singleFactorContainer}>
                <TextInput style={styles.txtSingleFactorInfo} placeholder="username" placeholderTextColor={gameBoyPrimaryTxtClr}/>
                <View style={styles.spaceContainer}/>
                <TextInput style={styles.txtSingleFactorInfo} placeholder="email" placeholderTextColor={gameBoyPrimaryTxtClr}/>
                <View style={styles.spaceContainer}/>
                <TextInput style={styles.txtSingleFactorInfo} placeholder="password" placeholderTextColor={gameBoyPrimaryTxtClr}/>
                <View style={styles.spaceContainer}/>
                <TextInput style={styles.txtSingleFactorInfo} placeholder="confirm password" placeholderTextColor={gameBoyPrimaryTxtClr}/>
                <View style={{height: 50}}/>
            </View>

            <View style={{paddingLeft: 120}}>
                {/*The Create button.
                   The OnPress takes in the props parameter, which has a property called 'navigation' given
                   from the Stack.Screen component in App.js. Inside this 'navigation' component is a function called 
                   navigate() that takes the name of another screen, in this case 'Landing', again defined in App.js
                */}
                <TouchableOpacity style={styles.btnCreate} onPress={() => props.navigation.navigate('Landing')}>
                    <Text style={styles.txtBtn}>Create</Text>
                </TouchableOpacity>
            </View>

            <View style={{height: 30}}/>

            <View style={{paddingLeft: 120}}>
                {/*Button for going back to login page.
                   The 'Login' Stack.Screen is defined in App.js
                */}
                <TouchableOpacity style={styles.btnLogin} onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.txtBtn}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    newTitleContainer: {
        paddingTop: "30%", 
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
    txtSingleFactorInfo:{
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
    txtBtn:{
        fontSize: 25, 
        color: '#5D3FD3'
    }
});

export default SignUpPage;