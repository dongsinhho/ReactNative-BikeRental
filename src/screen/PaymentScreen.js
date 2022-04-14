import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const PaymentScreen = ({ navigation, route }) => {
  const { station, isRent } = route.params
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <View style={styles.headerTitle}>
        <Text style={{ fontWeight: 'bold', color: "#292970", }}>Thanh toán</Text>
      </View>,
      // headerTransparent: true,
      headerStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: 0,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation])

  React.useEffect(() => {
    if (isRent) {
      //send post method to rent bike
    }
    //send put method to return bike
  })
 
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
            <Text style={styles.textStyle2}>{station.name}</Text>
            <Text style={styles.textStyle2}>29/11/2021 - 07:00 AM</Text>
          </View>
          <Text style={styles.textStyle1}>Drop Off</Text>
          <View style={styles.labelText}>
            <Text style={styles.textStyle2}>{isRent ? station.name : "Unknown"}</Text>
            <Text style={styles.textStyle2}>{isRent ? station.name : "Unknown"}</Text>
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
          <TouchableOpacity style={styles.submitButton}>
            <Text style={{color: "#fff", fontSize: 17}}>Rent Now</Text>
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