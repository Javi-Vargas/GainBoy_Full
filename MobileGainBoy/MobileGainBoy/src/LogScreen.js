import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

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
    }
})