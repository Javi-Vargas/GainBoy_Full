import React from "react";
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

// PREPROCESSORS for Unit testing
const UNIT_EDIT_WORKOUT     = false;
const UNIT_DISPLAY_WORKOUTS = false;
const UNIT_DELETE_WORKOUT   = false;

const WorkoutScreen = ({ navigation }) => {
    
    const logout = () => {
        global.userId   = "";
        global.token    = "";
        global.email    = "";
        global.password = "";
        global.fullName = "";
        global.exerciseMap.clear();
        navigation.navigate('Login');
    }

    const updateWorkout = async () => {
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for updating a workout
        if (UNIT_EDIT_WORKOUT)
        {
            obj = {_id: global.exerciseMap.get('something'), token: global.token, 
                   name: 'somethingTheSequel', userId: '777', reps: '99', sets: '99', 
                   totalWeight: '9000', timeSpent: '99'};
        }
        // --------------------------------->
        else
        {
            //TODO: Need to first check the workout name is a key in the map, then fill accordingly
            //obj = {_id: , token: global.token, name: , userId: global.userId, reps: , sets: , totalWeight: , timeSpent: };
        }
        
        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/updateWorkout',
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}
        );

        var res = JSON.parse(await response.text());
        
        if(res.message == undefined)
        {
            alert('Error occurred updating workout');
        }
        else
        {
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
        if (UNIT_DISPLAY_WORKOUTS)
        {
            obj = {token: global.token, userId: '777'};
        }
        // --------------------------------->
        else
        {
            obj = {token: global.token, userId: global.userId};
        }
        
        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/displayWorkouts',
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}
        );

        var res = JSON.parse(await response.text());
        
        if(res.status != undefined)
        {
            alert('Could not display your workouts');
        }
        else
        {
            for (let i = 0; i < res.results.length; i++)
            {
                alert(res.results[i].name);
            }
        }
    }

    const deleteWorkout = async () => {
        var obj;

        // <----------UNIT TESTING----------> 
        //  Automated test for deleting a workout
        if (UNIT_DELETE_WORKOUT)
        {
            obj = {token: global.token, _id: global.exerciseMap.get('something')};
        }
        // --------------------------------->
        else
        {
            //TODO: Need to first check the workout name is a key in the map, then fill accordingly
            //obj = {token: global.token, _id: };
        }
        
        var js = JSON.stringify(obj);

        const response = await fetch(
            'https://gainzboy.herokuapp.com/auth/deleteWorkout',
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}}
        );

        var res = JSON.parse(await response.text());
        
        if(res.message == undefined)
        {
            alert('Could not delete that workout');
        }
        else
        {
            alert(res.message);
            navigation.navigate('Landing');
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingTop: 20, paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu-outline" color="blue" size={30} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Hi FName</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40, paddingBottom: 20 }}>
                    <Button title="Edit" onPress={() => {updateWorkout();}} />
                    <TouchableOpacity onPress={() => navigation.navigate('AddWorkout')}>
                        <Ionicons name="add-outline" color="blue" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', borderColor: 'black', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 }}>
                    <Feather name='search' size={20} color="black" style={{ marginRight: 5 }} />
                    <TextInput placeholder="Search Saved Workouts" />
                </View>
                <View >
                    <Text style={{ paddingTop: 60, borderRadius: 20 }}>I wanna make this a list with the users saved Workouts</Text>
                </View>

                {/*TEMPORARY, delete me or redo me*/}
                <View>
                    <View style={{height: 40}}/>

                    <TouchableOpacity onPress={() => {displayWorkouts();}}>
                        <Text>Tell me your displaying without showing me it (Click me when unit testing!)</Text>
                    </TouchableOpacity>

                    <View style={{height: 40}}/>

                    <TouchableOpacity onPress={() => {deleteWorkout();}}>
                        <Text>Delete something behind your back (Click me when unit testing!)</Text>
                    </TouchableOpacity>

                    <View style={{height: 40}}/>

                    <Button title="Logout" onPress={() => {logout();}} />
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default WorkoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8fcbbc",
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
