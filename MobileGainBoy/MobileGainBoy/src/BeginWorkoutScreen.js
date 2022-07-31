import React, { useState, useEffect, Component, Alert } from "react";
import { SafeAreaView, View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'
import Timer from "./Timer"
import colors from "../assets/colors";

const BeginWorkoutScreen = ({ navigation }) => {
    const [workoutBegan, setWorkoutBegan] = useState(false);
    
    const timerRender = () => {
        if (workoutBegan) {
            return (<Timer navigation={navigation}/>)
        }
        else {
            return (<View/>);
        }
    }
    
    {/**Renders Received Cards */ }
    const receiveExercises = () => {
        if (useIsFocused() && global.exerciseBegin.length != 0) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
                    {global.exerciseBegin.map(item => (
                        <Card key={item.name} data={item} />
                    ))}
                </View>
            );
        }
        else {
            return (<View/>);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => { setWorkoutBegan(true); }} style={styles.beginBtn}>
                    <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 20 }}>Begin FreeStyle Workout</Text>
                </TouchableOpacity>

                {timerRender()}
            </View>
            <ScrollView>
                {receiveExercises()}
            </ScrollView>
            <ScrollView style={{ paddingTop: 20, paddingHorizontal: 10 }} />
        </SafeAreaView>
    )
}

const Card = ({ data }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardDataContainer}>
                <Text style={styles.lblData}> Workout: {data.name} </Text>
                <View style={styles.cardDataSpace}/>
                <Text style={styles.lblData}> Reps: {data.reps}    </Text>
                <View style={styles.cardDataSpace}/>
                <Text style={styles.lblData}> Sets: {data.sets}    </Text>
                <View style={styles.cardDataSpace}/>
                <Text style={styles.lblData}> Total Weight (lb): {data.totalWeight}</Text>
                <View style={styles.cardDataSpace}/>
                <Text style={styles.lblData}> Time Spent: {data.timeSpent} </Text>
                <View style={styles.cardDataSpace}/>
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
    cardDataContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    cardDataSpace: {
        height: 10
    },
    beginBtn: {
        flexDirection: 'row', 
        marginBottom: 80, 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center', 
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
    lblData: {
        fontWeight: 'bold',
        paddingBottom: 3,
        color: colors.black
    }
})
