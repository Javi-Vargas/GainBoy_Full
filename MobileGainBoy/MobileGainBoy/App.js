import React from 'react';

//----->NOTE-----> You may need to run this cmd in your project dir: npm install @react-navigation/native @react-navigation/native-stack
//                 as well as this cmd: expo install react-native screens react-native-safe-area-context.
//                 This installs the needed dependencies that come from the react navigation libraries
import {NavigationContainer}        from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen          from "./src/screens/LoginScreen";
import SignUpScreen         from "./src/screens/SignUpScreen";
import LandingScreen        from "./src/screens/LandingScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import VerificationScreen   from './src/screens/VerificationScreen';
import AddWorkoutScreen     from './src/screens/AddWorkoutScreen';

const Stack = createNativeStackNavigator();

global.gameBoyPrimaryTxtClr = "#E2E5DE";
global.userId      = "";
global.token       = "";
global.email       = "";
global.password    = "";
global.fullName    = "";
global.exerciseMap = new Map(); //Key: workout name, Value: workout id

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
                <Stack.Screen name= "Landing" component={LandingScreen} options={{headerShown: false}}/>
                <Stack.Screen name= "ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}}/>
                <Stack.Screen name= "Verification" component={VerificationScreen} options={{headerShown: false}}/>
                <Stack.Screen name= "AddWorkout" component={AddWorkoutScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
