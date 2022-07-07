import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, SafeAreaView, 
    Image, 
    TouchableOpacity,
    TextInput,
} from 'react-native';

function TestPage(props) {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#F2F3F5'}}>
            <View style={styles.imgContainer}>
                <Image style={styles.logo} source={require('./../assets/favicon.png')} />
            </View>

            <View style={styles.singleFactorContainer}>
                <TextInput style={styles.txtSingleFactorInfo} placeholder="username" placeholderTextColor={gameBoyPrimaryTxtClr}/>
                <View style={styles.spaceContainer}/>
                <TextInput style={styles.txtSingleFactorInfo} placeholder="password" placeholderTextColor={gameBoyPrimaryTxtClr} secureTextEntry={true}/>
                <View style={styles.spaceContainer}/>
            </View>

            <View style={{paddingLeft: 125}}>
                {/*The Start/Login button*/}
                <TouchableOpacity style={styles.btnLogin}>
                    <Text style={styles.txtBtnLogin}>Start</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imgContainer: {        
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%'
    },
    singleFactorContainer: {
        paddingTop: 10, 
        paddingLeft: 80,
    },
    spaceContainer: {
        height: 20
    },
    txtSingleFactorInfo:{
        height: 70,
        width: 250,
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
    txtBtnLogin:{
        fontSize: 25, 
        color: '#5D3FD3'
    },
    logo: {
        width:100,
        height:100,
    }
});

const gameBoyPrimaryTxtClr = "#E2E5DE";

export default TestPage;