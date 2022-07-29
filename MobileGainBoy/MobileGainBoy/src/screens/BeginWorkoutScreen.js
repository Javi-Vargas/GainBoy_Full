import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../assets/colors";

let pressCount = 0;

const BeginWorkoutScreen = ({ navigation }) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

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

    return (
        <SafeAreaView style={styles.container}>
            {/**This first view is for the big button to start workoing out */}
            <View style={{ flexDirection: 'row', marginBottom: 80, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: 20, paddingBottom: 20, backgroundColor: colors.CJpurple, borderRadius: 10, top: "10%", shadowColor: 'black', shadowRadius: 3, shadowOffset: { width: -5, height: 7, }, shadowOpacity: 0.5, }}>
                <TouchableOpacity style={{ flex: 'row', paddingHorizontal: 20, borderRadius: 10 }}>
                    <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 20 }}>Begin FreeStyle Workout</Text>
                </TouchableOpacity>
            </View>

            {/**This one starts the timer and displays the cancel or save workout buttons. As well as display the 'add Excersices' button */}
            {/**The Idea is that this view doesn't render until the Big button is pressed */}
            <View style={{ backgroundColor: colors.blackLite, borderRadius: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 20, paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Begin') }} style={{ height: 60, width: 70, backgroundColor: colors.red, borderRadius: 10, justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', color: colors.white, fontWeight: 'bold', fontSize: 20 }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Begin') }} style={{ justifyContent: 'center', height: 60, width: 70, backgroundColor: colors.blue, borderRadius: 10 }}>
                        <Text style={{ alignSelf: 'center', color: colors.white, fontWeight: 'bold', fontSize: 20, }}>Save</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start' }}>
                    <Text style={{ padding: 20, fontSize: 30, fontWeight: 'bold', color: colors.white }}>Timer: </Text>
                    <Text style={{ padding: 20, fontSize: 30, fontWeight: 'bold', color: colors.white }}>{minutes < 10 ? '0' + minutes : minutes}: {seconds < 10 ? '0' + seconds : seconds}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={styles.addExercise}>
                        <Ionicons name="add-circle-outline" color={colors.green} size={30} />
                        <Text style={{ paddingTop: 8, paddingLeft: 8, color: colors.green, fontWeight: 'bold' }}>Add Exercises</Text>
                    </TouchableOpacity>

                    {/**This view displays the TextInput boxes and will take exercise info from user */}
                    {/**These are meant to display onPress of the 'add Exercise' button, and be removed after info is input. 
                     * Waiting for button to be pressed again */}
                    <View style={{ alignItems: 'center' }}>
                        <TextInput style={styles.txtSingleFactorInfo} placeholder="Name: " placeholderTextColor={colors.black} />
                        <TextInput style={styles.txtSingleFactorInfo} placeholder="Reps: " placeholderTextColor={colors.black} />
                        <TextInput style={styles.txtSingleFactorInfo} placeholder="Weight/Rep: " placeholderTextColor={colors.black} />
                    </View>
                </View>
            </View>

            {/**This scroll view will hold the list of exercises. Meant to render once the even the first exercise is added.
             * Can be as short or long as user controls
              */}
            <ScrollView style={styles.scrollView}>
                <Text style={{ color: colors.white }}>Just to show that this is a scroll view that will hold the list of exercise done in current workout</Text>
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
    txtSingleFactorInfo: {
        height: 30,
        width: 150,
        justifyContent: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 8,
        borderWidth: 2,
        borderColor: 'black',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 50,
        fontSize: 15,
        backgroundColor: colors.white,
        color: colors.black,
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 10, },
        shadowOpacity: 0.5,
    },
})
