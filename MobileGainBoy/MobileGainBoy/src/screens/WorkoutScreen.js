import React from "react";
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

const WorkoutScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingTop: 50, paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
                    <Button title="Edit" onPress={() => alert("Edit Workout")} />
                    <TouchableOpacity onPress={() => navigation.navigate('AddWorkout')}>
                        <Ionicons name="add-outline" color="blue" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', borderColor: 'black', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 }}>
                    <Feather name='search' size={20} color="black" style={{ marginRight: 5 }} />
                    <TextInput placeholder="Search Saved Workouts" />
                </View>

                <View style={{ top: 30, flexDirection: 'row', justifyContent: 'center', paddingTop: 20, paddingBottom: 20, backgroundColor: "orange", borderRadius: 10 }}>
                    <TouchableOpacity style={styles.addWorkout}>
                        <Text>Start An Empty Workout</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <Text style={{ paddingTop: 60, borderRadius: 20 }}>I wanna make this a list with the users saved Workouts</Text>
                </View>
            </ScrollView>
            <Button
                title="LogOut"
                onPress={() => navigation.navigate('Login')}
            />
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