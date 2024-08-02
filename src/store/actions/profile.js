import {login, post, singup, Get, put} from '../../utils/api-call';
import {actionDispatch} from '../../utils/return-obj';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionType} from '../actions';
import {Keyboard, Alert} from 'react-native';
import CookieManager from '@react-native-community/cookies';
// import { ToastError } from "../../container/serviceType";
export default class ProfileAction {
  static GetProfile(obj, data) {
    return (dispatch) => {
      dispatch(actionDispatch(ActionType.PROFILE));
      Keyboard.dismiss();
      Get(obj, data)
        .then((success) => {
          dispatch(
            actionDispatch(ActionType.PROFILE_SUCCESS, success.data.profile),
          );

          // Actions.bottom();
        })

        .catch((error) => {
          dispatch(actionDispatch(ActionType.PROFILE_FAIL));

          console.log(error);
        });
    };
  }

  static UpdateProfie(obj, data) {
    return (dispatch) => {
      // console.log({obj,data});
      dispatch(actionDispatch(ActionType.UPDATE_PROFILE));
      Keyboard.dismiss();
      CookieManager.clearAll().then((success) => {});
      put(obj, data)
        .then((success) => {
          AsyncStorage.setItem('userData', JSON.stringify(success.data));

          dispatch(
            actionDispatch(ActionType.UPDATE_PROFILE_SUCCESS, success.data),
          );

          // Actions.bottom();
        })
        .catch((error) => {
          actionDispatch(ActionType.UPDATE_PROFILE_FAIL);
          console.log({error});
        });
    };
  }

  static GetUserProfile(obj, data) {
    return (dispatch) => {
      dispatch(actionDispatch(ActionType.GET_USER_PROFILE));
      Keyboard.dismiss();
      Get(obj, data)
        .then((success) => {
          dispatch(
            actionDispatch(
              ActionType.GET_USER_PROFILE_SUCCESS,
              success.data.profile,
            ),
          );

          // Actions.bottom();
        })
        .catch((error) => {
          dispatch(actionDispatch(ActionType.GET_USER_PROFILE_FAIL));
          console.log(error);
        });
    };
  }
}
