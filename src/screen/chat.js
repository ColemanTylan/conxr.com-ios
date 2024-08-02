import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Header from '../Componets/Header';
import {
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native-gesture-handler';
import {Icon} from 'native-base';
import {ChatAction} from '../store/actions';
import {Get} from '../utils/api-call';
import {connect} from 'react-redux';
import Axios from 'axios';
import CookieManager from '@react-native-community/cookies';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherUserName: null,

      data: [],
      message: '',
      otherUserId: null,
    };
  }
  componentDidMount() {
    var props = this.props;

    this.setState(
      {
        otherUserName: props.route.params.userName,
      },
      () => {
        Axios.get(
          `https://buntoo.com/api/v1/add_friend/?user__username=${this.state.otherUserName}`,
        ).then((val) => {
          const senderUserId = val;
          var props = this.props;

          this.setState(
            {
              otherUserId: senderUserId,
            },
            () => {
              Axios.get(
                `https://buntoo.com/api/messages/${senderUserId.data[0].user}/${props.userId.userdata.user}`,
              ).then((val) => {
                this.setState({
                  data: val.data.messages,
                });
              });
            },
          );
        });
      },
    );
  }

  sendMessage = () => {
    const sendMessage = this.props.addChat;

    if (this.state.message === '') {
      alert('Enter the Message');
    } else {
      console.log(this.state);
      CookieManager.clearAll();
      Axios.post('https://buntoo.com/chatapi/', {
        sender: this.props.userId.userdata.user,
        receiver: this.state.otherUserId.data[0].user,
        message: this.state.message,
      }).then((val) => {
        Keyboard.dismiss();
        var chatArray = this.state.data;
        chatArray.push(val.data);
        this.setState({
          data: chatArray,
          message: '',
        });
      });
    }
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Header name="Chat Screen" props={this.props} back={true} />
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}>
          <FlatList
            ref={(ref) => (this.flatList = ref)}
            style={{marginBottom: 3}}
            data={this.state.data}
            onContentSizeChange={() =>
              this.flatList.scrollToEnd({animated: true})
            }
            onLayout={() => this.flatList.scrollToEnd({animated: true})}
            renderItem={({item}) => {
              if (item.sender == this.props.userId.userdata.user_name) {
                return (
                  <View
                    key={Math.random()}
                    style={{
                      paddingTop: 5,
                      marginTop: 20,
                      paddingBottom: 5,
                      flex: 1,
                      width: '60%',
                      justifyContent: 'flex-end',
                      backgroundColor: 'rgba(241, 241, 242, 0.95)',
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      borderRadius: 50,
                    }}>
                    <Text
                      style={{
                        padding: 5,
                        marginLeft: 10,
                        fontSize: 16,
                        color: 'rgb(29, 118, 199)',
                      }}>
                      {item.message}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View
                    key={Math.random()}
                    style={{
                      paddingTop: 5,
                      marginTop: 20,
                      paddingBottom: 5,
                      flex: 1,
                      width: '55%',
                      justifyContent: 'flex-start',
                      backgroundColor: 'rgb(29, 118, 199)',
                      alignSelf: 'flex-start',
                      marginLeft: 5,
                      borderRadius: 50,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          padding: 5,
                          marginLeft: 10,
                          fontSize: 16,
                          color: 'white',
                        }}>
                        {item.message}
                      </Text>
                    </View>
                  </View>
                );
              }
            }}
            keyExtractor={(item) => item.id}
          />
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              // alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder="Enter the message"
              value={this.state.message}
              onChangeText={(val) => {
                this.setState({
                  message: val,
                });
              }}
              style={{
                borderWidth: 1,
                borderRadius: 8,
                marginLeft: 3,
                width: '87%',
                paddingBottom: 6,
                marginBottom: 5,
              }}
            />
            <TouchableOpacity
              onPress={(val) => {
                this.sendMessage();
              }}>
              <Image
                resizeMode={'contain'}
                source={require('../../assets/logo.png')}
                style={
                  //----------add this line------------------------//

                  {height: 40, width: 50}
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = (state) => ({
  userId: state.AuthReducer,
});
const mapDispatchToProps = (dispatch) => ({
  addChat: (obj, token) => dispatch(ChatAction.AddChat(obj, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
