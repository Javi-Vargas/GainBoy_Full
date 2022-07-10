import React from 'react';

//----->NOTE-----> You may need to run this cmd in your project dir: npm install @react-navigation/native @react-navigation/native-stack
//                 as well as this cmd: expo install react-native screens react-native-safe-area-context.
//                 This installs the needed dependencies that come from the react navigation libraries
import {NavigationContainer}        from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import LoginPage   from "./src/LoginPage"
import SignUpPage  from "./src/SignUpPage"
import LandingPage from "./src/LandingPage"

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
                <Stack.Screen name="SignUp" component={SignUpPage} options={{headerShown: false}}/>
                <Stack.Screen name="Landing" component={LandingPage} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
