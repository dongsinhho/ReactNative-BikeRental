import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { AuthContext } from '../components/context'

import Warnings from '../assets/images/warning.png'

const RegisterScreen = ({navigation}) => {
  const [nameText, setNameText] = React.useState('')
  const [emailText, setEmailText] = React.useState('')
  const [phoneText, setPhoneText] = React.useState('')
  const [passwordText, setPasswordText] = React.useState('')
  const [errorStatus, setErrorStatus] = React.useState('')
  const { signUp } = React.useContext(AuthContext)

  const handleRegister = () => {
    let errorMessage = []
    if (nameText.length < 6 && nameText.length > 30) {
      errorMessage.push('Name length must be more than 6 and less than 30 characters')
    }
    if (!(/^[\w\d\s]{6,30}$/).test(nameText)) {
      errorMessage.push('Name is invalid')
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailText))) {
      errorMessage.push('Email is invalid')
    }
    if (!(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/).test(phoneText)) {
      errorMessage.push('Phone number is invalid')
    }
    if (passwordText.length <= 8) {
      errorMessage.push('Password must be at least 8 characters long')
    }
    if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(passwordText))) {
      errorMessage.push('Password contains at least 1 digit, 1 lowercase, 1 uppercase')
    }
    if (errorMessage.length === 0) {
      setErrorStatus(false)
      const response = signUp(nameText, emailText, phoneText, passwordText)
      setErrorStatus(response)
    } else {
      setErrorStatus(errorMessage[0])
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.banner}> REGISTER </Text>
      <View style={styles.alertValidate}>
        {
          errorStatus ? <View style={styles.alertZone}>
            <Image source={Warnings} style={{width: 20, height: 20}}/>
            <Text style={styles.errorMessageStyle}>{errorStatus}</Text>
          </View> : null
        }
      </View>
      <TextInput style={styles.textInput} onChangeText={value => setNameText(value)} placeholder='Type your name' />
      <TextInput style={styles.textInput} keyboardType='email-address' onChangeText={value => setEmailText(value)} placeholder='Type your email' />
      <TextInput style={styles.textInput} keyboardType='phone-pad' onChangeText={value => setPhoneText(value)} placeholder='Type your phone number' />
      <TextInput style={styles.textInput} onChangeText={value => setPasswordText(value)} placeholder='Type your password' secureTextEntry />
      <Button title='Sign up' onPress={handleRegister}/>
      <Text style={styles.register}>Already have account? <Text onPress={() => { navigation.navigate("Login") }}>Login here</Text></Text>
    </View>
  )
}

export default RegisterScreen


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
    height: "10%",
    justifyContent: "flex-end"
  }
})