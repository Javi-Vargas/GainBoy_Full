import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import colors from "../assets/colors";

function Timer({ workoutState }) {

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

    const saveLog = () => {
        let strTimer = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
        global.logTime = strTimer;
        global.exerciseHistory = global.exerciseBegin;
        workoutState(false);
    }

    return (
        <SafeAreaView>
            <View style={{ backgroundColor: colors.blackLite, borderRadius: 15 }}>
                {/*Cancel and Save Buttons*/}
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 20, paddingHorizontal: 10 }}>
                    <TouchableOpacity style={styles.btnCancel} onPress={() => {workoutState(false);}}>
                        <Text style={styles.lblBtn}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSave} onPress={() => {saveLog();}}>
                        <Text style={styles.lblBtn}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start' }}>
                    <Text style={styles.lblTimer}>Timer: </Text>
                    <Text style={styles.lblTimer}>
                        {minutes < 10 ? '0' + minutes : minutes}: {seconds < 10 ? '0' + seconds : seconds}
                    </Text>
                </View>
            </View>
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
    lblBtn: {
        alignSelf: 'center',
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 20,
    },
    lblTimer: { 
        padding: 20, 
        fontSize: 30, 
        fontWeight: 'bold', 
        color: colors.white 
    }, 
    btnCancel: {
        justifyContent: 'center',
        height: 60, 
        width: 70, 
        shadowColor: 'black', 
        shadowRadius: 1, 
        shadowOffset: { width: 1, height: 2, },
        shadowOpacity: 0.5, 
        backgroundColor: colors.red, 
        borderRadius: 10
    },
    btnSave: {
        justifyContent: 'center', 
        height: 60, width: 70, 
        backgroundColor: colors.blue, 
        borderRadius: 10, 
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset: { width: 3, height: 2, },
        shadowOpacity: 0.5
    }
})
