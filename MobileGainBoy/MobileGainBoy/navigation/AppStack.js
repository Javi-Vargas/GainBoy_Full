import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LandingScreen from '../screens/LandingScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import ProfileScreen from '../screens/ProfileScreen'

import CustomDrawer from '../components/CustomDrawer';
import { color } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Drawer = createDrawerNavigator();

function AppStack({ navigation }) {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: false, drawerActiveBackgroundColor: '#A482FF', drawerActiveTintColor: 'white' }}>
            <Drawer.Screen name="Landing" component={LandingScreen} options={{
                headerShown: false, drawerIcon: () => (
                    <Ionicons name="home-outline" size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="Profile" component={ProfileScreen} options={{
                headerShown: false, drawerIcon: () => (
                    <Ionicons name="person-outline" size={22} color={color} />
                )
            }} />
        </Drawer.Navigator>
    );
}

export default AppStack;
