import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Header from '../Componets/Header';
import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import AuthAction from '../store/actions/auth';
import ImageCropPicker from 'react-native-image-crop-picker';
import ProfileAction from '../store/actions/profile';
import ImageLoader from '../Componets/image';
function Profile(params) {
  var dispatch = useDispatch();
  const userData = useSelector((state) => state.AuthReducer.userdata);

  const [image, UpdateImage] = useState(null);

  var form = new FormData();
  function Logout() {
    dispatch(AuthAction.logout('logout'));
  }

  function UpdateImageUser(data) {
    if (data !== null) {
      const {path, mime} = data;
      console.log(data, 'data ser');
      const split = mime.split('/');
      form.append('user', userData.user);
      form.append('image', {
        uri: Platform.OS === 'android' ? path : path.replace('file://', ''),
        name: 'photo.png',
        filename: `imageName.png`,
        type: mime,
      });
    }
    console.log(form, 'form');

    dispatch(
      ProfileAction.UpdateProfie(`profiledetail/${userData.user_name}/`, form),
    );
  }

  async function ImagePickers() {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      if (
        (permission[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
          'granted',
        permission[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted')
      ) {
        ImageCropPicker.openPicker({
          mediaType: 'photo',
          maxFiles: 1,
        })
          .then((val) => {
            UpdateImageUser(val);
            console.log(val);
          })
          .catch((error) => {
            console.log(error);
            alert('open The Permissionww');
          });

        // ImageCropPicker.openPicker({mediaType: 'photo'}, (response) => {
        //   console.log('Response = ', response);

        //   if (response.didCancel) {
        //     console.log('User cancelled image picker');
        //   } else if (response.error) {
        //     console.log('ImagePicker Error: ', response.error);
        //   } else if (response.customButton) {
        //     console.log('User tapped custom button: ', response.customButton);
        //   } else {
        //     UpdateImage(response);
        //   }
        // });
      } else {
        console.log(';dsssd');
        alert('Permission Error 2q');
      }
    }
  }

  return (
    <SafeAreaView>
      <Header props={params} back={false} name="Profile" />
      <ImageBackground
        style={{
          paddingBottom: 60,
          paddingTop: 30,
        }}
        blurRadius={10}
        source={{
          uri:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDw0NDysZFRkrKy0rLSsrKystLSstLTcrNystKy03LSs3NzcrNys3Kzc3LS0rKy0rKzctLS03KysrK//AABEIALEBHAMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAAAAQIDBAf/xAAYEAEBAQEBAAAAAAAAAAAAAAAAAQIREv/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMFBP/EABgRAQEBAQEAAAAAAAAAAAAAAAABEQIS/9oADAMBAAIRAxEAPwDzw4Rx9zx1RUTFQZq4vKIvKsVplrlllrl0jl01y1wyy1w6Ry6a5aZZ5aZdI4dLiihtuVMyhiAAACMUElTKixGmemmmemK6cstMtNdMtMV35ZaZaa6Zacq7cs9M600isOkZ1NXUVHSFUqqUaBAIGZHFFRUTFQZq4vKIvKsVplrlllpluOfTbLXLHLXNdY49NstMsstMukcOmkVERbTlTMgqGAABU+kBUqaaixNZ6XpnpmuvLPTLTTVZac67cs9MtNNM9OdduWemdXUVh1iaiqqajcKpMkaBAIGCMFRURFSqlXFxnKuVWK1zWmaxlaZrUrnY3zWmaxzWma6SuXUb5rTNYZrTOnSVy6jeVUrKaVK3K5WNZTZyn1WMWE+h6ExRWp9FaauHam0WouktakGqz1T1pnqsWuvMTqs9VWqy1XO12kTqs9VWqz1XO11kTUVVqLWXSJqadTUbgIEKCARQcSYKVEHFRpKqVnKqUZsaytJWMq5VYsbZrXNc8rTOm5XOx0Z0uac800mnSVzsdE0qaYTSpprXO8t5o/TGaVNNax5a+h1l6P0anlp6L0z9JujVnLS6RdJukXTOtTlV0zuiukXTNrpINVnqjWkWudrrIWqi0WotZbkFqLTtRajpILU9FpI0KQtLqKZAARkEVXTSaoqVUqJTio1lVKylVKrNjaVcrGVUoxY3mlzTCVU01KxY6JpU0wmlTTcrF5bzRzTGaP0us+W3oemPoel1PLX0V0z9FdJq+Wl0m6Z3SbpNanK7pF0m6RdM2tTlVqLStRay3IdqLRai1G5DtTaLU2o2C6CRQCCKB0gABAUzSYijlT0KNJTlZyqlGcaSqlZSqlVLG0qpWMqpVYsbSnNMZo5pdZxv6P0x9D0up5bej9MfQ9Gnlr6K6Z+i9GnlpdJukXRXSauKtTam1NqNSKtTam0rUakO1NpWlajWC0gXRoAiQMEBTIdIACCKZpAKNI6qL6Op6fRFnKz6fVTGkqpWUp9NTGsp9ZdPq6mNen6ZdHRMa+h6Z9L0GNel1n0dDF9K1HS6auLtK1HS6i4rpdLpdFw7S6XS6imQIU+kQRTBAAB0dAh1Jin0EAPppHQV0+pHRFdPqejoL6Op6OqmL6fUdHTUxfR1HT6GL6Oo6Ohi+l1PS6GL6XU9HTTFdLqejouH0dT0dRT6XS6AMJ6OgY6QFPoSYAAAQIIYYIBhgjDAZAD6OkFFdHUn0FdHU9HQV0J6OiK6Op6Ogro6no6Cujqejop9HS6QK6XSAGCCAAIMMEBcMEBMMEAwgQRowQAwQBQSAUCChggIZpAKCejoYoJ6OhigkdDFEXQBgggYIKpgiQMEAMEAMEAMEAAIwAIwAIwAIAYIwAAAAAAAAAAAAAAAAAAAAgBgjAAgBggBggBggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQB//2Q==',
        }}>
        <View>
          <View style={{alignSelf: 'center'}}>
            <View style={styles.profileImage}>
              <ImageLoader
                source={{
                  uri: userData.image,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.add}>
              <TouchableOpacity
                onPress={() => {
                  ImagePickers();
                }}>
                <Icon
                  name="camera"
                  size={48}
                  color="#DFD8C8"
                  type="EvilIcons"
                  style={{marginTop: 6, marginLeft: 2, color: 'white'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      <TouchableOpacity
        onPress={() => {
          params.navigation.navigate('Freind');
        }}>
        <Text style={styles.textsize}> Connections</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          params.navigation.navigate('AddFreind');
        }}>
        <Text style={styles.textsize}> Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Logout();
        }}>
        <Text style={styles.textsize}> Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textsize: {
    fontSize: 20,
    borderWidth: 0,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 4,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: 'white',
  },
  dm: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#34FFB9',
    position: 'absolute',
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: 'transparent',
    elevation: 4,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    // width:'80%',
    // height:'30%'
  },
  container: {
    flex: 1,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
});
export default Profile;
