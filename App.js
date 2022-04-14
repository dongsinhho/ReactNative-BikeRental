import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Button, Alert, View } from 'react-native-web';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import MapScreen from './src/screen/MapScreen';
import PaymentScreen from './src/screen/PaymentScreen';
import ScanQrScreen from './src/screen/ScanQrScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import LoginScreen from './src/screen/LoginScreen';
import UserInfoScreen from './src/screen/UserInfoScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Scan QR" component={ScanQrScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Info" component={UserInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


