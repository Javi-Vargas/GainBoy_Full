import React from "react";
import { View, Text, Button, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from "react-navigation";

const BeginWorkoutScreen = ({ navigation }) => {
    return (
        <GestureHandlerRootView style={styles.drawer}>
            <View>
                <SafeAreaView style={{ paddingTop: 20, paddingHorizontal: 10 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 47 }} onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu-outline" color="blue" size={30} />
                    </TouchableOpacity>
                    <View style={{ top: 30, flexDirection: 'row', justifyContent: 'center', paddingTop: 20, paddingBottom: 20, backgroundColor: "orange", borderRadius: 10 }}>
                        <TouchableOpacity style={{ flex: 'row', paddingHorizontal: 20 }}>
                            <Text>Start An Empty Workout</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

            </View>
        </GestureHandlerRootView>
    )
}

export default BeginWorkoutScreen;

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
        backgroundColor: "#8fcbbc",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
})
