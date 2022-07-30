import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../assets/colors"


const LogScreen = ({ navigation }) => {
    const [time, setTime,] = useState(null);
    const [date, setDate,] = useState(null);
    useEffect(() => {
        let time = getCurrentTime();
        setTime(time);
        let today = new Date();
        let date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        setDate(date);
    }, []);

    const getCurrentTime = () => {
        let today = new Date();
        let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
        let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
        return hours + ':' + minutes + ':' + seconds;
    }

    const cardsRender = () => {
        if (global.exerciseHistory.length != 0) {
            return (
                <View style={styles.cardsContainer}>
                    {global.exerciseHistory.map(item => (
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
                <Text style={styles.lblWorkoutHistory}>Workout History:</Text>
                <Text style={styles.lblDate}>{date}</Text>
            </View>
            <ScrollView>
                {cardsRender()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default LogScreen;

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    cardsContainer: {
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-evenly', 
        margin: 10
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
    lblWorkoutHistory: {
        paddingTop: 40, 
        padding: 30, 
        fontSize: 30, 
        fontWeight: 'bold', 
        color: colors.green
    },
    lblDate: {
        padding: 20, 
        fontWeight: 'bold', 
        fontSize: 20, 
        color: colors.green
    },
    lblData: {
        fontWeight: 'bold',
        paddingBottom: 3,
        color: colors.black
    },
})
