import {login, post, singup, Get, put1, AddPost} from '../../utils/api-call';
import {actionDispatch} from '../../utils/return-obj';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionType} from '../actions';
import {Keyboard, Alert} from 'react-native';
import CookieManager from '@react-native-community/cookies';
import {useSelector} from 'react-redux';

export default class PostAction {
  static AddPost(obj, data, id, navigation, tempdata) {
    return (dispatch) => {
      // console.log({obj, data, id});
      dispatch(actionDispatch(ActionType.ADD_POST));
      Keyboard.dismiss();
      CookieManager.clearAll().then((success) => {
        console.log('CookieManager.clearAll =>', success);
      });
      AddPost(obj, data, id)
        .then((success) => {
          let newDataTemp = [];
          let tempData = tempdata;
          let obj = success.data;
          newDataTemp.push(obj);
          var finalArray = [...newDataTemp, ...tempData];
          dispatch(actionDispatch(ActionType.ADD_POST_SUCCESS, finalArray));
          navigation(false);
          //   dispatch(
          //     actionDispatch(ActionType.ADD_POST_SUCCESS,),
          //   );
          //   Actions.pop();
          //   alert('Post Addeds')
        })
        .catch((error) => {
          console.log(error);
          navigation(false);
          alert('Error');
          dispatch(actionDispatch(ActionType.ADD_POST_FAIL));

          alert(error);
        });
    };
  }
  static GetPost(obj, data, sectionid, fun) {
    return (dispatch) => {
      dispatch(actionDispatch(ActionType.GET_POST));
      Keyboard.dismiss();

      Get(obj, data, sectionid)
        .then((success) => {
          fun(false);
          dispatch(
            actionDispatch(ActionType.GET_POST_SUCCESS, success.data.Posts),
          );
        })
        .catch((error) => {
          fun(false);

          actionDispatch(ActionType.GET_POST_FAIL), alert(error);
        });
    };
  }
}
