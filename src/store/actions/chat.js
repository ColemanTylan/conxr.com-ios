import {login, post, singup, Get} from '../../utils/api-call';
import {actionDispatch} from '../../utils/return-obj';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionType} from '../actions';
import {Keyboard, Alert} from 'react-native';
import CookieManager from '@react-native-community/cookies';

export default class ChatAction {
  static GetChat(path, obj) {
    return (dispatch) => {
      dispatch(actionDispatch(ActionType.GET_CHAT));
      Keyboard.dismiss();
      post(path, obj).then((success) => {
        CookieManager.get('buntoo.com').then((cookies) => {
          console.log('CookieManager.get =>', cookies);
          Get(`api/v1/profile/?user__username=${obj.username}`).then((val) => {
            AsyncStorage.setItem('token', success.data.key);
            AsyncStorage.setItem('cookies', cookies.sessionid.value);
            AsyncStorage.setItem('userData', JSON.stringify(val.data[0]));
            dispatch(
              actionDispatch(ActionType.GET_CHAT_SUCCESS, {
                token: success.data.key,
                userdata: val.data[0],
                cookies: cookies.sessionid.value,
              }),
            );
          });
        });
      })
    };
  }
  static AddChat(path, obj) {
    return (dispatch) => {
      dispatch(actionDispatch(ActionType.LOGIN));
      Keyboard.dismiss();
      post(path, obj).then((success) => {
        CookieManager.get('buntoo.com').then((cookies) => {
          console.log('CookieManager.get =>', cookies);
          Get(`api/v1/profile/?user__username=${obj.username}`).then((val) => {
            AsyncStorage.setItem('token', success.data.key);
            AsyncStorage.setItem('cookies', cookies.sessionid.value);
            AsyncStorage.setItem('userData', JSON.stringify(val.data[0]));
            dispatch(
              actionDispatch(ActionType.LOGIN_SUCCESS, {
                token: success.data.key,
                userdata: val.data[0],
                cookies: cookies.sessionid.value,
              }),
            );
          });
        });
      });
    };
  }
}
