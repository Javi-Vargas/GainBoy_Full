import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Button, StyleSheet, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../assets/colors";
import InputExercise from "./InputExercise";

function Timer({ navigation }) {

    const [toggle, setToggle] = useState(false);

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

    const shiftLeft = () => {

    }

    return (
        <SafeAreaView>
            <View style={{ backgroundColor: colors.blackLite, borderRadius: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 20, paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Begin') }} style={{
                        shadowColor: 'black', shadowRadius: 1, shadowOffset: { width: 1, height: 2, },
                        shadowOpacity: 0.5, height: 60, width: 70, backgroundColor: colors.red, borderRadius: 10, justifyContent: 'center'
                    }}>
                        <Text style={styles.btn}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Begin') }} style={{
                        justifyContent: 'center', height: 60, width: 70, backgroundColor: colors.blue, borderRadius: 10, shadowColor: 'black',
                        shadowRadius: 1,
                        shadowOffset: { width: 3, height: 2, },
                        shadowOpacity: 0.5,
                    }}>
                        <Text style={styles.btn}>Save</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start' }}>
                    <Text style={{ padding: 20, fontSize: 30, fontWeight: 'bold', color: colors.white }}>Timer: </Text>
                    <Text style={{ padding: 20, fontSize: 30, fontWeight: 'bold', color: colors.white }}>{minutes < 10 ? '0' + minutes : minutes}: {seconds < 10 ? '0' + seconds : seconds}</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity onPress={() => [setToggle(!toggle),]} style={styles.addExercise}>
                        <Ionicons name="add-circle-outline" color={colors.green} size={30} />
                        <Text style={{ paddingTop: 8, paddingLeft: 8, color: colors.green, fontWeight: 'bold' }}>Add Exercises</Text>
                    </TouchableOpacity>
                    {toggle && <InputExercise />}
                </View> */}
            </View>
            {/* <View>
                <ScrollView style={styles.scrollView}>
                    <Text style={{ color: colors.white }}>...</Text>
                </ScrollView>
            </View> */}
        </SafeAreaView>
    );
}

export default Timer;

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
        marginTop: 10,
        borderRadius: 10,
        height: '62%'

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
