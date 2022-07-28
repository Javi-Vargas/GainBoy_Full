import React from "react";
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../../assets/colors'

// PREPROCESSORS for Unit testing
const UNIT_EDIT_WORKOUT = false;
const UNIT_DISPLAY_WORKOUTS = false;
const UNIT_DELETE_WORKOUT = false;

const WorkoutScreen = ({ navigation }) => {

    const logout = () => {
        global.email = "";
        global.password = "";
        global.userId = "";
        global.token = "";
        navigation.navigate('Login');
    }

    const editWorkout = async () => {
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for updating a workout
        if (UNIT_EDIT_WORKOUT) {
            obj = { name: 'somethingTheSequelAgain', userId: '777', reps: '99', sets: '99', totalWeight: '9000', timeSpent: '99' };
        }
        // --------------------------------->
        else {
            obj = { name: 'something', userId: global.userId, reps: '99', sets: '99', totalWeight: '9000', timeSpent: '99' };
        }

        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/updateWorkout',
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
        );

        var res = JSON.parse(await response.text());

        if (res.message == undefined) {
            alert('Error occurred updating workout');
        }
        else {
            alert(res.message);
            // Navigation is a property given from the Stack.Screen component in App.js. Inside this 'navigation' property 
            // is a function called navigate() that takes the name of another screen, in this case 'Landing', again defined in App.js
            navigation.navigate('Landing');
        }
    }

    const displayWorkouts = async () => {
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for displaying workouts
        if (UNIT_DISPLAY_WORKOUTS) {
            obj = { userId: '777' };
        }
        // --------------------------------->
        else {
            obj = { userId: global.userId };
        }

        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/displayWorkouts',
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
        );

        var res = JSON.parse(await response.text());

        if (res.status != undefined) {
            alert('Could not display your workouts');
        }
        else {
            for (let i = 0; i < res.results.length; i++) {
                alert(res.results[i].name);
            }
        }
    }

    const deleteWorkout = async () => {
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for deleting a workout
        if (UNIT_DELETE_WORKOUT) {
            obj = { name: 'something', userId: '777', reps: '99', sets: '99', totalWeight: '9000', timeSpent: '99' };
        }
        // --------------------------------->
        else {
            obj = { name: 'something', userId: global.userId, reps: '99', sets: '99', totalWeight: '9000', timeSpent: '99' };
        }

        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/deleteWorkout',
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }
        );

        var res = JSON.parse(await response.text());

        if (res.message == undefined) {
            alert('Could not delete that workout');
        }
        else {
            alert(res.message);
            navigation.navigate('Landing');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.CJpurple }}>Hi User</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40, paddingBottom: 20 }}>
                {/* <Button title="Edit" onPress={() => { editWorkout(); }} /> */}
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('AddWorkout')}>
                    <Ionicons name="add-outline" color={colors.green} size={30} />
                    <Text style={{ color: colors.green, paddingTop: 8 }}>Add Workout</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', borderColor: 'black', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: colors.white, margin: 10 }}>
                <Feather name='search' size={20} color="black" style={{ marginRight: 5 }} />
                <TextInput placeholder="Search Saved Workouts" />
            </View>
            <ScrollView>
                <View>
                    {/* <View style={{ height: 40 }} /> */}

                    <TouchableOpacity onPress={() => { displayWorkouts(); }}>
                        <Text style={{ color: colors.white }}>Tell me your displaying without showing me it (Click me when unit testing!)</Text>
                    </TouchableOpacity>

                    <View style={{ height: 40 }} />

                    <TouchableOpacity onPress={() => { deleteWorkout(); }}>
                        <Text style={{ color: colors.white }}>Delete something behind your back (Click me when unit testing!)</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'space-evenly' }}>
                    {data.map(item => (
                        <Card key={item.name} data={item} />
                    ))}
                </View>
                {/*TEMPORARY, delete me or redo me*/}
            </ScrollView>
            <ScrollView style={{ paddingTop: 20, paddingHorizontal: 10 }}>
            </ScrollView>
        </SafeAreaView >
    )
}

export default WorkoutScreen;


//Data and Card are used to display the workouts/exercises and all its data. All hardcoded data as of right now however. 
//I tried but I couldn't get the displayed info in the card to be align to the middle like in the prototype. 
const data = [
    { name: 'Arms', reps: 20, sets: 3, totalWeight: 500, timeSpent: 30, lightColor: colors.white },
    { name: 'Delts', reps: 5, sets: 5, totalWeight: 1500, timeSpent: 60, lightColor: colors.white },
    { name: 'Legs', reps: 10, sets: 4, totalWeight: 2000, timeSpent: 120, lightColor: colors.white },
];

const Card = ({ data }) => {
    return (
        <View style={{ shadowColor: 'black', shadowRadius: 2, shadowOffset: { width: -5, height: 10, }, shadowOpacity: 0.5, flex: 1, padding: 25, paddingBottom: -20, backgroundColor: data.lightColor, margin: 20, borderRadius: 10 }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text>Workout: {data.name} </Text>
                <Text>Reps: {data.reps}</Text>
                <Text>Sets: {data.sets} </Text>
                <Text>Total Weight: {data.totalWeight}</Text>
                <Text>Time Spent: {data.timeSpent}</Text>
            </View>
            <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Feather name='edit' size={25} color={colors.CJpurple} style={{ marginRight: 5 }} />
                <Ionicons name="trash-outline" color={colors.red} size={25} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    addWorkout: {
        flexDirection: 'row',
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
    WO_list: {
        borderColor: 'black',

    }
})
