import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Input, Spinner} from 'native-base';
import Header from './Header';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {PostAction} from '../store/actions';
import * as Animatable from 'react-native-animatable';

function CardPost(params) {
  const [image, UpdateImage] = useState(null);
  const [video, UpdateVideo] = useState(null);
  const [postText, UpdatepostText] = useState(null);
  const [modalStatus, modalUpdate] = useState(false);

  const userData = useSelector((state) => state.AuthReducer.userdata);
  const postData = useSelector((state) => state.PostReducer);
  var form = new FormData();
  const [header, headerHigt] = useState(true);
  const dispatch = useDispatch();

  form.append('author', userData.user);
  form.append('content', postText == null ? ' ' : postText);
  // data.append('date_posted', );

  function ImagePickers() {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };

        UpdateImage(response);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  }

  function VideoPicker() {
    ImageCropPicker.openPicker({
      mediaType: 'video',
    }).then((video) => {
      UpdateVideo(video);
      console.log(video);
    });
  }

  function post() {
    console.log(image);

    // form.append(video)
    // const {path,mime}=video
    // const split = path.split('/');
    // console.log(split)
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
      const {uri, type, fileName} = image;

      form.append('img', {
        uri:
          Platform.OS === 'android'
            ? image.uri
            : image.uri.replace('file://', ''),
        name: 'photo.png',
        filename: `imageName.png`,
        type: type,
      });
    }

    // fetch('https://buntoo.com/api/v1/post/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     otherHeader: 'foo',
    //   },
    //   body: form,
    // })
    //   //  .then((res) => checkStatus(res))
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log('response' + JSON.stringify(res));
    //   })
    //   .catch((e) =>\
    //     console.log(
    //       e.message,
    //       '-------------------------------------------------',
    //       e,
    //     ),
    //   )
    //   .done();

    if (image == null && video == null && postText == null) {
      alert('You Must Enter the Task');
    } else {
      dispatch(
        PostAction.AddPost(
          'api/v1/post/',
          form,
          'multipart/form-data',
          params.navigation,
          postData.post,
        ),
      );
    }

    // })

    // RNFetchBlob.fetch('POST', 'https://buntoo.com/api/v1/post/', {
    //   // Authorization : "Bearer access-token",
    //   otherHeader : "foo",
    //   'Content-Type' : 'multipart/form-data',
    // }, [
    //   // element with property `filename` will be transformed into `file` in form data
    //   { name : 'avatar', filename : 'avatar.png', data: binaryDataInBase64},
    //   // custom content type
    //   { name : 'avatar-png', filename : 'avatar-png.png', type:'image/png', data: binaryDataInBase64},
    //   // part file from storage
    //   { name : 'avatar-foo', filename : 'avatar-foo.png', type:'image/foo', data: RNFetchBlob.wrap(path_to_a_file)},
    //   // elements without property `filename` will be sent as plain text
    //   { name : 'name', data : 'user'},
    //   { name : 'info', data : JSON.stringify({
    //     mail : 'example@example.com',
    //     tel : '12345678'
    //   })},
    // ]).then((resp) => {
    //   // ...
    // }).catch((err) => {
    //   // ...
    // })
  }
  return (
    <>
      <Header name="New Post" props={params} back={true} />
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
          <Image source={{uri: userData.image}} style={styles.Image} />
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    marginTop: 8,
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
export default CardPost;
