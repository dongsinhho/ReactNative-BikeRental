import { StyleSheet, Text, SafeAreaView, FlatList, Alert, TouchableOpacity } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import GlobalVariable from '../GlobalVariable';

const ListBikeScreen = ({ navigation, route }) => {
    const { station } = route.params
    const [listBike, setListBike] = React.useState([])
    React.useEffect(async () => {
        console.log(station)
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
                setListBike(res.data ? res.data : [])
            }
        } catch (error) {
            Alert.alert("Thông báo", "Có lỗi xảy ra")
        }
    }, [])
    const handleChooseBike = (bikeID) => {
        navigation.navigate("UsingBike", { station: station, bikeId: bikeID })
    }
    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={styles.listBikeStyle} onPress={() => handleChooseBike(item.id)}>
            <Text >Mã xe: {item.id} </Text>
            <Text>Trạng thái: {item.status}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView>
            <Text>Choose the bike you want to rent</Text>
            <FlatList
                data={listBike}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    )
}

export default ListBikeScreen

const styles = StyleSheet.create({})