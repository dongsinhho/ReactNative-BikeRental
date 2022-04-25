import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView, Alert, PermissionsAndroid } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { EvilIcons } from '@expo/vector-icons';
import stationIcon from '../assets/images/location.png'
import stationActiveIcon from '../assets/images/activeLocation.png'
import bikeStation from '../assets/images/Bike_Station_Img.jpg'

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.ACCESS_BACKGROUND_LOCATION,
      {
        title: "Bike Rental App Location Permission",
        message:
          "Bike Rental App needs access to your location " +
          "so you can take using a map",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the map");
    } else {
      console.log("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}
const station = [
  {
    name: "tramso1",
    latitude: 10.868753894374091,
    longitude: 106.79707161503906,
    status: true
  },
  {
    name: "tramso2",
    latitude: 10.86739469843257,
    longitude: 106.79453960980189,
    status: true
  },
  {
    name: "tramso3",
    latitude: 10.871303687123392,
    longitude: 106.79623476591759,
    status: false
  },
  {
    name: "tramso4",
    latitude: 10.880059214633896,
    longitude: 106.80625013429093,
    status: true
  },
  {
    name: "tramso5",
    latitude: 10.877625393466351,
    longitude: 106.80165819245303,
    status: false
  }
]
const MapScreen = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
    });
  }, [navigation])

  const [bottomSheetData, setBottomSheetData] = React.useState(station)

  const handleRentBike = () => {
    bottomSheetData.status ? 
    navigation.navigate("Payment", { station: bottomSheetData, isRent: true })
    :
    Alert.alert(
      "Notification",
      "This station is busy",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    )
  }

  const renderItem = ({ item }, index) => (
    <TouchableOpacity key={index} style={styles.ListBottomSheet} onPress={() => { setBottomSheetData(item) }}>
      <Text>
        Trạm {item.name} {"\n"}Trạng thái: {item.status ? "sẵn sàng phục vụ" : "đang bận"}
      </Text>
      <View style={styles.statusNode}>
        <View style={item.status ? styles.activeStatus : styles.inactiveStatus} />
      </View>
    </TouchableOpacity>
  )

  const renderContent = () => (
    Array.isArray(bottomSheetData) ?
      <View
        style={{
          backgroundColor: '#f5f5ef',
          paddingHorizontal: 16,
          paddingTop: 5,
          height: "100%"
        }}
      >
        <FlatList
          data={bottomSheetData}
          key={bottomSheetData.name}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.key}
        />
      </View>
      :
      <View style={{
        backgroundColor: 'white',
        padding: 16,
        height: "100%"
      }}>

        <View style={{ flex: 1, }}>
          <Text style={{ fontSize: 20, marginBottom: 15 }}>
            {bottomSheetData.name}
          </Text>
          <ScrollView horizontal={true} style={styles.scrollListImage}>
            <Image style={styles.imageList} source={bikeStation} />
            <Image style={styles.imageList} source={bikeStation} />
            <Image style={styles.imageList} source={bikeStation} />
          </ScrollView>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.stationFunction}>Discord 50%</Text>
            <Text style={styles.stationFunction}>Light Weight</Text>
            <Text style={styles.stationFunction}>Price: 1$/Hour</Text>
          </View>
        </View>
        <View style={{ height: "18%" }}>
          <TouchableOpacity onPress={handleRentBike} style={styles.buttonRent}>
            <Text>Rent from 1$</Text>
          </TouchableOpacity>
        </View>
      </View>
  )

  const renderHeader = () => (
    <View style={styles.renderHeaderContainer} >
      <Text style={{ alignSelf: "center" }} onPress={() => sheetRef.current.snapTo(0)}>Station Info</Text>
      <EvilIcons
        name="close-o"
        size={30}
        color="grey"
        style={{ alignSelf: "flex-end", position: "absolute", right: 30, top: 10 }}
        onPress={() => { sheetRef.current.snapTo(1); setBottomSheetData(station) }} />
    </View >
  )


  const sheetRef = React.useRef();
  // const fall = new Animated.Value(1)

  const handleCallout = (item) => {
    setBottomSheetData(item)
    sheetRef.current.snapTo(0)
  }


  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[350, 40]}
        initialSnap={0}
        //callbackNode={fall}
        renderContent={renderContent}
        renderHeader={renderHeader}
        enabledGestureInteraction={true}
        enabledHeaderGestureInteraction={true}
        enabledContentGestureInteraction={true}
      />
      <MapView
        style={styles.map}
        //customMapStyle={customMapStyle}
        region={{
          latitude: 10.880176876472968,
          longitude: 106.79689813174227,
          latitudeDelta: 0.045,
          longitudeDelta: 0.0363,
        }}
        onPress={() => { sheetRef.current.snapTo(1); setBottomSheetData(station) }}
      >
        {station.map((marker, index) => (
          <Marker
            style={styles.iconStation}
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.name}
            icon={marker.status ? stationActiveIcon : stationIcon}
          >
            <Callout onPress={() => handleCallout(marker)} />
          </Marker>
        ))}

      </MapView>

    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    flex: 1
  },
  iconStation: {
    width: 10,
    height: 10
  },
  renderHeaderContainer: {
    backgroundColor: "#f5f5ef",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d6d6c2",
    paddingVertical: 12,
  },
  ListBottomSheet: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 3,
    borderRadius: 10,
    borderColor: "#000",
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  scrollListImage: {
    height: 150
  },
  buttonRent: {
    backgroundColor: "#96D6FF",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 0
  },
  imageList: {
    marginHorizontal: 5,
    width: 200,
    height: 150
  },
  stationFunction: {
    marginVertical: 15,
    marginHorizontal: 7,
    borderColor: "#000",
    borderWidth: 0.5,
    borderRadius: 4,
    padding: 4
  },
  statusNode: {
    position: "absolute",
    alignSelf: "flex-end",
    top: "55%",
    right: "10%"
  },
  activeStatus: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "green",
  },
  inactiveStatus: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "red",
  },
});

// const customMapStyle = [
//   {
//     "featureType": "administrative",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.land_parcel",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.neighborhood",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "transit",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "labels.text",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   }
// ]