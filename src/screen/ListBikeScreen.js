import { StyleSheet, Text, SafeAreaView, FlatList, Alert, TouchableOpacity, View, Image, ActivityIndicator  } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import GlobalVariable from '../GlobalVariable';
import noResultIcon from '../assets/images/no-results.png'

const ListBikeScreen = ({ navigation, route }) => {
    const { station } = route.params
    const [listBike, setListBike] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <View style={styles.headerTitle}>
              <Text style={{ fontWeight: 'bold', color: "#292970", }}>Choose the bike you want to rent</Text>
            </View>,
            headerStyle: {
              backgroundColor: '#fff',
              borderBottomWidth: 0,
            },
            headerTitleAlign: 'center',
          });
      }, [navigation])
    React.useEffect(async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await axios.get(`${GlobalVariable.WEB_SERVER_URL}/api/stations/user/${station._id}`, {
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
                setListBike(res.data)
            } else {
                setListBike([])
            }
        } catch (error) {
            Alert.alert("Thông báo", "Có lỗi xảy ra")
        }
    }, [])

    const handleRentBike = async (bikeId) => {
        const token = await AsyncStorage.getItem('token')
        setIsLoading(true)
        await axios.get(`${GlobalVariable.WEB_SERVER_URL}/api/bikes/user/${bikeId}`,{
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            validateStatus: function (status) {
                return status >= 200 && status <= 500;
            }
        }).then((res) => {
            setIsLoading(false)
            if (res.status==200) {
                navigation.navigate("UsingBike")
            } else {
                Alert.alert("Không thành công", res.data.message)
            }
        }).catch ((res) => {
            Alert.alert("Error", "Something wrong...")
            setIsLoading(false)
        })
        
    }

    const handleChooseBike = (bikeId) => {
        Alert.alert("Rent bike", "Are you sure that choose this bike ? \nRent now!",[
            { text: "Confirm",style: "default", onPress:() => handleRentBike(bikeId)},
            { text: "Cancel", style: "cancel", onPress: () => console.log("Cancel")}
        ])
        
    }
    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={styles.listBikeStyle} onPress={() => handleChooseBike(item._id)}>
            <Text >Mã xe: {item._id} </Text>
            <Text>Tình trạng xe: {item.status}</Text>
        </TouchableOpacity>
    )

    return (
        isLoading ?
        <ActivityIndicator size="large"/>
        :
        <SafeAreaView>
            {
                listBike.length > 0 ?
                    <FlatList
                        data={listBike}
                        renderItem={renderItem}
                        keyExtractor={item => { return item._id }}
                    />
                    :
                    <View style={styles.noneData}>
                        <Text style={styles.noneDataText}>Trạm hiện tại đang trống</Text>
                        <Image style={styles.noneDataImage} source={noResultIcon} />
                    </View>
            }
        </SafeAreaView>
        
    )
}

export default ListBikeScreen

const styles = StyleSheet.create({
    noneData: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    noneDataText: {
        fontSize: 20,
    },
    noneDataImage: {
        width: 64,
        height: 64,
        margin: 20
    },
    listBikeStyle: {
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
    headerTitle: {
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#e0ebeb",
        paddingHorizontal: 16
      },
})