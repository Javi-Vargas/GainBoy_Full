import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import colors from "../assets/colors";

// PREPROCESSORS for Unit testing
const UNIT_ADD_WORKOUT = false;

const AddWorkoutScreen = ({ navigation }) => {

    //The states to check if text input was received
    const [exerciseName, setExerciseName] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [totalWeight, setTotalWeight] = useState('');
    const [timeSpent, setTimeSpent] = useState('');

    // The error message state
    const [txtError, setTextError] = useState('');

    const handleSave = async () => {
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for adding a workout
        if (UNIT_ADD_WORKOUT) {
            obj = {
                token: global.token, name: 'something',
                userId: '777', reps: '99', sets: '99',
                totalWeight: '9000', timeSpent: '99'
            };
        }
        // --------------------------------->
        else {
            obj = {
                token: global.token, name: exerciseName,
                userId: global.userId, reps: reps, sets: sets,
                totalWeight: totalWeight, timeSpent: timeSpent
            };
        }

        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/createWorkout',
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
        );

        var res = JSON.parse(await response.text());

        if (res.status != undefined) {
            setTextError('Error occurred adding workout');
        }
        else {
            // Have to add new entry to global exercises so that 'Landing' can render newly added exercise
            global.exercises.push({
                name: res.name,
                reps: res.reps,
                sets: res.sets,
                totalWeight: res.totalWeight,
                timeSpent: res.timeSpent,
                userId: res.userId,
                _id: res._id
            })

            // Navigation is a property given from the Stack.Screen component in App.js. Inside this 'navigation' property 
            // is a function called navigate() that takes the name of another screen, in this case 'Landing', again defined in App.js
            navigation.navigate('Landing');
        }
    }

    // The render of the error message if there was one
    const errorRender = () => {
        if (txtError != '')
            return (<View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.lblError}>{txtError}</Text>
            </View>);
        else
            return (<View />);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingTop: '10%', left: '10%' }}>
                <Text style={styles.lblTitle}>New Exercise Info</Text>
            </View>

            <View style={styles.txtBoxContainer}>
                <TextInput style={styles.txtBox}
                    placeholder="Exercise Name:" placeholderTextColor={colors.black}
                    onChangeText={(value) => setExerciseName(value)} />

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtBox}
                    placeholder="Repetitions:" placeholderTextColor={colors.black}
                    onChangeText={(value) => setReps(value)} />

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtBox}
                    placeholder="Sets:" placeholderTextColor={colors.black}
                    onChangeText={(value) => setSets(value)} />

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtBox}
                    placeholder="Total Weight (in lbs):" placeholderTextColor={colors.black}
                    onChangeText={(value) => setTotalWeight(value)} />

                <View style={styles.spaceContainer} />

                <TextInput style={styles.txtBox}
                    placeholder="Time spent:" placeholderTextColor={colors.black}
                    onChangeText={(value) => setTimeSpent(value)} />
            </View>

            <View style={{ height: 15 }} />

            {errorRender()}

            <View style={{ height: 50 }} />

            <View style={{ paddingLeft: '50%' }}>
                <View style={styles.indentContainer}>

                    {/*Cancel Button.*/}
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Landing')}>
                        <Text style={styles.lblBtn}>Cancel</Text>
                    </TouchableOpacity>

                    <View style={{ width: 50 }} />

                    {/*Save Button.*/}
                    <TouchableOpacity style={styles.btn} onPress={() => { handleSave(); }}>
                        <Text style={styles.lblBtn}>Save</Text>
                    </TouchableOpacity>

                </View>
            </View>


            {/* <View style={{ paddingTop: 45 }}>
                <Text style={{ color: colors.green, fontSize: 20 }}>Exercises: </Text>
                <TouchableOpacity style={styles.addExercise}>
                    <Ionicons name="add-circle-outline" color={colors.green} size={30} />
                    <Text style={{ paddingTop: 8, paddingLeft: 8, color: colors.green, fontWeight: 'bold' }}>Add Exercises</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={() => handleSave()}>
                    <Text style={styles.saveBtn}>Save</Text>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}

export default AddWorkoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: '5%',
        backgroundColor: colors.black,
    },
    spaceContainer: {
        height: 50
    },
    txtBoxContainer: {
        paddingTop: '5%',
        flexDirection: 'column',
        borderRadius: 8,
        alignItems: 'center'
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
    txtBox: {
        height: 55,
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
    lblTitle: {
        fontWeight: 'bold',
        fontSize: 25,
        color: colors.green
    },
    lblBtn: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.green,
        transform: [{ rotate: "50deg" }],
    },
    lblError: {
        fontSize: 20,
        color: colors.red
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
