import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
// import { StyledContainer, Colors, TextLabel, Card, TextSmall, StyledTextInput, StyledButtonTouch, SmallTextInput, HeaderContainer, ScreenTitle, InputStyledTextField } from '../Components/styles'
const { primary, purple, secondary } = Colors;
import { StyledContainer, Colors, TextLabel, Card, TextSmall, StyledTextInput, StyledButtonTouch, SmallTextInput, HeaderContainer, ScreenTitle, InputStyledTextField } from '../../Components/styles';
import {

    Provider,
    ThemeProvider,
} from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'
import DatePicker from 'react-native-date-picker'
import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Images } from '../../assets/images/Appassets';
const SignUp2 = ({ route, navigation }) => {
    const { email, password } = route.params.userData;
    console.log('email,password', email, password)
    const [showDropDown, setShowDropDown] = useState(false);
    const [Name, setName] = useState('')
    const [male, setMale] = useState(true);
    const [female, setFemale] = useState(false);
    const [gender, setGender] = useState('male');
    const [country, setCountry] = useState(null);
    const [bio, setBio] = useState('')
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [profileImage, setProfileImage] = useState()
    const [imageType, setImageType] = useState()
    const [countries, setCountries] = useState([
        {
            label: "USA",
            value: "USA",
        },
        {
            label: "Canada",
            value: "Canada",
        },
        {
            label: "Germany",
            value: "Germany",
        },
    ])

    const getAge = (birthday) => { // birthday is a date
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    const selectAnImage = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            // setImageType(image)
            console.log('image', image)
            setProfileImage(image);
        });

    }
    const HandleSignUp = () => {

        navigation.navigate("Signup3", {
            userData: {
                email: email, password: password, name: Name, pic: profileImage, dob: date, country: country, gender: gender, bio: bio
            }
        })
    }

    console.log('date', date)

    return (
        <ImageBackground style={{ flex: 1 }} source={require('../../assets/images/login.png')}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Provider>
                    <ThemeProvider >
                        <StyledContainer>
                            <View style={{ paddingLeft: 15, alignSelf: 'flex-start' }}>
                                <Icon name='arrow-back' size={26} color="white" onPress={() => navigation.goBack()} />
                            </View>
                            <Card style={styles.input}>
                                <TextLabel>Select a Profile Picture</TextLabel>
                                <TouchableOpacity onPress={selectAnImage} style={{ width: wp('90%'), height: hp('30%'), borderRadius: 8, overflow: 'hidden' }}>
                                    {profileImage ? (
                                        <Image source={{ uri: profileImage.path }} style={{ width: '100%', height: '100%' }} />
                                    ) : (
                                        <View style={{ width: '100%', height: '100%', backgroundColor: 'lightgrey' }} />
                                    )}
                                </TouchableOpacity>
                            </Card>
                            <Card style={styles.input}>
                                <TextLabel>Enter your name</TextLabel>
                                <StyledTextInput placeholder="Name" style={[styles.shadow, styles.inputBorder]}
                                    value={Name}
                                    onChangeText={text => setName(text)}
                                />
                            </Card>
                            <Card style={styles.input}>
                                <TextLabel>Date of birth</TextLabel>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <InputStyledTextField>{date.getMonth() + 1}</InputStyledTextField>
                                    <InputStyledTextField>{date.getDate()}</InputStyledTextField>
                                    <InputStyledTextField>{date.getFullYear()}</InputStyledTextField>
                                    <TouchableOpacity onPress={() => setOpen(true)} style={styles.dateOver} />
                                </View>
                            </Card>
                            <Card style={styles.input}>
                                <TextLabel>Choose your country</TextLabel>
                                <SafeAreaView style={{ width: wp('90%'), justifyContent: 'center', borderRadius: 10, height: 50 }}>
                                    <DropDownPicker
                                        open={showDropDown}
                                        value={country}
                                        items={countries}
                                        setOpen={setShowDropDown}
                                        setValue={setCountry}
                                        setItems={setCountries}
                                    />
                                </SafeAreaView>
                            </Card>
                            <Card style={styles.switcher}>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={male ? ['orange', 'red',] : ['#ffffff', '#ffffff']} style={[styles.male, styles.buttonShadow, { borderRadius: male ? 100 : 10 }]}>
                                    <StyledButtonTouch style={{ width: wp('42%'), backgroundColor: 'transparent' }} onPress={() => { setFemale(false), setMale(true), setGender('male') }}>
                                        <TextSmall style={{ color: male ? '#ffffff' : '#F2B3B7', fontWeight: 'bold' }}>Male</TextSmall>
                                    </StyledButtonTouch>
                                </LinearGradient>
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={female ? ['red', 'orange',] : ['#ffffff', '#ffffff']} style={[styles.female, styles.buttonShadow, { borderRadius: female ? 100 : 10 }]}>
                                    <StyledButtonTouch style={{ width: wp('42%'), backgroundColor: 'transparent' }} onPress={() => { setFemale(true), setMale(false), setGender("female") }}>
                                        <TextSmall style={{ color: female ? '#ffffff' : '#F2B3B7', fontWeight: 'bold' }}>Female</TextSmall>
                                    </StyledButtonTouch>
                                </LinearGradient>
                            </Card>
                            <Card style={styles.input}>
                                <TextLabel>Write about yourself</TextLabel>
                                <View style={{ width: wp('90%'), alignSelf: 'center', paddingHorizontal: 5, marginTop: 10, backgroundColor: 'lightgrey', borderRadius: 8 }}>
                                    <TextInput value={bio} multiline={true} numberOfLines={6} textAlignVertical={'top'} placeholder={"Write your bio here...."} placeholderTextColor={'grey'} onChangeText={(changedText) => setBio(changedText)} style={{ fontSize: 16, color: 'black' }} />
                                </View>

                            </Card>
                            <Card style={{ paddingVertical: hp('5%') }}>
                                <StyledButtonTouch style={{ backgroundColor: 'transparent' }} onPress={() => { HandleSignUp() }}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF4500', '#8B0000']} style={styles.buttonStyle}>
                                        <TextSmall style={styles.next}>Continue</TextSmall>
                                    </LinearGradient>
                                </StyledButtonTouch>
                            </Card>

                        </StyledContainer>
                    </ThemeProvider>
                </Provider >
                <DatePicker
                    modal
                    mode='date'
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </ScrollView>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    shadow: {
        // shadowColor: input,
        shadowRadius: 10,
        shadowOffset: 0.6,
        elevation: 8,
        shadowOffset: { width: 0, height: 4 }
    },
    card: {
        flexDirection: 'row',
        width: wp('90%'),
        top: 10,
    },
    switcher: {
        flexDirection: 'row',
        width: wp('90%'),
        paddingTop: hp('5%'),
        justifyContent: 'space-between'
    },
    buttonStyle: {
        width: wp('90%'),
        height: 60,
        justifyContent: 'center',
        backgroundColor: 'rgba(85,22,165,0.5)',
        borderRadius: 50
    },
    male: {
        width: wp('42%'),
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: secondary
    },
    female: {
        width: wp('42%'),
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: secondary
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: wp('45%')
    },
    input: {
        marginTop: 20
    },
    inputBorder: {
        borderColor: purple
    },
    errorView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('70%'),
        height: hp('15%'),
        marginTop: 30,
    },
    error: {
        justifyContent: 'flex-start',
    },
    next: {
        fontSize: 20,
        color: primary,
        fontWeight: 'bold'
    },
    dateOver: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0)'
    }
})
export default SignUp2