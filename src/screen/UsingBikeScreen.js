import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import GlobalVariable from '../GlobalVariable';

const UsingBikeScreen = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <View style={styles.headerTitle}>
                <Text style={{ fontWeight: 'bold', color: "#292970", }}>Bike rental guide</Text>
            </View>,
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomWidth: 0,
            },
            headerTitleAlign: 'center',
        });
    }, [navigation])

    const handleFinish = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await axios.get(`${GlobalVariable.WEB_SERVER_URL}/api/payments/update`, {
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
                navigation.navigate("Payment", { payment: res.data })
            } else {
                Alert.alert("Thông báo", "Bạn phải trả xe trước khi hoàn thành")
            }
        } catch (error) {
            Alert.alert("Thông báo", "Có lỗi xảy ra")
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.step}>Step 1: Move on station which you want to return</Text>
            <Text style={styles.step}>Step 2: Find the station control panel, and type your bike id into</Text>
            <Text style={styles.step}>Step 3: If success, waiting for station unlock the key device </Text>
            <Text style={styles.step}>Step 4: Push bike into designated slot, waiting it closed</Text>
            <Text style={styles.step}>Step 5: Finally, click the button below to complete the ride</Text>
            <Button onPress={handleFinish} style={styles.complete} title='Complete the ride' />
        </View>
    )
}

export default UsingBikeScreen

const styles = StyleSheet.create({
    headerTitle: {
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#e0ebeb",
        paddingHorizontal: 16
    },
    step: {

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
    container: {
        padding: 10,
        marginHorizontal: 10
    },
    complete: {
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 5,
        color: "red"
    }
})