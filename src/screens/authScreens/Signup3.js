import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StyledContainer,
  Colors,
  Card,
  TextSmall,
  StyledButtonTouch,
} from '../../Components/styles';
const {primary, secondary, input, black} = Colors;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import {Registeration} from '../../globalFunctions/Auth';
import {ShowToast} from '../../globalFunctions/ShowToast';

const Signup3 = ({route, navigation}) => {
  const userCollection = firestore().collection('Users');
  const [mySelected, setMySelected] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState();

  useEffect(() => {
    const checkToken = async () => {
      const fcmToken = await messaging().getToken();
      console.log('fcm');
      if (fcmToken) {
        setFcmToken(fcmToken);
        console.log('fcm token', fcmToken);
      }
    };
    checkToken();
  }, []);

  const userData = {
    ...route.params.userData,
    pic: route.params.userData.pic
      ? JSON.parse(route.params.userData.pic)
      : null,
    dob: route.params.userData.dob
      ? new Date(JSON.parse(route.params.userData.dob))
      : null,
  };
  const dateOfBirthString = JSON.stringify(userData?.dob);
  const dateOfBirth = JSON.parse(dateOfBirthString);
  const formattedDateTime = dateOfBirth.split('T')[0];

  console.log('dob', formattedDateTime);
  const HandleSignUp = async () => {
    setisLoading(true);
  
    if (mySelected.length > 0) {
      try {
        const response = await Registeration(
          userData,
          formattedDateTime,
          fcmToken,
          mySelected,
        );
        
        setisLoading(false);
        console.log('response.data', response.data);
        
        if (response.data.success) {
          await userCollection
            .doc(response.data.data._id)
            .set(response.data.data);
          
          ShowToast('success', 'Registration Successful');
          console.log('Navigating to Login');
          
          navigation.navigate('Login');
        } else {
          ShowToast('error', response.data.message);
        }
      } catch (error) {
        setisLoading(false);
        ShowToast('error', error.message);
        console.error('Error during registration:', error);
      }
    } else {
      setisLoading(false);
      ShowToast('error', 'Please Choose Your Interests');
    }
  };
  
 

  const array = [
    {
      key: '1',
      title: 'TV show',
    },
    {
      key: '2',
      title: 'music',
    },
    {
      key: '3',
      title: 'books',
    },
    {
      key: '4',
      title: 'sports.',
    },
    {
      key: '5',
      title: 'shooping.',
    },
    {
      key: '6',
      title: 'movie',
    },
    {
      key: '7',
      title: 'games',
    },
    {
      key: '8',
      title: 'drinks',
    },
    {
      key: '9',
      title: 'social N.',
    },
    {
      key: '10',
      title: 'family',
    },
    {
      key: '11',
      title: 'pets',
    },
    {
      key: '12',
      title: 'politics ',
    },
    {
      key: '13',
      title: 'dance',
    },
    {
      key: '14',
      title: 'bars',
    },
    {
      key: '15',
      title: 'travel',
    },
    {
      key: '16',
      title: 'art',
    },
  ];

  const onOptionPress = option => {
    if (mySelected.includes(option)) {
      return setMySelected(mySelected.filter(item => item !== option));
    }
    if (mySelected.length == 5) {
      return alert('you can only select 5.');
    } else {
      setMySelected([...mySelected, option]);
    }
  };

  useEffect(() => {
    console.log(mySelected);
  }, [mySelected]);
  const InterestsMapp = () => {
    return array.map(element => {
      const included = mySelected.includes(element.title);
      return (
        <View key={element.key} style={{paddingTop: 20, paddingHorizontal: 10}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={included ? ['red', 'orange'] : ['#ffffff', '#ffffff']}
            style={[styles.interestButton, styles.shadow]}>
            <StyledButtonTouch
              style={{backgroundColor: 'transparent'}}
              onPress={() => onOptionPress(element.title)}>
              <Text style={styles.interestLabel}>{element.title}</Text>
            </StyledButtonTouch>
          </LinearGradient>
        </View>
      );
    });
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <StyledContainer>
        <View
          style={{
            flexDirection: 'row',
            width: wp('90%'),
            justifyContent: 'space-between',
          }}>
          <Icon
            name="arrow-back"
            size={26}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 26,
              color: black,
              marginRight: 30,
            }}>
            My interests
          </Text>
          <View />
        </View>
        <Card style={styles.iterestCard}>{InterestsMapp()}</Card>
        {isLoading ? (
          <Card style={{paddingTop: hp('10%')}}>
            <View
              style={{backgroundColor: 'transparent'}}
              onPress={() => {
                HandleSignUp();
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['red', 'orange']}
                style={styles.buttonStyle}>
                <ActivityIndicator color={'black'} size={'large'} />
              </LinearGradient>
            </View>
          </Card>
        ) : (
          <Card style={{paddingTop: hp('10%')}}>
            <StyledButtonTouch
              style={{backgroundColor: 'transparent'}}
              onPress={() => {
                HandleSignUp();
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF4500', '#8B0000']}
                style={styles.buttonStyle}>
                <TextSmall style={styles.next}>Continue</TextSmall>
              </LinearGradient>
            </StyledButtonTouch>
          </Card>
        )}
      </StyledContainer>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: input,
    shadowRadius: 10,
    shadowOffset: 0.9,
    elevation: 9,
    shadowOffset: {width: 0, height: 4},
  },
  card: {
    flexDirection: 'row',
    width: wp('90%'),
    top: 10,
  },
  facbook: {
    width: wp('45%'),
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: secondary,
  },
  google: {
    width: wp('45%'),
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: secondary,
  },
  buttonStyle: {
    width: wp('90%'),
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'rgba(85,22,165,0.5)',
    borderRadius: 50,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: wp('45%'),
  },
  input: {
    top: 20,
  },
  errorView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('70%'),
    height: hp('15%'),
    top: 30,
  },
  error: {
    justifyContent: 'flex-start',
  },
  next: {
    fontSize: 20,
    color: primary,
    fontWeight: 'bold',
  },
  iterestCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  interestLabel: {
    marginHorizontal: 20,
    textAlign: 'center',
    fontSize: 16,
    color: black,
    fontWeight: 'bold',
  },
  interestButton: {
    height: 50,
    borderRadius: 20,
    backgroundColor: primary,
    borderColor: input,
    borderWidth: 1,
    justifyContent: 'center',
  },
});
export default Signup3;
