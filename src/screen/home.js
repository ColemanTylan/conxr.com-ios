import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Modal,
  Text,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Dimensions,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../Componets/Header';
import {useDispatch, useSelector} from 'react-redux';
import {AuthAction, PostAction} from '../store/actions';
import ImageLoader from '../Componets/image';
import moment from 'moment';
import VideoPlayer from 'react-native-video-player';
import {Input, Spinner} from 'native-base';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';

function Home(params) {
  const {height, width} = Dimensions.get('screen');
  const data = useSelector((state) => state.PostReducer.post);
  const userData = useSelector((state) => state.AuthReducer);
  const [image, UpdateImage] = useState(null);
  const [video, UpdateVideo] = useState(null);
  const [postText, UpdatepostText] = useState(null);
  const [modalStatus, modalUpdate] = useState(false);
  const [Fetching, UpdateFetch] = useState(false);

  const postData = useSelector((state) => state.PostReducer);
  var form = new FormData();
  const [header, headerHigt] = useState(true);
  const dispatch = useDispatch();

  form.append('author', userData.userdata.user);
  form.append('content', postText == null ? ' ' : postText);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      // ...text-14" ><strong>Discount 50%
      dispatch(
        PostAction.GetPost('posts_list/', '', userData.cookies, UpdateFetch),
      );
    }
    fetchData();
  }, []);

  function getPost() {
    UpdateFetch(true);
    dispatch(
      PostAction.GetPost('posts_list/', '', userData.cookies, UpdateFetch),
    );
  }

  function UpdateModuleView() {
    modalUpdate(false);
    UpdateImage(null);
    UpdateVideo(null);
    UpdatepostText(null);
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
            UpdateImage(val);
            console.log(val);
          })
          .catch((error) => {
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

  async function VideoPicker() {
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
          mediaType: 'video',
        })
          .then((video) => {
            UpdateVideo(video);
            console.log(video);
          })
          .catch((error) => {
            alert('open The Permission');
          });
      } else {
        console.log(1, ';dsssd');

        alert('Permission Error');
      }
    }
  }

  function post() {
    if (video !== null) {
      const {path, mime} = video;
      const split = mime.split('/');
      console.log(split);
      form.append('video', {
        name: `imageName.${split[1]}`,
        filename: `imageName.${split[1]}`,

        uri: Platform.OS === 'android' ? path : path.replace('file://', ''),
        type: mime,
      });
    }

    if (image !== null) {
      const {path, mime} = image;
      const split = mime.split('/');

      form.append('img', {
        uri: Platform.OS === 'android' ? path : path.replace('file://', ''),
        name: 'photo.png',
        filename: `imageName.png`,
        type: mime,
      });
    }

    if (image == null && video == null && postText == null) {
      alert('You Must Enter the Task');
    } else {
      dispatch(
        PostAction.AddPost(
          'api/v1/post/',
          form,
          'multipart/form-data',
          UpdateModuleView,
          postData.post,
        ),
      );
    }
  }
  var inputEl = useRef(null);
  function ModalVisable() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalStatus}
        onRequestClose={() => {
          modalUpdate(false);
          UpdateModuleView();
        }}>
        <Header
          name="New Post"
          props={params}
          back={true}
          type={1}
          onPress={modalUpdate}
        />
        <View style={styles.container}>
          {/* <Animatable.View animation="slideOutUp" delay={200}
      onAnimationEnd={() => {
        headerHigt(false)
        console.log('Animatyion End')
      }}
      style={{
        position: 'absolute',
        bottom: 430,
        width: '100%',
        zIndex: 1,
      }}> */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: userData.userdata.image}}
              style={styles.Image}
            />
            {/* <Text style={{marginTop:35, marginLeft:10}}>Hey, share something..</Text> */}

            <Input
              style={{
                marginTop: 15,
                marginLeft: 10,
                borderWidth: 1,
                borderColor: '#dddddd',
                borderRadius: 4,
              }}
              onChangeText={(v) => {
                UpdatepostText(v);
              }}
              placeholder="Hey, share something.."
            />
            <View style={styles.inputView1}>
              {postData.isLoading ? (
                <Spinner color="red" />
              ) : (
                <TouchableOpacity
                  disabled={
                    image == null &&
                    video == null &&
                    (postText == null || postText == '')
                      ? true
                      : false
                  }
                  style={
                    (styles.button,
                    {
                      backgroundColor:
                        image == null &&
                        video == null &&
                        (postText == null || postText == '')
                          ? '#dddddd'
                          : 'rgb(29, 118, 199)',
                      margin: 5,
                      padding: 10,
                      borderRadius: 5,
                      justifyContent: 'center',
                    })
                  }
                  onPress={() => {
                    post();
                  }}>
                  <Text style={[styles.buttonText]}>Post</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.line}>
            <TouchableOpacity
              onPress={() => {
                ImagePickers();
              }}
              style={{
                backgroundColor: 'rgb(29, 118, 199)',
                height: 50,
                margin: 10,
                justifyContent: 'center',
                padding: 5,
              }}>
              <Text style={{color: 'white', fontSize: 20}}>
                {' '}
                Add Picture {image !== null ? '1 select' : null}{' '}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                VideoPicker();
              }}
              style={{
                backgroundColor: 'rgb(29, 118, 199)',
                height: 50,
                margin: 10,
                justifyContent: 'center',
                padding: 5,
              }}>
              <Text style={{color: 'white', fontSize: 20}}>
                {' '}
                Add Video {video !== null ? '1 select' : null}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <>
      {modalStatus ? ModalVisable() : null}
      <SafeAreaView style={{flex: 1}}>
        <Header name="Home Screen" props={params} back={false} />

        <TouchableOpacity
          onPress={() => {
            modalUpdate(true);
          }}
          style={{
            marginTop: 5,
            width: '98%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ImageLoader
            source={{uri: userData.userdata.image}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              justifyContent: 'center',
              marginLeft: 10,
            }}
          />
          <Text
            style={{
              color: 'gray',
              fontSize: 23,
              marginLeft: 10,
              borderWidth: 1,
              padding: 5,
              borderRadius: 22,
              width: '78%',
              borderColor: 'gray',
            }}>
            {' '}
            What's on your mind?
          </Text>
        </TouchableOpacity>

        <View
          style={{
            borderTopWidth: 1,
            marginTop: 10,
            borderColor: 'rgb(221, 223, 226)',
            width: '98%',
            alignSelf: 'center',
          }}
        />

        <FlatList
          data={data}
          onRefresh={() => getPost()}
          refreshing={Fetching}
          renderItem={({item}) => {
            return (
              <SafeAreaView
                style={{
                  flex: 1,
                  paddingTop: 5,
                  marginTop: 5,
                  paddingBottom: 5,
                  width: '97%',
                  alignSelf: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    // source={require('../../assets/logo.png')}
                    // resizeMode={'center'}
                    resizeMethod={'scale'}
                    source={{
                      uri:
                        item.author_name === userData.userdata.user_name
                          ? userData.userdata.image ===
                            'https://buntoo.com/media/default.png'
                            ? 'https://buntoo.com/static/trading/images/lg.png'
                            : userData.userdata.image
                          : item.author_image,
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      justifyContent: 'center',
                      marginLeft: 10,
                      borderWidth: 1,
                    }}
                  />

                  <View>
                    <Text style={{marginLeft: 10, fontSize: 15}}>
                      {item.author_name}
                    </Text>
                    <Text style={{marginLeft: 10, fontSize: 14}}>
                      lastactivity:
                      {moment(item.date_posted).format('MMMM Do , h:mm A')}
                    </Text>
                  </View>
                </View>
                <Text style={{paddingLeft: 20, marginTop: 15, fontSize: 18}}>
                  {item.content}
                </Text>

                {item.img !== null ? (
                  <ImageLoader
                    source={{
                      uri: item.img !== null ? item.img : null,
                    }}
                    resizeMode={'cover'}
                    style={{
                      height: height * 0.5,
                      width: width * 0.96,
                      borderRadius: 2,
                      marginTop: 4,
                    }}
                  />
                ) : null}
                {item.video !== null ? (
                  <VideoPlayer
                    ref={(ref) => {
                      inputEl = ref;
                    }}
                    style={{marginTop: 5, marginBottom: 5}}
                    video={{
                      uri: item.video,
                    }}
                    videoWidth={1600}
                    videoHeight={900}
                    hideControlsOnStart={false}
                    resizeMode={'cover'}
                    thumbnail={{
                      uri: 'https://buntoo.com/static/trading/images/lg.png',
                    }}
                  />
                ) : null}

                <View
                  style={{
                    borderTopWidth: 5,
                    marginTop: 10,
                    borderColor: 'rgb(221, 223, 226)',
                    width: '98%',
                    alignSelf: 'center',
                  }}></View>
              </SafeAreaView>
            );
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',

    flex: 1,
  },
  Image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  line: {
    flexDirection: 'row',
    color: 'red',
    marginTop: 10,
    alignSelf: 'center',
  },
  inputView: {
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'white',
  },
  inputView1: {
    marginTop: 10,
    backgroundColor: 'white',
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
    // height: 40,
    // width: '70%',
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
    fontSize: 20,

    color: 'black',
    color: 'white',
    textAlign: 'center',
  },
});
export default Home;
