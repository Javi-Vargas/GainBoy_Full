import React from 'react';

//----->NOTE-----> You may need to run this cmd in your project dir: npm install @react-navigation/native @react-navigation/native-stack
//                 as well as this cmd: expo install react-native screens react-native-safe-area-context.
//                 This installs the needed dependencies that come from the react navigation libraries
import {NavigationContainer}        from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import colors from './assets/colors'

import LoginScreen          from "./src/screens/LoginScreen";
import SignUpScreen         from "./src/screens/SignUpScreen";
import LandingScreen        from "./src/screens/LandingScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import VerificationScreen   from './src/screens/VerificationScreen';
import AddWorkoutScreen     from './src/screens/AddWorkoutScreen';

const Stack = createNativeStackNavigator();

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
                <Stack.Screen name="Login" 
                              component={LoginScreen} 
                              options={{
                                headerShown: true,
                                headerTitleAlign: 'center',
                                headerTitleStyle: {color: 'white', fontSize: 25},
                                headerStyle: {backgroundColor: colors.black}
                              }}
                />
                <Stack.Screen name="Sign Up" 
                              component={SignUpScreen} 
                              options={{
                                headerShown: true,
                                headerTitleAlign: 'center',
                                headerTitleStyle: {color: 'white', fontSize: 25},
                                headerStyle: {backgroundColor: colors.black},
                                headerTintColor: colors.CJpurple,
                                headerBackTitleVisible: false
                              }}
                />
                <Stack.Screen name= "Landing" component={LandingScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Forgot Password" 
                              component={ForgotPasswordScreen} 
                              options={{
                                headerShown: true,
                                headerTitleAlign: 'center',
                                headerTitleStyle: {color: 'white', fontSize: 25},
                                headerStyle: {backgroundColor: colors.black},
                                headerTintColor: colors.CJpurple,
                                headerBackTitleVisible: false
                              }}
                />
                <Stack.Screen name= "Verification" component={VerificationScreen} options={{headerShown: false}}/>
                <Stack.Screen name= "AddWorkout" component={AddWorkoutScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
