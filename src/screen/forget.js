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

function Forget(params) {
  const [name, UpdateName] = useState('');

  const [email, updateEmail] = useState('');
  const [password, updatePmassword] = useState('');
  const [password2, ConfrimPassword] = useState('');

  const [loading, UpdateLoading] = useState(false);

  return (
    <ImageBackground
      source={require('../../assets/earth.jpg')}
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        alignSelf: 'center',
      }}>
        <View style={{marginTop:60}}>

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
      <Text style={{fontSize: 25, color: 'white', textAlign: 'center',marginBottom:20,padding:10}}>
        Please enter your email. We will send a verification email shortly.{' '}
      </Text>

      <Animatable.View
        animation="fadeInRight"
        delay={1400}
        style={styles.inputView}>
        <TextInput
          placeholder="email"
          value={name}
          keyboardType={'email-address'}
          style={styles.inputStyle}
          onChangeText={(val) => {
            UpdateName(val);
          }}
        />
      </Animatable.View>

      <Animatable.View
        animation="fadeInRight"
        delay={1400}
        style={styles.inputView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            params.navigation.navigate('Login');
          }}>
          {loading ? (
            <ActivityIndicator size={'large'} color={'white'} />
          ) : (
            <Text style={[styles.buttonText]}>Forget</Text>
          )}
        </TouchableOpacity>
      </Animatable.View>


      <Animatable.View
        animation="fadeInRight"
        delay={1400}
        style={styles.inputView}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            params.navigation.popToTop('');
          }}>
         
            <Text style={[styles.buttonText,{textDecorationLine:'underline'}]}>Back</Text>
         
        </TouchableOpacity>
      </Animatable.View>
        </View>

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
    height: 20,
    width: '85%',
    padding: 40,
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
export default Forget;
