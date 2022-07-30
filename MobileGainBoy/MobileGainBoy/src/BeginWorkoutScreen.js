import React, { useState, useEffect, Component, Alert } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import colors from "../assets/colors";

// PREPROCESSORS for Unit testing
const UNIT_DISPLAY_WORKOUTS = false;

let beginWorkoutCards = new Array();
let indexOfCardEdit = -1;

const BeginWorkoutScreen = ({ navigation }) => {
    // The error message state
    const [txtError, setTextError] = useState('');

    // Force render updates
    const [renderUpdate, setRenderUpdate] = useState(false);

    const displayWorkouts = async () => {
        global.exerciseHistory
        for (let i = 0; i < global.exerciseHistory.length; i++) {
            console.log(global.exerciseHistory[i].name)
            //console.log(global.exerciseHistory.pop())
        }
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for displaying workouts
        if (UNIT_DISPLAY_WORKOUTS) {
            obj = { token: global.token, userId: '777' };
        }
        // --------------------------------->
        else {
            obj = { token: global.token, userId: global.userId };
        }

        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/displayWorkouts',
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
        );

        let res = JSON.parse(await response.text());

        if (res.status != undefined) {
            setTextError('Could not display your workouts');
        }
        else {
            global.exerciseHistory = res.results;

            if (txtError != '') setTextError('');

            // Toggle render update to force a render
            setRenderUpdate(!renderUpdate);
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

    {/**Renders Received Cards */ }
    const receiveExercise = () => {
        let isFocused = useIsFocused();
        if (isFocused && global.exerciseHistory.length != 0) {
            // Since we're getting the workouts again, reset
            beginWorkoutCards = [];

            for (let i = 0; i < global.exerciseHistory.length; i++) {
                beginWorkoutCards.push({
                    name: global.exerciseHistory[i].name,
                    reps: global.exerciseHistory[i].reps.toString(),
                    sets: global.exerciseHistory[i].sets.toString(),
                    totalWeight: global.exerciseHistory[i].totalWeight.toString(),
                    timeSpent: global.exerciseHistory[i].timeSpent.toString(),
                    isEditing: i == indexOfCardEdit
                });
            }

            return (
                <View style={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
                    {beginWorkoutCards.map(item => item.isEditing ?
                        <CardEdit key={item.name} data={item} renderState={[renderUpdate, setRenderUpdate]} /> :
                        <Card key={item.name} data={item} renderState={[renderUpdate, setRenderUpdate]} />)}
                </View>
            );
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => { displayWorkouts() }} style={styles.beginBtn}>
                    <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 20 }}>Begin FreeStyle Workout</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {errorRender()}
                {/* {cardsRender()} */}
                {receiveExercise()}
            </ScrollView>
            <ScrollView style={{ paddingTop: 20, paddingHorizontal: 10 }} />
        </SafeAreaView>
    )
}

const Card = ({ data, renderState }) => {
    const deleteWorkout = async (workoutName) => {
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for deleting a workout
        if (UNIT_DELETE_WORKOUT) {
            obj = { token: global.token, _id: global.exerciseMap.get('something') };
        }
        // --------------------------------->
        else {
            obj = { token: global.token, _id: global.exerciseMap.get(workoutName) };
        }

        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/deleteWorkout',
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
        );

        var res = JSON.parse(await response.text());

        if (res.message == undefined) {
            setTextError('Could not delete that workout');
        }
        else {
            //Changed so it doesnt delete from exerciseMap. Only removes from exerciseHistory[]
            let index = global.exerciseHistory.findIndex(obj => obj.name === workoutName);
            global.exerciseHistory.splice(index, 1);

            // Toggle render update to force a render
            renderState[1](!renderState[0]);
        }
    }

    const trash = (workoutName) => {
        Alert.alert("Delete Workout", "Are you sure you want to delete this workout?", [
            { text: "Yes", onPress: () => { deleteWorkout(workoutName); } },
            { text: "No", onPress: () => { return; } }
        ])
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardDataContainer}>
                <Text style={styles.lblData}> Workout: {data.name} </Text>
                <View style={{ height: 10 }} />
                <Text style={styles.lblData}> Reps: {data.reps}    </Text>
                <View style={{ height: 10 }} />
                <Text style={styles.lblData}> Sets: {data.sets}    </Text>
                <View style={{ height: 10 }} />
                <Text style={styles.lblData}> Total Weight (lb): {data.totalWeight}</Text>
                <View style={{ height: 10 }} />
                <Text style={styles.lblData}> Time Spent: {data.timeSpent} </Text>
                <View style={{ height: 10 }} />
            </View>

            {/*Edit and Delete icons*/}
            <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={() => { editCard(data.name); }}>
                    <Feather name='edit' size={25} color={colors.CJpurple} style={{ marginRight: 5 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { trash(data.name); }}>
                    <Ionicons name="trash-outline" color={colors.red} size={25} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { trash(data.name); }}>
                    <Ionicons name="arrow-redo-circle-outline" color={colors.blue} size={25} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BeginWorkoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 15,
    },
    cardContainer: {
        width: '80%',
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: { width: -5, height: 10, },
        shadowOpacity: 0.5,
        flex: 1,
        padding: 25,
        paddingBottom: -20,
        backgroundColor: colors.white,
        margin: 20,
        borderRadius: 10
    },
    beginBtn: {
        flexDirection: 'row', marginBottom: 80, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: 20, backgroundColor: colors.CJpurple, borderRadius: 10, top: "10%", shadowColor: 'black', shadowRadius: 3, shadowOffset: { width: -5, height: 7, }, shadowOpacity: 0.5,
    },
    scrollView: {
        borderColor: colors.green,
        borderWidth: 3,
        margin: 10,
        marginTop: 30,
        borderRadius: 10,
    },
    addExercise: {
        flexDirection: 'row',
    },
    txtSingleFactorInfo: {
        height: 30,
        width: 150,
        justifyContent: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 8,
        borderWidth: 2,
        borderColor: 'black',
        fontSize: 15,
        backgroundColor: colors.white,
        color: colors.black,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset: { width: 3, height: 2, },
        shadowOpacity: 0.5,
    },
    btn: {
        alignSelf: 'center',
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 20,
    },
})
