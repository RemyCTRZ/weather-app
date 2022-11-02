import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import * as Location from 'expo-location';
import Gradient from './components/Gradient';
import dayjs from 'dayjs/locale/fr';

export default function App() {

  const API_KEY = "5376cdeaea2e1e44ac99017fd955d8ad"

  // Changement de page
  const [home, setHome] = useState(true)
  // Chargement
  const [loading, setLoading] = useState(true)

  // Localisation
  const [location, setLocation] = useState({})
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  // Données récupérées
  const [data, setData] = useState(null)

  // Numéro du jour pour sélection
  const [selectedDay, setSelectedDay] = useState(0)

  const getLocation = async () => {
    await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}&lang=fr`)
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let pos = await Location.getCurrentPositionAsync({});
      if (status !== 'granted') setErrorMsg('...');
      setLocation(pos.coords)
      setLatitude(pos.coords.latitude)
      setLongitude(pos.coords.longitude)
    })();
  }, [loading])

  useEffect(() => {
    getLocation()
      .then(setLoading(false))
  }, [location])


  const dayjs = require('dayjs')

  // Page de chargement
  if (loading || data == null) return (
    <View style={styles.main}>
      <Text style={styles.text}>CHARGEMENT</Text>
    </View>
  )

  return (
    <>
      {home ? (
        <View style={styles.container}>
          {data ? <Gradient data={data} selectedDay={selectedDay} setHome={setHome} /> : ''}
          <View style={styles.div_2}>
            <View style={styles.second_container}>
              <Text style={styles.today}>Aujourd'hui</Text>
              <Pressable style={styles.seven} onPress={() => setHome(false)}>
                <Text style={styles.seventxt}>7 jours</Text>
                <FontAwesome style={styles.right} name="angle-right" />
              </Pressable>
            </View>
          </View>
          <View style={styles.div_3}>
            <ScrollView horizontal={true}>
              {data.list.slice(0, 9).map((data, i) => {
                return (
                  <Pressable key={i} style={selectedDay == i ? styles.day_active : styles.day} onPress={() => setSelectedDay(i)}>
                    <Text style={styles.day_temp}>{Math.round(data.main.temp)}°</Text>
                    <Image style={styles.day_img} source={{ uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` }} />
                    <Text style={styles.day_date}>{dayjs.unix(data.dt).locale('fr').format('HH:mm')}</Text>
                  </Pressable>
                )
              })}
            </ScrollView>
          </View>
        </View>


      ) : (


        <View style={styles.container}>
          <LinearGradient style={styles.div} colors={['#10b2fc', '#1075f5']}>
            <View style={styles.header}>
              <Pressable onPress={() => setHome(true)}>
                <FontAwesome style={styles.icon_bd} name='chevron-left' />
              </Pressable>
              <Text style={styles.city}><FontAwesome style={styles.icon} name="calendar-o" /> 7 jours</Text>
              <Entypo style={styles.icon} name="dots-three-vertical" />
            </View>
            <View style={styles.flex_container}>
              <Image style={styles.img2} source={{ uri: `http://openweathermap.org/img/wn/${data.list[selectedDay].weather[0].icon}@4x.png` }} />
              <View style={styles.tomorrow_container}>
                <View style={styles.temp_container_flex}>
                  <Text style={styles.tomorrow}>Demain</Text>
                  <View style={styles.temp_container}>
                    <Text style={styles.temp}>{Math.round(data.list[selectedDay].main.temp)} </Text>
                    <Text style={styles.temp_2}>/{Math.round(data.list[selectedDay].main.temp_min)}° </Text>
                  </View>
                </View>
                <Text style={styles.desc_2}>{data.list[selectedDay].weather[0].description}</Text>
              </View>
            </View>
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
                <Text style={styles.infotxt}>{data.list[selectedDay].rain ? data.list[selectedDay].rain * 100 + ' %' : '0 %'}</Text>
                <Text style={styles.infodesc}>Pluie</Text>
              </View>
            </View>
          </LinearGradient>


          <View style={styles.foot}>
            {data.list.map((data, i) => {
              if (i % 8 != 0) return
              return (
                <View style={styles.down}>
                  <Text style={styles.down_txt}>{dayjs.unix(data.dt).locale('fr').format('ddd')}</Text>
                  <View style={styles.weather}>
                    <Image style={styles.img3} source={{ uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` }} />
                    <Text style={styles.down_txt}>{data.weather[0].description}</Text>
                  </View>
                  <View style={styles.weather}>
                    <Text style={styles.down_txt_2}>+{Math.round(data.main.temp)}°</Text>
                    <Text style={styles.down_txt}>+{Math.round(data.main.temp_min)}° </Text>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      )
      }
    </>
  );
}

const styles = StyleSheet.create({
  foot: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  down_txt: {
    color: '#F9F9F9',
    opacity: 0.4,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  down_txt_2: {
    color: '#F9F9F9',
    fontWeight: '700',
    opacity: 0.8,
    textTransform: 'capitalize',
    marginRight: 3,
  },
  weather: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img3: {
    height: 50,
    width: 50,
  },
  down: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  flex_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temp_container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  temp_container_flex: {
    marginTop: 30,
  },
  tomorrow: {
    fontSize: 20,
    color: '#F9F9F9',
    marginBottom: -10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '110%',
  },
  day_img: {
    height: 50,
    width: 50,
  },
  day_temp: {
    color: '#F9F9F9',
    fontSize: 20,
    fontWeight: '800',
  },
  day_date: {
    color: '#F9F9F9',
    opacity: 0.6,
    fontWeight: '700',
  },
  div_3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#999',
    borderRadius: 30,
    borderWidth: 1,
    width: 'auto',
    padding: 10,
    marginHorizontal: 5,
  },
  day_active: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#20b8f9',
    borderRadius: 30,
    borderWidth: 1,
    width: 'auto',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#10b2fc',
    // transform: [{ scale: 1.15 }],
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#000A18',
    paddingBottom: 20,
  },
  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000A18',
  },
  text: {
    color: '#F9F9F9',
    textTransform: 'capitalize',
    fontWeight: '700',
    fontSize: 30,
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
  right: {
    color: '#F9F9F9',
    opacity: 0.60,
    fontSize: 20,
  },
  city: {
    color: '#F9F9F9',
    fontWeight: '800',
    fontSize: 25,
    maxWidth: 180,
  },
  temp: {
    color: '#F9F9F9',
    fontWeight: '800',
    fontSize: 70,
    marginRight: -20,
  },
  temp_2: {
    color: '#F9F9F9',
    opacity: 0.6,
    fontWeight: '700',
    fontSize: 40,
  },
  desc: {
    color: '#F9F9F9',
    fontWeight: '600',
    fontSize: 30,
    textTransform: 'capitalize',
  },
  desc_2: {
    color: '#F9F9F9',
    fontWeight: '600',
    fontSize: 15,
    opacity: 0.5,
    textTransform: 'capitalize',
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
  img2: {
    height: 115,
    width: 150,
    resizeMode: 'cover',
  },
  second_container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 10,
    marginBottom: 20,
  },
  today: {
    color: '#F9F9F9',
    fontWeight: '700',
    fontSize: 17,
  },
  seven: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seventxt: {
    color: '#F9F9F9',
    opacity: 0.60,
    marginRight: 5,
  },
  infodesc: {
    color: '#F9F9F9',
    opacity: 0.60,
  },
});