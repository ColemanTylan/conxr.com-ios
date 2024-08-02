import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {AuthAction} from '../store/actions';

function CreateAccount(params) {
  const data = useSelector((state) => state.AuthReducer);
  const [name, UpdateName] = useState('');

  const [email, updateEmail] = useState('');
  const [password, updatePmassword] = useState('');
  const [password2, ConfrimPassword] = useState('');

  const [loading, UpdateLoading] = useState(false);

  var dispatch = useDispatch();

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function CreateAccountSingup() {
    if ((email !== '' && password !== '', password2 !== '', name !== '')) {
      if (validateEmail(email)) {
        if (password.length > 8 && password.length < 15) {
          if (password2 == password) {
            dispatch(
              AuthAction.signUp('rest-auth/register/', {
                username: name,
                email,
                password1: password,
                password2: password2,
              }),
            );
          } else {
            alert('password not same match');
          }
        } else {
          alert(
            'The password  length much be greater then 8 and less then 15 .',
          );
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
          <View style={{marginTop: 25, justifyContent: 'center'}}>
            <View style={{marginBottom: 35}}>
              <Image
                source={require('../../assets/logo.png')}
                resizeMode={'contain'}
                style={{height: 120, alignSelf: 'center'}}
              />
              <Text style={{fontSize: 25, color: 'white', textAlign: 'center'}}>
                CONNECTING MILLIONS!
              </Text>
            </View>
            <View animation="fadeInRight" delay={1400} style={styles.inputView}>
              <TextInput
                placeholder="Name"
                value={name}
                style={styles.inputStyle}
                onChangeText={(val) => {
                  UpdateName(val);
                }}
              />
            </View>
            <View animation="fadeInRight" delay={1400} style={styles.inputView}>
              <TextInput
                placeholder="Enter Your Email "
                keyboardType="email-address"
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
              <TextInput
                secureTextEntry={true}
                placeholder="Confirm Password"
                value={password2}
                style={styles.inputStyle}
                onChangeText={(val) => {
                  ConfrimPassword(val);
                }}
              />
            </View>

            <View animation="fadeInRight" delay={1400} style={styles.inputView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  CreateAccountSingup();
                }}>
                {data.isLoading ? (
                  <ActivityIndicator size={'large'} color={'white'} />
                ) : (
                  <Text style={[styles.buttonText]}>CreateAccount</Text>
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
                  params.navigation.navigate('Login');
                }}>
                <Text style={[styles.buttonText]}>Login</Text>
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
    width: '85%',
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
export default CreateAccount;
