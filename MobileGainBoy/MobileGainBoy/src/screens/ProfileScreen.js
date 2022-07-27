import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View, SafeAreaView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import colors from '../../assets/colors'

function ProfileScreen({ navigation }) {

    //The states to check if text input was received
    const [txtUserName, setTextUserName] = useState('');
    const [txtEmail, setTextEmail] = useState('');
    const [txtPassword, setTextPassword] = useState('');
    const [txtConfirmPassword, setTextConfirmPassword] = useState('');

    const checkTextInput = () => {
        if (txtUserName === '') {
            alert('Enter username');
            return;
        }

        if (txtEmail === '') {
            alert('Enter email');
            return;
        }

        if (txtPassword === '') {
            alert('Enter password');
            return;
        }

        if (txtConfirmPassword === '') {
            alert('Confirm password');
            return;
        }

        // Navigation is a property given from the Stack.Screen component in App.js. Inside this 'navigation' property 
        // is a function called navigate() that takes the name of another screen, in this case 'Landing', again defined in App.js
        navigation.navigate('Landing');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
            <View style={styles.newTitleContainer}>
                <Text style={styles.bigHeader}>Update Your Personal Info</Text>
            </View>

            <View style={styles.singleFactorContainer}>
                <TextInput style={styles.txtSingleFactorInfo}
                    placeholder="Username" placeholderTextColor={'grey'}
                    onChangeText={(value) => setTextUserName(value)} />

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtSingleFactorInfo}
                    placeholder="Email" placeholderTextColor={'grey'}
                    onChangeText={(value) => setTextEmail(value)} />

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtSingleFactorInfo}
                    placeholder="New Password" placeholderTextColor={'grey'}
                    onChangeText={(value) => setTextPassword(value)} />

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtSingleFactorInfo}
                    placeholder="Confirm New Password" placeholderTextColor={'grey'}
                    onChangeText={(value) => setTextConfirmPassword(value)} />

                <View style={{ height: 50 }} />
            </View>

            <View>
                {/*The Save changes button.*/}
                <View style={{ left: 320 }}>
                    <Text style={styles.txtBtn}>Save</Text>
                    <TouchableOpacity style={styles.btnSave} onPress={() => { checkTextInput(); }}>
                    </TouchableOpacity>
                </View>
                <View style={{ left: 270 }}>
                    <Text style={styles.txtBtn}>Cancel</Text>
                    <TouchableOpacity style={styles.btnSave} onPress={() => { checkTextInput(); }}>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 30 }} />
            </View>


            <View style={{ paddingLeft: 120 }}>
                {/*Button for going back to login page.
                   The 'Login' Stack.Screen is defined in App.js
                */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bigHeader: {
        fontWeight: "bold",
        fontSize: 20,
        top: 10,
        color: colors.green
    },
    bottomButtons: {
        paddingLeft: 120,
        flexDirection: 'column',
        justifyContent: 'space-evenly'

    },
    newTitleContainer: {
        paddingTop: "10%",
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
    txtSingleFactorInfo: {
        height: 55,
        width: 275,
        paddingLeft: 25,
        paddingBottom: 8,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 50,
        fontSize: 25,
        backgroundColor: colors.white,
        color: '#E2E5DE',
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 5, },
        shadowOpacity: 0.5,
    },
    btnSave: {
        flexDirection: 'row',
        height: 40,
        width: 40,
        paddingTop: 3,
        paddingLeft: 40,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#A482FF',
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset: { width: -3, height: 3, },
        shadowOpacity: 0.5,
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
    txtBtn: {
        fontSize: 25,
        color: colors.green
    }
});

export default ProfileScreen;
