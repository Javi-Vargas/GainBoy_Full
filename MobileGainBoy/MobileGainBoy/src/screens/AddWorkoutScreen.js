import React from "react";
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import colors from "../../assets/colors";

// PREPROCESSORS for Unit testing
const UNIT_ADD_WORKOUT = false;

const AddWorkoutScreen = ({ navigation }) => {
    const handleSave = async () => {
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for adding a workout
        if (UNIT_ADD_WORKOUT) {
            obj = { name: 'something', userId: '777', reps: '99', sets: '99', totalWeight: '9000', timeSpent: '99' };
        }
        // --------------------------------->
        else {
            //TODO: Fill me up correctly
            //obj = {name: , userId: global.userId, reps: , sets: , totalWeight: , timeSpent: };
        }

        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/createWorkout',
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
        );

        var res = JSON.parse(await response.text());

        if (res.status != undefined) {
            alert('Error occurred adding workout');
        }
        else {
            // Navigation is a property given from the Stack.Screen component in App.js. Inside this 'navigation' property 
            // is a function called navigate() that takes the name of another screen, in this case 'Landing', again defined in App.js
            navigation.navigate('Landing');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ padding: 20, }}>
                <View style={{ padding: 20 }}>
                    <Text style={{ color: colors.green, fontWeight: 'bold', fontSize: 25 }}>Workout Info</Text>
                </View>
                <View style={{ flexDirection: 'column', borderColor: 'black', borderWidth: 1, borderRadius: 8 }}>
                    <TextInput style={styles.nameBox} placeholder="Workout Name:" />
                    <TextInput style={styles.descriptionBox} placeholder="Description/Notes:" />
                </View>
                <View style={{ paddingTop: 45 }}>
                    <Text style={{ color: colors.green, fontSize: 20 }}>Exercises: </Text>
                    <TouchableOpacity style={styles.addExercise}>
                        <Ionicons name="add-circle-outline" color={colors.green} size={30} />
                        <Text style={{ paddingTop: 8, paddingLeft: 8, color: colors.green, fontWeight: 'bold' }}>Add Exercises</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={() => handleSave()}>
                    <Text style={styles.saveBtn}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AddWorkoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    addExercise: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    descriptionBox: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 50,
        borderTopColor: 'black',
        backgroundColor: colors.white,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    nameBox: {
        paddingTop: 10,
        paddingLeft: 10,
        backgroundColor: colors.white,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    editBtn: {
        left: 10,
        top: 10,
    },
    plusBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    saveBtn: {
        fontSize: 30,
        color: colors.green,
    }
})
