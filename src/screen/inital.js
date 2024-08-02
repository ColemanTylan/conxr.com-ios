import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

function Initial(params) {
  const {width, height} = Dimensions.get('screen');
  return (
    <ImageBackground
      source={require('../../assets/earth.jpg')}
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <View style={{marginBottom: 200}}>
        <Image
          source={require('../../assets/logo.png')}
          resizeMode={'contain'}
          style={{width: '100%', height: 150}}
        />
        <Text
          style={{
            fontSize: 30,
            color: 'white',
            textAlign: 'center',
            marginTop: 7,
            marginBottom: 10,
          }}>
          CONNECTING MILLIONS!
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 20,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: width / 1.1,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              params.navigation.navigate('Login');
            }}
            style={{
              backgroundColor: 'green',
              padding: 15,
              borderRadius: 5,
              width: width / 4,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: height / 55}}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              params.navigation.navigate('CreateAccount');
            }}
            style={{
              backgroundColor: 'white',
              padding: 15,
              borderRadius: 5,
              width: width / 4,
              alignItems: 'center',
            }}>
            <Text style={{color: 'green', fontSize: height / 55}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  inputView: {
    alignItems: 'center',
    marginTop: 8,
  },
  inputStyle: {
    height: 35,
    borderRadius: 5,
    width: '70%',
    borderColor: 'rgb(206, 206, 207)',
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgb(59, 114, 21)',
    height: 40,
    width: '70%',
    margin: 5,
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
  },
  button1: {
    height: 4,
    width: '70%',
    padding: 3,
    borderRadius: 50,
    paddingBottom: 15,
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 25,

    color: 'black',
    color: 'white',
    textAlign: 'center',
  },
});
export default Initial;
