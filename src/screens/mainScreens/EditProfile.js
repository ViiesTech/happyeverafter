import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker'
import { userDetails } from '../../redux/Slices'

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch()
  const [loading, setIsLoading] = useState(false)
  const details = useSelector(state => state.user.user)
  // console.log('details')
  const [form, setForm] = useState({
    name: '',
    country: '',
    phone: '',
  })

  const onChangeText = (changedText, key) => {
    setForm(oldForm => {
      return { ...oldForm, [key]: changedText };
    });
  };

  const [myProfileImage, setMyProfileImage] = useState()
  const selectAnImage = () => {
    ImagePicker.openPicker({
      height: 400,
      width: 300,
      cropping: true
    }).then(image => {
      console.log('image', image)
      setMyProfileImage(image)
    })
  }

  const handleEditProfile = () => {
    setIsLoading(true)

    let data = new FormData();
    // console.log('name',form.name)
    // console.log('type',myProfileImage.mime)
    // console.log('path',myProfileImage.path)
    data.append('name', form.name);
    data.append('country', form.country);
    data.append('phone', form.phone);
    data.append('updateImage', {
      uri: myProfileImage.path,
      name: 'Profile',
      type: myProfileImage.mime
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://appsdemo.pro/happyeverafter/user/profile-edit',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${details.token}`,
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setIsLoading(false)
        console.log(JSON.stringify(response.data));
        // if (myProfileImage) {
        //   dispatch(userDetails({ image: myProfileImage.path }));

        // }
      })
      .catch((error) => {
        setIsLoading(false)

        console.log(error);
      });

  }
  return (
    <View style={{ paddingTop: 20 }}>
      {
        loading && (
          <View style={{ position: 'absolute', marginTop: 30, height: '100%', justifyContent: 'center', alignSelf: 'center' }}>
            <ActivityIndicator size={'20'} />
          </View>
        )
      }
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEditProfile}>
          <Text style={[styles.buttonText, { bottom: 5 }]} >Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, backgroundColor: 'lightgray', width: '100%' }}></View>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={selectAnImage} >
          {myProfileImage ? (
            <Image
              source={{ uri: `${myProfileImage.path}` }}
              style={{ height: 130, width: 130, borderRadius: 65, borderWidth: 1.5, borderColor: 'grey' }}
            />
          ) : (
            <Image
              source={{ uri: `https://appsdemo.pro/happyeverafter/${details.image}` }}
              style={{ height: 130, width: 130, borderRadius: 65, borderWidth: 1.5, borderColor: 'grey' }}
            />
          )}

          <TouchableOpacity onPress={selectAnImage} style={{ position: 'absolute', bottom: 10, right: 15 }}>
            <FeatherIcon name='edit-3' size={30} color={'black'} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{ marginTop: 30 }}>
          <Text>Your Name</Text>
          <TextInput onChangeText={changedText => onChangeText(changedText, 'name')} style={{ height: 50, width: 300, borderBottomWidth: 1, borderColor: 'lightgray' }} placeholder={details.email}
            placeholderTextColor={'gray'}
          />
        </View>



        <View style={{ marginTop: 20 }}>
          <Text>Your Phone</Text>
          <TextInput onChangeText={changedText => onChangeText(changedText, 'phone')} style={{ height: 50, width: 300, borderBottomWidth: 1, borderColor: 'lightgray' }} placeholder='+1 415-111-000'
            placeholderTextColor={'gray'}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text>Your Country</Text>
          <TextInput onChangeText={changedText => onChangeText(changedText, 'country')} style={{ height: 50, width: 300, borderBottomWidth: 1, borderColor: 'lightgray' }} placeholder={details.country}
            placeholderTextColor={'gray'}
          />
        </View>
      </View>
    </View>
  )
}

export default EditProfile
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    color: 'gray'
  }
})