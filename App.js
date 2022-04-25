import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import MapScreen from './src/screen/MapScreen';
import PaymentScreen from './src/screen/PaymentScreen';
import ScanQrScreen from './src/screen/ScanQrScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import LoginScreen from './src/screen/LoginScreen';
import UserInfoScreen from './src/screen/UserInfoScreen';
import SplashScreen from './src/screen/SplashScreen';
import axios from 'axios';

import { AuthContext } from './src/components/context';

const Stack = createNativeStackNavigator();
const API_URL = 'https://localhost:4000'

export default function App() {

  const initialLoginState = {
    userName: null,
    userToken: null,
    isLoading: true
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (userName, password) => {
      let userToken
      userToken = null
      // get info from axios
      // try {
      //   const data = await axios.get(API_URL)
      if (userName == 'user' && password == 'pass') {
        userToken = 'thisIsSecret'
        try {
          await AsyncStorage.setItem('token', userToken)
        }
        catch (e) {
          console.log(e)
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken })
      }
      // else {
      //   return data.message
      // }
      // }
      // catch (e) {
      //   console.log(e)
      // }


    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('token')
      }
      catch (e) {
        console.log(e)
      }
      dispatch({ type: 'LOGOUT' })
    },
    signUp: async (userName, password) => {
      // create user with axios
      if (userName == 'user' && password == 'pass') {
        userToken = 'thisIsSecret'
        try {
          await AsyncStorage.setItem('token', userToken)
        }
        catch (e) {
          console.log(e)
        }
        dispatch({ type: 'REGISTER', id: userName, token: userToken })
      }
    }
  }))

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken
      userToken = null
      try {
        userToken = await AsyncStorage.getItem('token')
      }
      catch (e) {
        console.log(e)
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 1000)
  }, [])

  if (loginState.isLoading) {
    return (
      <SplashScreen />
    )
  }
  <SplashScreen />

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          loginState.userToken ?
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
              <Stack.Screen name="Scan QR" component={ScanQrScreen} />
              <Stack.Screen name="Info" component={UserInfoScreen} />
            </Stack.Navigator>
            :
            <Stack.Navigator>
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
        }

      </NavigationContainer>
    </AuthContext.Provider>
  );
}


