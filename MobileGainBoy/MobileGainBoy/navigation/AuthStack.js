import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LandingScreen from '../screens/LandingScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{
                    headerShown: true, headerStyle: {
                        backgroundColor: '#8fcbbc'
                    },
                }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{
                    headerShown: true, headerBackButtonMenuEnabled: true, headerStyle: {
                        backgroundColor: '#8fcbbc'
                    },
                }} />
                <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Workout" component={WorkoutScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} options={{
                    headerShown: true, headerBackButtonMenuEnabled: true, headerStyle: {
                        backgroundColor: '#8fcbbc'
                    },
                }} />
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, headerBackButtonMenuEnabled: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthStack;
