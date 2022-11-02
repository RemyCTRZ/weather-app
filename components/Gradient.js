import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import dayjs from 'dayjs/locale/fr';

export default function Gradient({ data, selectedDay, setHome }) {

    const dayjs = require('dayjs')

    return (
        <LinearGradient style={styles.div} colors={['#10b2fc', '#1075f5']}>
            <View style={styles.header}>
                <Pressable onPress={() => setHome(true)}>
                    <Entypo style={styles.icon_bd} name='home' />
                </Pressable>
                <Text style={styles.city} numberOfLines={1}><FontAwesome style={styles.icon} name="map-pin" /> {data.city.name}</Text>
                <Entypo style={styles.icon} name="dots-three-vertical" />
            </View>
            <Image style={styles.img} source={{ uri: `http://openweathermap.org/img/wn/${data.list[selectedDay].weather[0].icon}@4x.png` }} />
            <View style={styles.temperature}>
                <Text style={styles.temp}>{Math.round(data.list[selectedDay].main.temp)}</Text>
                <Text style={styles.deg}>°</Text>
            </View>
            <Text style={styles.desc} numberOfLines={1}>{data.list[selectedDay].weather[0].description}</Text>
            <Text style={styles.date}>{dayjs.unix(data.list[selectedDay].dt).locale('fr').format('ddd DD MMMM')}</Text>
            <View style={styles.infos}>
                <View style={styles.infobox}>
                    <MaterialCommunityIcons style={styles.info_icon} name="windsock" />
                    <Text style={styles.infotxt}>{Math.round((data.list[selectedDay].wind.speed * 3.6))} km/h</Text>
                    <Text style={styles.infodesc}>Vent</Text>
                </View>
                <View style={styles.infobox}>
                    <Entypo style={styles.info_icon} name="water" />
                    <Text style={styles.infotxt}>{data.list[selectedDay].main.humidity}%</Text>
                    <Text style={styles.infodesc}>Humidité</Text>
                </View>
                <View style={styles.infobox}>
                    <FontAwesome5 style={styles.info_icon} name="cloud-rain" />
                    <Text style={styles.infotxt}>{data.list[selectedDay].rain ? data.list[selectedDay].pop * 100 + ' %' : '0 %'}</Text>
                    <Text style={styles.infodesc}>Pluie</Text>
                </View>
            </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '110%',
    },
    info_icon: {
        color: '#F9F9F9',
        fontSize: 20,
        marginBottom: 10,
    },
    infotxt: {
        color: '#F9F9F9',
        fontWeight: '700',
    },
    infos: {
        marginTop: 30,
        borderTopColor: 'rgba(249, 249, 249, 0.2)',
        borderTopWidth: 1,
        paddingTop: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    infobox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    div: {
        display: 'flex',
        padding: 30,
        paddingTop: 50,
        alignItems: 'center',
        width: "100%",
        backgroundColor: '#14BEF6',
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
    },
    icon: {
        color: '#F9F9F9',
        fontSize: 20,
        padding: 10,
        height: 40,
        width: 40,
    },
    icon_bd: {
        color: '#F9F9F9',
        fontSize: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#F9F9F9',
        padding: 10,
        height: 40,
        width: 40,
    },
    city: {
        color: '#F9F9F9',
        fontWeight: '800',
        fontSize: 25,
        maxWidth: 180,
    },
    temperature: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    temp: {
        color: '#F9F9F9',
        fontWeight: '800',
        fontSize: 70,
    },
    deg: {
        position: 'absolute',
        right: -15,
        top: 18,
        color: '#F9F9F9',
        opacity: 0.5,
        fontSize: 40,
    },
    desc: {
        color: '#F9F9F9',
        fontWeight: '600',
        fontSize: 30,
        textTransform: 'capitalize',
        width: '100%',
        textAlign: 'center',
    },
    date: {
        color: '#F9F9F9',
        opacity: 0.60,
        fontSize: 15,
        textTransform: 'capitalize',
    },
    img: {
        height: 115,
        width: 200,
        resizeMode: 'cover',
    },
    infodesc: {
        color: '#F9F9F9',
        opacity: 0.60,
    }
})