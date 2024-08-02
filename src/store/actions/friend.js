import {login, post, singup, Get, put, Recall} from '../../utils/api-call';
import {actionDispatch} from '../../utils/return-obj';
import {ActionType} from '../actions';
import {Keyboard, Alert} from 'react-native';
import CookieManager from '@react-native-community/cookies';
import SearchAction from './search';
export default class FriendAction {
  static AddFrirend(path, obj, data, username, id, url, number) {
    return (dispatch) => {
      dispatch(actionDispatch(ActionType.ADD_FRIEND));
      CookieManager.clearAll().then((success) => {});
      Keyboard.dismiss();

      Get(`api/v1/add_friend/?user__username=${data}`)
        .then((val) => {
          var already = false;
          val.data.forEach((element) => {
            if (element.friend_name[0] == username) {
              already = true;
            }
          });

          if (already == true) {
            alert('This Friend Is already in Your Firend List');
            actionDispatch(ActionType.ADD_FRIEND_FAIL);
          } else {
            Get(`api/v1/add_friend/?user__username=${data}`).then((val) => {
              if (val.data.length === 0) {
                post(path, obj, data).then((success) => {
                  dispatch(
                    actionDispatch(ActionType.ADD_FRIEND_SUCCESS, success.data),
                  );
                  dispatch(
                    SearchAction.SearchFirend(
                      2,
                      `searchapi/?search=${number}`,
                      number,
                      data,
                    ),
                  );
                });
              } else {
                var data1 = val.data[0].friend_name;
                var loginUserName = val.data[0].user_name;
                var loginUserId = val.data[0].user;
                data1.push(username);
                var sendDataValue = {
                  user: loginUserId,
                  friend_name: data1,
                };
                put(`friends/${loginUserName}/`, sendDataValue)
                  .then((val) => {
                    dispatch(
                      actionDispatch(
                        ActionType.ADD_FRIEND_SUCCESS,
                        val.data.friend_name,
                      ),
                    );
                    console.log('second Number', number);
                    dispatch(
                      SearchAction.SearchFirend(
                        2,
                        `searchapi/?search=${number}`,
                        number,
                        data,
                      ),
                    );
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            });
          }
        })
        .catch((error) => {
          actionDispatch(ActionType.ADD_FRIEND_FAIL), console.log(error);
          console.log(error.messaage);
        });
    };
  }

  static GetFriend(obj, fun, id) {
    console.log(obj, fun, 'pppp');
    return (dispatch) => {
      dispatch(actionDispatch(ActionType.FRIEND));
      Keyboard.dismiss();

      Get(obj)
        .then((success) => {
          fun(false);
          dispatch(actionDispatch(ActionType.FRIEND_SUCCESS, success.data));
        })
        .catch((error) => {
          fun(false);

          actionDispatch(ActionType.FRIEND_FAIL), alert(error);
        });
    };
  }
}
