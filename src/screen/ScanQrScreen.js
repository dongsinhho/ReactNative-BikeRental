import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Bike Rental App Camera Permission",
        message:
          "Bike Rental App needs access to your camera " +
          "so you can take scan QR code.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const ScanQrScreen = () => {
  React.useEffect(() => {
    requestCameraPermission
  }, [])
  return (
    <View style={styles.container}>
      <Text>ScanQrScreen</Text>
    </View>
  )
}

export default ScanQrScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
});