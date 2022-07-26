import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons'

function CustomDrawer(props, { navigation }) {
    const signOut = () => navigation.navigate('Login');

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#A482FF' }}>
                <ImageBackground source={require('../assets/drawerBG.png')}>
                    <Image source={require('../assets/ninjaUser.jpg')} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
                    <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold', paddingLeft: 10 }}>FName LName</Text>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={signOut} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="exit-outline" color={'black'} size={20} />
                    <Text style={{ marginLeft: 5 }}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CustomDrawer;