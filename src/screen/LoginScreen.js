import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { AuthContext } from '../components/context'

import Warnings from '../assets/images/warning.png'

const LoginScreen = ({ navigation }) => {
  const [emailText, setEmailText] = React.useState('')
  const [passwordText, setPasswordText] = React.useState('')
  const [errorStatus, setErrorStatus] = React.useState('')
  const { signIn } = React.useContext(AuthContext)

  const handleLogIn = () => {
    let errorMessage = []
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailText))) {
      errorMessage.push('Email is invalid')
    }
    if (passwordText.length <= 8) {
      errorMessage.push('Password must be at least 8 characters long')
    }
    if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(passwordText))) {
      errorMessage.push('Password contains at least 1 digit, 1 lowercase, 1 uppercase')
    }
    if (errorMessage.length === 0) {
      setErrorStatus(false)
      const response = signIn(emailText, passwordText)
      setErrorStatus(response)
    } else {
      setErrorStatus(errorMessage[0])
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.banner}> LOGIN </Text>
      <View style={styles.alertValidate}>
        {
          errorStatus ? <View style={styles.alertZone}>
            <Image source={Warnings} style={{width: 20, height: 20}}/>
            <Text style={styles.errorMessageStyle}>{errorStatus}</Text>
          </View> : null
        }
      </View>
      <TextInput style={styles.textInput} onChangeText={value => setEmailText(value)} placeholder='Type your email' />
      <TextInput style={styles.textInput} onChangeText={value => setPasswordText(value)} placeholder='Type your password' secureTextEntry />
      <Button title='Sign in' onPress={handleLogIn} />
      <Text style={styles.register}>Dont have account? <Text onPress={() => { navigation.navigate("Register") }}>Register here</Text></Text>
    </View>
  )
}

export default LoginScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  textInput: {
    paddingVertical: 10

  },
  register: {
    padding: 10
  },
  banner: {
    color: "red",
    fontSize: 30
  },
  errorMessageStyle: {
    fontSize: 12,
    color: "#ffd633",
    marginLeft: 10
  },
  alertZone: {
    borderWidth: 0.5,
    borderColor: "#ffd633",
    padding: 10,
    flexDirection: "row",
  },
  alertValidate: {
    height: "15%",
    justifyContent: "flex-end"
  }
})