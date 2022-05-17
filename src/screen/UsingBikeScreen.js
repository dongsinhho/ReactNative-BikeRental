import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import GlobalVariable from '../GlobalVariable';

const UsingBikeScreen = ({ navigation, route }) => {
    const { station, bikeId } = route.params
    const handleFinish = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await axios.get(`${GlobalVariable.WEB_SERVER_URL}/api/payments/update`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (res.data) {
                navigation.navigate("Payment", { payment: payment})
            } else {
                Alert.alert("Thông báo", "Bạn phải trả xe trước khi hoàn thành")
            }
        } catch (error) {
            Alert.alert("Thông báo", "Có lỗi xảy ra")
        }
    }
    return (
        <View>
            <Text>Return bike guide</Text>
            <Text>Step 1: Move on station which you want to return</Text>
            <Text>Step 2: Find the station control panel, and type your bike id into</Text>
            <Text>Step 3: If success, waiting for station unlock the key device </Text>
            <Text>Step 4: Push bike into designated slot, waiting it closed</Text>
            <Text>Step 5: Finally, click the button below to complete the ride</Text>
            <TouchableOpacity onPress={handleFinish}>
                <Text>Complete the ride</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UsingBikeScreen

const styles = StyleSheet.create({})