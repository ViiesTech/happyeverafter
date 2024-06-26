import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {ShowToast} from '../../globalFunctions/ShowToast';
import {Images} from '../../assets/images/Appassets';

const WhatULooking = ({navigation}) => {
  const [loading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    gender: '',
    age: '',
    interest: '',
    occupation: '',
  });

  const onChangeText = (changedText, key) => {
    setForm(oldForm => {
      return {...oldForm, [key]: changedText};
    });
  };
  const {gender, age, interest, occupation} = form;

  const handleForm = () => {
    if ((!form.gender, !form.age, !form.interest, !form.occupation)) {
      return ShowToast('error', 'Plz Fill Out The Required Fields To Proceed');
    }
    navigation.navigate('PreferenceUsers', {
      userData: {
        gender,
        occupation,
        interest,
        age,
      },
    });
  };
  return (
    <ImageBackground source={Images.image4} style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          gap:10
        }}>
          <TouchableOpacity onPress={()=>navigation.goBack()} style={{justifyContent:'center',alignItems:'center'}}>

          <AntDesign name="arrowleft" color={'white'} size={25} />
          </TouchableOpacity>
          
        <Text
          style={{
            // marginTop: 20,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '700',
            color: 'white',
          }}>
          What You Are Looking For?
        </Text>
      </View>

      <ScrollView contentContainerStyle={{padding: 20}}>
        <View style={{marginTop: 20, flex: 1}}>
          <Text style={styles.labelText}>Gender</Text>
          <TextInput
            onChangeText={changedText => onChangeText(changedText, 'gender')}
            style={{
              height: 60,
              padding: 10,
              color: 'white',
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 10,
            }}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.labelText}>Age Range</Text>
          <TextInput
            onChangeText={changedText => onChangeText(changedText, 'age')}
            style={{
              height: 60,
              padding: 10,
              color: 'white',
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 10,
            }}
          />
        </View>
        {/* <View >
          <Text style={styles.labelText}>Location/Distance</Text>
          <TextInput style={{ height: 60,padding:10, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Relationship Type</Text>
          <TextInput style={{ height: 60,padding:10, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View> */}
        <View style={{marginTop: 20}}>
          <Text style={styles.labelText}>Interests/Hobbies</Text>
          <TextInput
            onChangeText={changedText => onChangeText(changedText, 'interest')}
            style={{
              height: 60,
              padding: 10,
              color: 'white',
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 10,
            }}
          />
        </View>
        {/* <View >
          <Text style={styles.labelText}>Appearance</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Ethnicity/Cultural Background</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View> */}
        {/* <View >
          <Text style={styles.labelText}>Education Level</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View> */}
        {/* <View >
          <Text style={styles.labelText}>Religion/Spirituality</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View>
        <View >
          <Text style={styles.labelText}>Language</Text>
          <TextInput style={{ height: 60, borderWidth: 1, borderColor: 'white', borderRadius: 10 }} />
          <TextInput />
        </View> */}
        <View style={{marginTop: 20, marginBottom: 40}}>
          <Text style={styles.labelText}>Occupation/Profession</Text>
          <TextInput
            onChangeText={changedText =>
              onChangeText(changedText, 'occupation')
            }
            style={{
              height: 60,
              color: 'white',
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 10,
              padding: 10,
            }}
          />
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#D23073', '#C22B8D', '#AE24AC', '#9C1EC8']}
          style={styles.buttonStyle}>
          <TouchableOpacity
            onPress={() => handleForm()}
            style={{backgroundColor: 'transparent', justifyContent: 'center'}}>
            {loading ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF4500', '#8B0000']}
                style={styles.buttonStyle}>
                <ActivityIndicator color={'black'} size={'large'} />
              </LinearGradient>
            ) : (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF4500', '#8B0000']}
                style={styles.buttonStyle}>
                <Text
                  style={[styles.next, {textAlign: 'center', color: 'white'}]}>
                  Continue
                </Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </ImageBackground>
  );
};

export default WhatULooking;

const styles = StyleSheet.create({
  next: {
    fontSize: 20,
    fontWeight: 'bold',
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
    fontWeight: '700',
  },
});
