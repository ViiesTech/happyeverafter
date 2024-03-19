import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Arrow from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Sms from 'react-native-vector-icons/Fontisto'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserToken, userDetails } from '../../redux/Slices'
import axios from 'axios'
import Toast from 'react-native-toast-message'
const Profile = ({ navigation }) => {
  const dispatch = useDispatch()
  const [loading, setIsLoading] = useState(false)
  const details = useSelector(state => state.user.user)
  const token = details.token
  console.log('token', token)
  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
    });
  }
  const handleLogout = () => {
    setIsLoading(true)
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://appsdemo.pro/happyeverafter/user/logout',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setIsLoading(false)
        showToast('success', 'Logout Successful')
        dispatch(userDetails(''))
        dispatch(clearUserToken())
      })
      .catch((error) => {
        setIsLoading(false)

        showToast('error', error)

        console.log(error);
      });

  }
  return (
    <View style={{ padding: 20 }}>
      {loading && (
        <View style={{ position: 'absolute', marginTop: 20, height: '100%', justifyContent: 'center', alignSelf: 'center' }}>
          <ActivityIndicator size={'20'} />
        </View>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Arrow name='arrowleft' size={25} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <FeatherIcon name='edit-3' size={25} color={'black'} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 25 }}>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <View>
            <Image style={{ height: 100, width: 100, borderRadius: 50, borderWidth: 1.5, borderColor: 'gray' }} source={{ uri: `https://appsdemo.pro/happyeverafter/${details.image}` }} />
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{details.name}</Text>
            <Text style={{ fontSize: 16, color: 'gray' }}>Fashion Model</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 25 }}>
        <FeatherIcon name='phone' size={25} color={'gray'} />
        <Text style={{ color: 'gray', fontSize: 16 }}>42203-87483-443</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 15 }}>
        <Sms name='email' size={25} color={'gray'} />
        <Text style={{ color: 'gray', fontSize: 16 }}>{details.email}</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 35 }}></View>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 25 }}>
        <Arrow name='hearto' size={25} color={'blue'} />
        <Text style={{ color: '#00008B', fontSize: 16 }}>Your Favourites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 25 }}>
        <MaterialIcon name='payment' size={25} color={'blue'} />
        <Text style={{ color: '#00008B', fontSize: 16 }}>Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 25 }}>
        <FontIcon name='satellite-dish' size={25} color={'blue'} />
        <Text style={{ color: '#00008B', fontSize: 16 }}>Tell Your Friend</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 25 }}>
        <Arrow name='tago' size={25} color={'blue'} />
        <Text style={{ color: '#00008B', fontSize: 16 }}>Promotions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 25 }}>
        <Arrow name='setting' size={25} color={'blue'} />
        <Text style={{ color: '#00008B', fontSize: 16 }}>Settings</Text>
      </TouchableOpacity>
      <View style={{ height: 1, width: '100%', marginVertical: 25, backgroundColor: 'gray' }}>

      </View>
      <TouchableOpacity
        onPress={() =>
          handleLogout()

        }
        style={{ flexDirection: 'row', alignItems: 'center', gap: 20, }}>
        <FeatherIcon name='power' size={25} color={'red'} />
        <Text style={{ color: 'red', fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Profile