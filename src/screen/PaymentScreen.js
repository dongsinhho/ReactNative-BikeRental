import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GlobalVariable from '../GlobalVariable';

const PaymentScreen = ({ navigation, route }) => {
  const { payment } = route.params
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <View style={styles.headerTitle}>
        <Text style={{ fontWeight: 'bold', color: "#292970", }}>Payment</Text>
      </View>,
      // headerTransparent: true,
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation])

  const submitButton = async() => {
    try {
      const token = await AsyncStorage.getItem('token')
      const res = await axios.get(`${GlobalVariable.WEB_SERVER_URL}/api/payments/cash`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }
      })
      if (res.status == 200) {
        Alert.alert("Notification", "Payment success \nFinish now!", [
          { text: "OK", style: "default", onPress: () => {navigation.navigate("Home")}}
        ])
      } else {
        Alert.alert("Notification", "Thanh toán thất bại")
      }
    } catch (error) {
      Alert.alert("Thông báo", "Có lỗi xảy ra")
    }
  }

  const convertDateTime = (time) => {
    let date = new Date(time);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return `${hour}:${minute} ${dt}/${month}/${year}`
  }

  return (
    <View style={styles.container}>
      {/* {
        stationId &&
        <Text>{stationId}</Text>
      } */}
      <View style={styles.insideContainer}>
        <View style={styles.firstSector}>
          <Text style={styles.textStyle1}>Pick Up</Text>
          <View style={styles.labelText}>
            <Text style={styles.textStyle2}>{payment.takeAt.name}</Text>
            <Text style={styles.textStyle2}>{convertDateTime(payment.createdAt.toString())}</Text>
          </View>
          <Text style={styles.textStyle1}>Drop Off</Text>
          <View style={styles.labelText}>
            <Text style={styles.textStyle2}>{payment.paidAt.name}</Text>
            <Text style={styles.textStyle2}>{convertDateTime(payment.updatedAt.toString())}</Text>
          </View>
          <Text style={styles.textStyle1}>Rent fee</Text>
          <View style={styles.labelText}>
            <Text style={styles.textStyle2}>2 hours @ 10.000VNĐ</Text>
            <Text style={styles.textStyle2}>20.000VNĐ</Text>
          </View>
        </View>
        <View style={styles.secondSector}>
          <View style={styles.labelText}>
            <Text style={styles.textStyle2}>Deposit fee</Text>
            <Text style={{ color: "#292970" }}>100.000VNĐ</Text>
          </View>
          <View style={styles.labelText}>
            <Text style={styles.textStyle2}>No Worries on the Device Vehicle</Text>
            <Text style={{ color: "#292970" }}>50.000VND</Text>
          </View>
          <View style={styles.labelText}>
            <Text style={styles.textStyle2}>Service Fee</Text>
            <Text style={{ color: "#292970" }}>10.000VNĐ</Text>
          </View>
        </View>
        <View style={styles.thirdSector}>
          <View style={styles.labelTotal}>
            <Text style={styles.textTotal}>Total</Text>
            <Text style={styles.textTotal}>180.000VNĐ</Text>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={submitButton}>
            <Text style={{ color: "#fff", fontSize: 17 }}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15
  },
  headerTitle: {
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#e0ebeb",
    paddingHorizontal: 16
  },
  insideContainer: {
    height: "100%",
    marginHorizontal: 20,
    marginVertical: 30
  },
  firstSector: {
    height: "35%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#009999",
    justifyContent: "space-around"
  },
  secondSector: {
    height: "25%",
    paddingTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#009999",
    justifyContent: "space-around"
  },
  thirdSector: {
    height: "40%",
  },
  textStyle1: {
    color: "#292970",
    fontWeight: "bold",
    paddingBottom: 15
  },
  textStyle2: {
    color: "#009999",
  },
  labelText: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    paddingBottom: 15
  },
  labelTotal: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    paddingBottom: 15,
    marginTop: 25
  },
  textTotal: {
    color: "#292970",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: "#ffaa80",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  }
});