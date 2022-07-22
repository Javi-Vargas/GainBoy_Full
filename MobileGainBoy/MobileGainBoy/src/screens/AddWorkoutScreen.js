import React from "react";
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'


const AddWorkoutScreen = ({ navigation }) => {
    const handleSave = () => {
        alert("Add Workout To DataBase");
        navigation.navigate('Landing');
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ padding: 20, }}>
                <View style={{ padding: 20 }}>
                    <Text>Workout Info</Text>
                </View>
                <View style={{ flexDirection: 'column', borderColor: 'black', borderWidth: 1, borderRadius: 8 }}>
                    <TextInput style={styles.nameBox} placeholder="Workout Name:" />
                    <TextInput style={styles.descriptionBox} placeholder="Description:" />
                </View>
                <View style={{ paddingTop: 20 }}>
                    <Text>Exercises: </Text>
                    <TouchableOpacity style={styles.addExercise}>
                        <Ionicons name="add-circle-outline" color="blue" size={30} />
                        <Text style={{ paddingTop: 8 }}>Add Exercises</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'space-evenly' }}>
                <Button style={styles.saveBtn}
                    title="Save"
                    onPress={() => handleSave()}
                //onPress={() => alert("Add Workout To Database")}
                />
            </View>
        </SafeAreaView>
    )
}

export default AddWorkoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#8fcbbc",
    },
    addExercise: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    descriptionBox: {
        paddingTop: 10,
        paddingBottom: 50,
        borderTopColor: 'black'
    },
    nameBox: {
        paddingTop: 0,
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
    saveBtn: {
        fontSize: 50
    }
})