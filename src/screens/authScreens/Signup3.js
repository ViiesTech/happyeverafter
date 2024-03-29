import { View, Text, StyleSheet, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { StyledContainer, Colors, Card, TextSmall,  StyledButtonTouch } from '../Components/styles'
import { StyledContainer, Colors, Card, TextSmall, StyledButtonTouch } from '../../Components/styles';
const { primary, secondary, input, black } = Colors;
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';


const Signup3 = ({ route, navigation }) => {
    // console.log('routes', route.params.userData)
    const userData = route.params.userData
    const [mySelected, setMySelected] = useState([]);
    const [isLoadign, setisLoading] = useState(false);
    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
        });
    }
    const HandleSignUp = () => {
        let data = new FormData();
        data.append('name', userData.name);
        data.append('email', userData.email);
        data.append('password', userData.password);
        data.append('dob', JSON.stringify(userData.dob));
        data.append('country', userData.country);
        data.append('gender', userData.gender);
        data.append('about', userData.bio);
        data.append('interests', JSON.stringify(mySelected));
        data.append('image', {
            uri: userData?.pic?.path,
            name: 'Profile',
            type: userData?.pic?.mime,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://appsdemo.pro/happyeverafter/user/register',
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${userToken}`,
                // ...data.getHeaders()
            },
            data: data
        };

        // console.log('name',userData.name)
        // console.log('email',userData.email)
        // console.log('password',userData.password)
        // console.log('dob', JSON.stringify(userData.dob), typeof userData.dob)
        // console.log('country',userData.country)
        // console.log('gender', userData.gender)
        // console.log('about',userData.bio)
        // console.log('interests', mySelected)
        // console.log('image', userData.pic.path)
        // console.log('imagetype', userData.pic.mime)
        axios.request(config)
            .then((response) => {
                console.log("data", JSON.stringify(response.data));
                showToast('success', 'Registeration Successful')
                navigation.navigate('Login')
            })
            .catch((error) => {
                showToast('error', error.message)

                console.log(error);
            });

        // navigation.navigate("MainStack")
    }

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
        }
    ];

    const onOptionPress = option => {
        if (mySelected.includes(option)) {
            return setMySelected(mySelected.filter(item => item !== option))
        }
        if (mySelected.length == 5) {
            return alert("you can only select 5.")
        }
        else {
            setMySelected([...mySelected, option])
        }
    }

    useEffect(() => {

        console.log(mySelected)
    }, [mySelected])
    const InterestsMapp = () => {
        return array.map((element) => {
            const included = mySelected.includes(element.title)
            return (
                <View key={element.key} style={{ paddingTop: 20, paddingHorizontal: 10 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={included ? ['red', 'orange'] : ['#ffffff', '#ffffff']}
                        style={[styles.interestButton, styles.shadow]} >
                        <StyledButtonTouch style={{ backgroundColor: 'transparent' }} onPress={() => onOptionPress(element.title)}>
                            <Text style={styles.interestLabel}>{element.title}</Text>
                        </StyledButtonTouch>
                    </LinearGradient>
                </View>
            );
        });
    };
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <StyledContainer>
                <View style={{ flexDirection: 'row', width: wp('90%'), justifyContent: 'space-between' }}>
                    <Icon name='arrow-back' size={26} color="black" onPress={() => navigation.goBack()} />
                    <Text style={{ alignSelf: 'center', fontSize: 26, color: black, marginRight: 30 }}>My interests</Text>
                    <View />
                </View>
                <Card style={styles.iterestCard}>
                    {InterestsMapp()}
                </Card>
                {
                    isLoadign ?
                        <Card style={{ paddingTop: hp('10%') }}>
                            <View style={{ backgroundColor: 'transparent' }} onPress={() => { HandleSignUp() }}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['red', 'orange']} style={styles.buttonStyle}>
                                    <ActivityIndicator color={"white"} size={'large'} />
                                </LinearGradient>
                            </View>
                        </Card> :
                        <Card style={{ paddingTop: hp('10%') }}>
                            <StyledButtonTouch style={{ backgroundColor: 'transparent' }} onPress={() => { HandleSignUp() }}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF4500', '#8B0000']} style={styles.buttonStyle}>
                                    <TextSmall style={styles.next}>Continue</TextSmall>
                                </LinearGradient>
                            </StyledButtonTouch>
                        </Card>
                }
            </StyledContainer>

        </ScrollView>

    )
}
const styles = StyleSheet.create({
    shadow: {
        shadowColor: input,
        shadowRadius: 10,
        shadowOffset: 0.9,
        elevation: 9,
        shadowOffset: { width: 0, height: 4 },
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
        borderColor: secondary
    },
    google: {
        width: wp('45%'),
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderColor: secondary
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
        justifyContent: "center",
        width: wp('45%')
    },
    input: {
        top: 20
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
        fontWeight: 'bold'
    },
    iterestCard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    },
    interestLabel: {
        marginHorizontal: 20,
        textAlign: 'center',
        fontSize: 16,
        color: black,
        fontWeight: 'bold'
    },
    interestButton: {
        height: 50,
        borderRadius: 20,
        backgroundColor: primary,
        borderColor: input,
        borderWidth: 1,
        justifyContent: 'center'
    }
})
export default Signup3