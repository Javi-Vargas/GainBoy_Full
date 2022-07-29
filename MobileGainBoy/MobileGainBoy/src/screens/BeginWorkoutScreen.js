import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity, TextInput } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/colors'

let pressCount = 0;

const BeginWorkoutScreen = ({ navigation }) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [workoutBegin, setWorkoutBegin] = useState(false);

    var timer;
    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds + 1);

            if (seconds === 59) {
                setMinutes(minutes + 1);
                setSeconds(0);
            }

            if (minutes === 59) {
                setHours(hours + 1);
                setMinutes(0);
            }
        }, 1000)

        return () => clearInterval(timer);
    });
    
    const beginWorkoutRender = () => {
        if (workoutBegin) {
            return (<View style={styles.beginWorkoutContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 20, paddingHorizontal: 10 }}>
                            <TouchableOpacity style={styles.btnCancel} onPress={() => setWorkoutBegin(false)}>
                                <Text style={styles.lblBtn}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnSave} onPress={() => { navigation.navigate('Begin') }} >
                                <Text style={styles.lblBtn}>Save</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.timerContainer}>
                            <Text style={styles.lblTimer}>Timer: </Text>
                            <Text style={styles.lblTimer}>
                                {minutes < 10 ? '0' + minutes : minutes} : {seconds < 10 ? '0' + seconds : seconds}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity style={styles.addExercise}>
                                <Ionicons name="add-circle-outline" color={colors.green} size={30} />
                                <Text style={styles.lblAddExercise}>Add Exercises</Text>
                            </TouchableOpacity>

                            {/**This view displays the TextInput boxes and will take exercise info from user */}
                            {/**These are meant to display onPress of the 'add Exercise' button, and be removed after info is input. 
                             * Waiting for button to be pressed again */}
                            <View style={{ alignItems: 'center' }}>
                                <TextInput style={styles.txtExcerciseInfo} placeholder="Name: " placeholderTextColor={colors.black} />
                                <TextInput style={styles.txtExcerciseInfo} placeholder="Reps: " placeholderTextColor={colors.black} />
                                <TextInput style={styles.txtExcerciseInfo} placeholder="Weight/Rep: " placeholderTextColor={colors.black} />
                            </View>
                        </View>
                    </View>);
        }
        else {
            return (<View />);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/*This first view is for the big button to start working out */}
            <View style={styles.beginBtnContainer}>
                <TouchableOpacity style={styles.btnBeginWorkout} onPress={() => setWorkoutBegin(true)}>
                    <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 20 }}>
                        Begin FreeStyle Workout
                    </Text>
                </TouchableOpacity>
            </View>

            {/*This one starts the timer and displays the cancel or save workout buttons. As well as display the 'add Excersices' button */}
            {/*The Idea is that this view doesn't render until the Big button is pressed */}
            {beginWorkoutRender()}

            {/**This scroll view will hold the list of exercises. Meant to render once the even the first exercise is added.
             * Can be as short or long as user controls
              */}
            <ScrollView style={styles.scrollView}>
                <Text style={{ color: colors.white }}>
                    Just to show that this is a scroll view that will hold the list of exercise done in current workout
                </Text>
            </ScrollView>
        </SafeAreaView>
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
    beginWorkoutContainer: {
        backgroundColor: colors.blackLite, 
        borderRadius: 15
    },
    beginBtnContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center',
        marginBottom: 80,
        paddingTop: 20, 
        paddingBottom: 20, 
        backgroundColor: colors.CJpurple, 
        borderRadius: 10,
        top: "10%",
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { width: -5, height: 7, },
        shadowOpacity: 0.5,
    },
    timerContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignContent: 'flex-start' 
    },
    scrollView: {
        borderColor: colors.green,
        borderWidth: 3,
        margin: 10,
        marginTop: 30,
        borderRadius: 10
    },
    addExercise: {
        flexDirection: 'row',
    },
    lblAddExercise: { 
        paddingTop: 8, 
        paddingLeft: 8, 
        color: colors.green, 
        fontWeight: 'bold'
    },
    lblTimer: {
        padding: 20, 
        fontSize: 30, 
        fontWeight: 'bold', 
        color: colors.white
    },
    lblBtn: {
        alignSelf: 'center',
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 20,
    },
    btnBeginWorkout: {
        flexDirection: 'row', 
        paddingHorizontal: 20,
        borderRadius: 10
    },
    btnCancel : {
        justifyContent: 'center',
        height: 60, 
        width: 70, 
        shadowColor: 'black', 
        shadowRadius: 1, 
        shadowOffset: { width: 1, height: 2, },
        shadowOpacity: 0.5, 
        backgroundColor: 
        colors.red, 
        borderRadius: 10
    },
    btnSave : {
        justifyContent: 'center', 
        height: 60, 
        width: 70, 
        shadowColor: 'black', 
        shadowRadius: 1, 
        shadowOffset: { width: 3, height: 2, }, 
        shadowOpacity: 0.5, 
        backgroundColor: colors.blue, 
        borderRadius: 10
    },
    txtExcerciseInfo: {
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
})
