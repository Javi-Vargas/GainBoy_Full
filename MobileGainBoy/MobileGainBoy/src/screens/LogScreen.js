import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from "react-navigation";
import colors from "../assets/colors";


const LogScreen = ({ navigation }) => {
    const [time, setTime,] = useState(null);
    const [date, setDate,] = useState(null);
    useEffect(() => {
        let time = getCurrentTime();
        setTime(time);
        let today = new Date();
        let date = (today.getMonth() + 1) + '/' + today.getFullYear();
        setDate(date);
    }, []);

    const getCurrentTime = () => {
        let today = new Date();
        let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
        let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
        return hours + ':' + minutes + ':' + seconds;
    }

    const getCurrentDate = () => {
        let today = new Date();
        return today.getMonth() + '/' + today.getDay() + '/' + today.getFullYear();
    }


    return (
        <View style={styles.drawer}>
            <SafeAreaView>
                {/* <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 47, paddingHorizontal: 10 }} onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu-outline" color="blue" size={30} />
                </TouchableOpacity> */}
                <View>
                    <Text style={{ paddingTop: 40, padding: 30, fontSize: 30, fontWeight: 'bold', color: colors.green }}>Workout History:</Text>
                </View>
                <ScrollView>
                    <Text style={{ padding: 20, fontWeight: 'bold', fontSize: 20, color: colors.green }}>{date}</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', margin: 10 }}>
                        {data.map(item => (
                            <Card data={item} />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default LogScreen;

const data = [
    { name: 'Arms', reps: 20, sets: 3, totalWeight: 500, timeSpent: 30, lightColor: colors.white },
    { name: 'Delts', reps: 5, sets: 5, totalWeight: 1500, timeSpent: 60, lightColor: colors.white },
    { name: 'Legs', reps: 10, sets: 4, totalWeight: 2000, timeSpent: 120, lightColor: colors.white },
];

const Card = ({ data }) => {
    return (
        <View style={{ shadowColor: 'black', shadowRadius: 2, shadowOffset: { width: -10, height: 10, }, shadowOpacity: 0.5, flex: 1, padding: 30, backgroundColor: data.lightColor, margin: 10, borderRadius: 10 }}>
            <Text>Workout: {data.name} </Text>
            <Text>Reps: {data.reps}</Text>
            <Text>Sets: {data.sets} </Text>
            <Text>Total Weight: {data.totalWeight}</Text>
            <Text>Time Spent: {data.timeSpent}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#8fcbbc",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    drawer: {
        flex: 1,
        backgroundColor: colors.black,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    WO_Logs: {

    }
})
