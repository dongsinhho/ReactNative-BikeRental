import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>
          Bike Rental App
        </Text>
      </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    viewStyles: {
        backgroundColor: "#fff", 
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    textStyles: {
        fontSize: 30,
        color: "#000",
    }
})