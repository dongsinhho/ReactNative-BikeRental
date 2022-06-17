import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GlobalVariable from '../GlobalVariable';

const UserInfoScreen = ({ navigation }) => {
    const [modified, setModified] = React.useState(false)
    const [buttonName, setButtonName] = React.useState("Chỉnh sửa")
    const [userInfo, setUserInfo] = React.useState(null)
    const inputName = React.useRef(null)
    const inputEmail = React.useRef(null)
    const inputPass = React.useRef(null)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                borderBottomWidth: 0
            },
            headerTransparent: true,
        });
    }, [])

    React.useEffect(async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await axios.get(`${GlobalVariable.WEB_SERVER_URL}/api/users/info`, {
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
                setUserInfo(res.data)
            } else {
                setUserInfo(null)
            }
        } catch (error) {
            Alert.alert("Thông báo", "Có lỗi xảy ra")
        }
    }, [])
    

    const handleModified = () => {
        if (buttonName == "Cập nhật") {
            console.log(inputEmail)
        }
        setModified(!modified)
        buttonName == "Chỉnh sửa" ? setButtonName("Cập nhật") : setButtonName("Chỉnh sửa")
    }

    const handleCancel = () => {
        setModified(false)
        // ref={input => { this.textInput = input }}
        // this.textInput.clear()
        inputName.current.clear();
        inputEmail.current.clear();
        inputPass.current.clear();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.headerInfo}>
                <Text style={styles.name}>John Doe</Text>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
            </View>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <View style={styles.label}>
                        <Text>Tên</Text>
                        <TextInput
                            ref={inputName}
                            style={modified ? styles.inputField : styles.inputEdit}
                            editable={modified}
                            placeholder={userInfo ? userInfo.name : "undefine"} />
                    </View>
                    <View style={styles.label}>
                        <Text>Email</Text>
                        <TextInput
                            ref={inputEmail}
                            style={modified ? styles.inputField : styles.inputEdit}
                            editable={modified}
                            placeholder={userInfo ? userInfo.email : "undefine"} />
                    </View>
                    <View style={styles.label}>
                        <Text>Password</Text>
                        <TextInput
                            ref={inputPass}
                            style={modified ? styles.inputField : styles.inputEdit}
                            secureTextEntry={true}
                            editable={modified}
                            placeholder='************' />
                    </View>
                    <TouchableOpacity style={styles.submitButton} onPress={handleModified}>
                        <Text>{buttonName}</Text>
                    </TouchableOpacity>
                    {
                        modified && <TouchableOpacity style={styles.submitButton} onPress={handleCancel}>
                            <Text>Huỷ</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

export default UserInfoScreen

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 100,
    },
    headerInfo: {
        top: -40,
        alignItems: "stretch",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "white",
    },
    name: {
        fontSize: 25,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        top: -30
    },
    bodyContent: {
        alignItems: "stretch",
    },

    label: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        marginHorizontal: 20,

    },
    submitButton: {
        marginHorizontal: 30,
        backgroundColor: "#96D6FF",
        marginTop: 15,
        padding: 10,
        alignItems: "center"
    },
    inputField: {
        borderColor: "black",
        borderWidth: 0.5,
        borderRadius: 4,
        padding: 3,
    },
    inputEdit: {
        padding: 3,
    }
});
