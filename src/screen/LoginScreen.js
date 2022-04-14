import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.banner}> LOGIN </Text>
      <TextInput style={styles.textInput} placeholder='Type your email' />
      <TextInput style={styles.textInput} placeholder='Type your password' secureTextEntry />
      <Button title='Sign in' />
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
  }
})