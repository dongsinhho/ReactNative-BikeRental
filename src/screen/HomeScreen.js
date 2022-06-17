import { StyleSheet, Text, View, Button, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react'
import { useIsFocused } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { AuthContext } from '../components/context'

import walletIcon from '../assets/images/wallet.png'
import topUpIcon from '../assets/images/top-up.png'
import userIcon from '../assets/images/programmer.png'
import mapIcon from '../assets/images/map.png'
import noResultIcon from '../assets/images/no-results.png'

import GlobalVariable from '../GlobalVariable';

const HomeScreen = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext)
    const [sideBar, setSideBar] = React.useState(false);
    const [historyData, setHistoryData] = React.useState([])
    const isFocused = useIsFocused()
    React.useEffect(async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const res = await axios.get(`${GlobalVariable.WEB_SERVER_URL}/api/payments/info`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            if (res.data) {
                setHistoryData(res.data)
            }
            else {
                setHistoryData([])
            }
        }
        catch (err) {
            setHistoryData([])
        }
    }, [navigation, isFocused])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Scan QR")}>
                    <Ionicons style={{ marginRight: 15 }} name="qr-code" size={30} color="black" />
                </TouchableOpacity>
            ),
            headerTitle: () => <FontAwesome name="navicon" size={30} color="black" onPress={() => { setSideBar(!sideBar) }} />,
            // headerTransparent: true,
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomWidth: 0
            },
        });
    }, [navigation])

    const handlePressHistory = (status) => {
        if (!status) {
            navigation.navigate("UsingBike")
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

    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={item.isCompleted ? styles.historyList : [styles.historyList, styles.historyListBackground]} key={index.toString()} onPress={() => handlePressHistory(item.isCompleted)}>
            <View style={styles.labelText}>
                <Text >Nhận xe: {item.takeAt ? item.takeAt.name : null}  </Text>
                <Text>{convertDateTime(item.createdAt.toString())}</Text>
            </View>
            <View style={styles.labelText}>
                <Text>Trả xe:     {item.paidAt ? item.paidAt.name : null}</Text>
                <Text>{convertDateTime(item.updatedAt.toString())}</Text>
            </View>

        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            {
                sideBar && <View style={styles.sideBarStyle}>
                    <View style={styles.sideBarContent}>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: "5%" }}>Bike Rental App</Text>
                            <Text>Develop by Hồ Ngọc Đông Sinh</Text>
                            <Text>Copy right 2022</Text>
                        </View>
                        <TouchableOpacity style={styles.buttonLogout} onPress={() => { setSideBar(false); signOut() }}>
                            <Text style={{ fontSize: 17 }}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.sideBarOpacity} onPress={() => setSideBar(false)} />
                </View>
            }
            <View style={styles.wallet}>
                <View style={styles.balance}>
                    <Image style={styles.walletImage} source={walletIcon} />
                    <View style={styles.balanceSector}>
                        <Text style={styles.balanceText}>Số dư:</Text>
                        <Text style={styles.balanceNumber}>5000000</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Image style={styles.topUpIcon} source={topUpIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.section2}>
                <TouchableOpacity style={styles.info} onPress={() => navigation.navigate("Info")}>
                    <Text>Thông tin cá nhân</Text>
                    <Image style={styles.userIcon} source={userIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.map} onPress={() => navigation.navigate("Map")} >
                    <Text>Bản đồ</Text>
                    <Image style={styles.mapIcon} source={mapIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.section3}>
                <Text style={styles.historyTitle}>Lịch sử di chuyển</Text>
                {
                    historyData.length > 0 ?
                        <FlatList
                            data={historyData}
                            renderItem={renderItem}
                            keyExtractor={(item) => { return item._id }}
                            inverted
                        />
                        :
                        <View style={styles.noneData}>
                            <Text style={styles.noneDataText} onPress={() => navigation.navigate("Payment")}>Không có dữ liệu</Text>
                            <Image style={styles.noneDataImage} source={noResultIcon} />
                        </View>
                }
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    wallet: {
        flex: 0.5,
        marginTop: 5,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "stretch",
        padding: 16,
        borderRadius: 4,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }
    },
    balance: {
        flexDirection: "row",
    },
    walletImage: {
        width: 48,
        height: 48,
    },
    balanceText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    balanceNumber: {
        fontSize: 15,
        marginTop: 4
    },
    topUpIcon: {
        width: 48,
        height: 48
    },
    balanceSector: {
        marginLeft: 40
    },
    section2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        marginHorizontal: 10,
    },
    info: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
        padding: 16,
        borderRadius: 4,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }
    },
    map: {
        justifyContent: "center",
        alignItems: "center",
        flex: 3,
        marginLeft: 5,
        padding: 16,
        borderRadius: 4,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }
    },
    userIcon: {
        width: 64,
        height: 64
    },
    mapIcon: {
        width: 64,
        height: 64
    },
    section3: {
        flex: 3.5,
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 16,
        borderRadius: 4,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 }
    },
    historyTitle: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 10
    },
    historyList: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginVertical: 3,
        borderRadius: 4
    },
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
    sideBarStyle: {
        zIndex: 1000,
        position: "absolute",
        height: "100%",
        width: "100%",
        flexDirection: "row"
    },
    sideBarContent: {
        backgroundColor: "#fff",
        width: "80%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    sideBarOpacity: {
        backgroundColor: "#000",
        opacity: 0.2,
        width: "20%",
    },
    buttonLogout: {
        backgroundColor: "#d6d6c2",
        width: "100%",
        paddingVertical: 15,
        alignItems: "center"
    },
    labelText: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
    },
    historyListBackground: {
        backgroundColor: "#ffc2b3"
    }
});