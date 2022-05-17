import React from 'react';
import { Alert } from 'react-native';
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
import ListBikeScreen from './src/screen/ListBikeScreen';
import UsingBikeScreen from './src/screen/UsingBikeScreen';
import axios from 'axios';

import { AuthContext } from './src/components/context';
import GlobalVariable from './src/GlobalVariable';

const Stack = createNativeStackNavigator();

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
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (email, password, setErrorStatus) => {
      let userToken, userName
      userToken = null
      userName = null
      try {
        const res = await axios.post(`${GlobalVariable.WEB_SERVER_URL}/api/users/login`,
          {
            email: email,
            password: password,
          }, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          validateStatus: function (status) {
            return status >= 200 && status <= 400; 
          },
        })

        if (res.status == 200) {
          userToken = res.data.token
          userName = res.data.name
        } else {
          setErrorStatus(res.data.message)
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken })
      } catch (err) {
        Alert.alert("Login fail", err, [{
          text: "Retry",
          onPress: () => signIn(email, password, setErrorStatus),
        }, {
          text: "Cancel",
        }
      ])
      }
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

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          loginState.userToken ?
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen name="ListBike" component={ListBikeScreen} />
              <Stack.Screen name="UsingBike" component={UsingBikeScreen} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
              <Stack.Screen name="Scan QR" component={ScanQrScreen} />
              <Stack.Screen name="Info" component={UserInfoScreen} />
            </Stack.Navigator>
            :
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
