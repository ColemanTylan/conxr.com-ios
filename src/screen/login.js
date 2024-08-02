import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import AuthAction from '../store/actions/auth';

function Login(params) {
  const [email, updateEmail] = useState('');
  const [password, updatePmassword] = useState('');
  const [loading, UpdateLoading] = useState(false);
  const data = useSelector((state) => state.AuthReducer);
  var dispatch = useDispatch();

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function LoginAccount() {
    if (email !== '' && password !== '') {
      if (email.trim() != '') {
        if (password.length > 8 || password.length < 15) {
          dispatch(
            AuthAction.LoginState('rest-auth/login/', {
              username: email,
              password: password,
            }),
          );
        } else {
          alert('The password is the wrong length.');
        }
      } else {
        alert('Please Enter Valid Email');
      }
    } else {
      alert('Please Enter Email or UserName & Password..');
    }
  }
  return (
    <ImageBackground
      source={require('../../assets/earth.jpg')}
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        alignSelf: 'center',
      }}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View style={{marginTop: 35, justifyContent: 'center'}}>
            <View style={{marginBottom: 40}}>
              <Image
                source={require('../../assets/logo.png')}
                resizeMode={'contain'}
                style={{height: 150, alignSelf: 'center'}}
              />
              <Text style={{fontSize: 30, color: 'white', textAlign: 'center'}}>
                CONNECTING MILLIONS!
              </Text>
            </View>
            <View animation="fadeInRight" delay={1400} style={styles.inputView}>
              <TextInput
                placeholder="Enter your  UserName  "
                keyboardType="default"
                value={email}
                style={styles.inputStyle}
                onChangeText={(val) => {
                  updateEmail(val);
                }}
              />
            </View>
            <View animation="fadeInRight" delay={1400} style={styles.inputView}>
              <TextInput
                secureTextEntry={true}
                placeholder="password"
                value={password}
                style={styles.inputStyle}
                onChangeText={(val) => {
                  updatePmassword(val);
                }}
              />
            </View>
            <View animation="fadeInRight" delay={1400} style={styles.inputView}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  params.navigation.navigate('Forget');
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'right',
                    textDecorationLine: 'underline',
                  }}>
                  Forget Password
                </Text>
              </TouchableOpacity>
            </View>
            <View animation="fadeInRight" delay={1400} style={styles.inputView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  LoginAccount();
                }}>
                {data.isLoading ? (
                  <ActivityIndicator size={'large'} color={'white'} />
                ) : (
                  <Text style={[styles.buttonText]}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
            <View animation="fadeInRight" delay={1400} style={styles.inputView}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                  margin: 5,
                }}>
                or
              </Text>
            </View>
            <View animation="fadeInRight" delay={1400} style={styles.inputView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  params.navigation.navigate('CreateAccount');
                }}>
                <Text style={[styles.buttonText]}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
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
export default Login;
