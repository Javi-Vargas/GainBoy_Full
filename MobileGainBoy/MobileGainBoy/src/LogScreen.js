import React from "react";
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';

const LogScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Log-History Page</Text>
            <Button
                title="Click Here"
                onPress={() => alert("Buttong Clicked!")}
            />
        </View>
    )
}

export default LogScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#8fcbbc",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
})