import React from 'react';

//----->NOTE-----> You may need to run this cmd in your project dir: npm install @react-navigation/native @react-navigation/native-stack
//                 as well as this cmd: expo install react-native screens react-native-safe-area-context.
//                 This installs the needed dependencies that come from the react navigation libraries
import {NavigationContainer}        from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import LoginScreen      from "./src/LoginScreen"
import SignUpScreen     from "./src/SignUpScreen"
import WorkoutScreen    from "./src/WorkoutScreen"
import AddWorkoutScreen from "./src/AddWorkoutScreen"
import LogScreen        from "./src/LogScreen"

const Stack = createNativeStackNavigator();

global.userId = -1;
global.firstName = "";
global.lastName = "";

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Workout" component={WorkoutScreen} options={{headerShown: false}}/>
                <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Log" component={LogScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
