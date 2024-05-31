import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { baseUrl } from '../../assets/Utils/BaseUrl'
import { formStatus } from '../../redux/Slices'

const WhatULooking = ({ navigation }) => {
  const userToken = useSelector(state => state.user.token)
  const [loading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleForm = () => {
    setIsLoading(true)
    let data = JSON.stringify({
      "formStatus": 1
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/user/fill-form`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setIsLoading(false)

        console.log(JSON.stringify(response.data));
        dispatch(formStatus(1))
        // navigation.navigate('BottomStack')

      })
      .catch((error) => {
        setIsLoading(false)

        console.log(error);
      });

  }
  return (
    <ImageBackground source={require('../../assets/images/image4.png')}>
      <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 20, fontWeight: '700', color: 'white' }}>What You Are Looking For?</Text>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.labelText}>Gender</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Age Range</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Location/Distance</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Relationship Type</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Interests/Hobbies</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Appearance</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Ethnicity/Cultural Background</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Education Level</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Religion/Spirituality</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Language</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Occupation/Profession</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#D23073', '#C22B8D', '#AE24AC', '#9C1EC8']} style={styles.buttonStyle}>
          <TouchableOpacity onPress={() => handleForm()} style={{ backgroundColor: 'transparent', justifyContent: 'center' }} >
            {loading ? (
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF4500', '#8B0000']} style={styles.buttonStyle}>
                <ActivityIndicator color={"black"} size={'large'} />
              </LinearGradient>
            ) : (
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF4500', '#8B0000']} style={styles.buttonStyle}>
                <Text style={[styles.next, { textAlign: 'center', color: 'white' }]}>Continue</Text>
              </LinearGradient>
            )}

          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>

    </ImageBackground>
  )
}

export default WhatULooking

const styles = StyleSheet.create({
  next: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonStyle: {
    width: widthPercentageToDP('90%'),
    height: 60,
    justifyContent: 'center',
    borderRadius: 50,

  },
  labelText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
    fontWeight: '700'
  }
})