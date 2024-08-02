import {login, post, singup, Get} from '../../utils/api-call';
import {actionDispatch} from '../../utils/return-obj';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionType} from '../actions';
import {Keyboard, Alert} from 'react-native';
import CookieManager from '@react-native-community/cookies';

export default class AuthAction {
  static LoginState(path, obj) {
    return (dispatch) => {
      dispatch(actionDispatch(ActionType.LOGIN));
      Keyboard.dismiss();
      post(path, obj)
        .then((success) => {
          CookieManager.get('buntoo.com').then((cookies) => {
            console.log('CookieManager.get =>', cookies);
            Get(`api/v1/profile/?user__username=${obj.username}`).then(
              (val) => {
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
              },
            );
          });

          // Actions.bottom();
        })
        .catch((error) => {
          console.log(error.response, 'that error');
          console.log({error});
          if (error.response.data.email) {
            alert(error.response.data.email[0]);
          } else if (error.response.data.non_field_errors) {
            alert(error.response.data.non_field_errors[0]);
          } else if (error.response.data.password1) {
            alert(error.response.data.password1[0]);
          } else if (error.response.data.username) {
            alert(error.response.data.username[0]);
          }
          dispatch(actionDispatch(ActionType.LOGIN_FAIL));
        });
    };
  }

  static signUp(path, obj) {
    return (dispatch) => {
      dispatch(actionDispatch(ActionType.SIGNUP));
      CookieManager.clearAll();
      post(path, obj)
        .then((success) => {
          CookieManager.get('buntoo.com').then((cookies) => {
            Get(`api/v1/profile/?user__username=${obj.username}`).then(
              (val) => {
                AsyncStorage.setItem('token', success.data.key);
                AsyncStorage.setItem('cookies', cookies.sessionid.value);
                AsyncStorage.setItem('userData', JSON.stringify(val.data[0]));
                dispatch(
                  actionDispatch(ActionType.SIGNUP_SUCCESS, {
                    token: success.data.key,
                    userdata: val.data[0],
                    cookies: cookies.sessionid.value,
                  }),
                );
              },
            );
          });
        })

        .catch((error) => {
          console.log(error.response, 'that error');
          console.log({error});
          if (error.response.data.email) {
            alert(error.response.data.email[0]);
          } else if (error.response.data.password1) {
            alert(error.response.data.password1[0]);
          } else if (error.response.data.username) {
            alert(error.response.data.username[0]);
          }
          // alert(error);
          dispatch(actionDispatch(ActionType.SIGNUP_FAIL));
        });
    };
  }

  static userLoginDirect(data) {
    return (dispatch) => {
      dispatch(actionDispatch(ActionType.LOGIN_DIRECT_SUCCESS, data));
    };
  }
  static logout(data, path) {
    return (dispatch) => {
      dispatch(actionDispatch(ActionType.LOGOUT));

      Keyboard.dismiss();
      Get(data)
        .then((success) => {
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem('userData');
          CookieManager.clearAll().then((success) => {});
          dispatch(actionDispatch(ActionType.LOGOUT_SUCCESS));

          // Actions.bottom();
        })
        .catch((error) => {
          dispatch(actionDispatch(ActionType.LOGOUT_FAIL));

          console.log(error);
          alert(error);
        });
    };
  }

  // static resetPassword(obj) {
  //   return dispatch => {
  //     dispatch(actionDispatch(ActionType.FORGOT_PASSWORD));
  //     Get(`/user/forget/${obj}`)
  //       .then(success => {
  //         console.log(success);

  //         dispatch(
  //           actionDispatch(
  //             ActionType.FORGOT_PASSWORD_SUCCESS,
  //             success,
  //             Keyboard.dismiss(),
  //           ),

  //           Alert.alert('Success', success.errorMessage, [
  //             {
  //               text: 'OK',
  //               onPress: () => {
  //                 Actions.verfication({email: obj});
  //               },
  //             },
  //           ]),
  //         );
  //       })
  //       .catch(error => {
  //         console.log({error});
  //         Alert.alert('Error', `${error.response.data.status}`);

  //         dispatch(actionDispatch(ActionType.FORGOT_PASSWORD_FAIL));
  //       });
  //   };
  // }

  // static verficationcode = (obj, email) => async (dispatch, state) => {
  //   console.log(email);
  //   dispatch(actionDispatch(ActionType.VERIFY));
  //   post('/user/forget/verify', obj)
  //     .then(success => {
  //       dispatch(actionDispatch(ActionType.VERIFY_SUCCESS));
  //       Actions.changepassword({email});
  //     })
  //     .catch(error => {
  //       console.log({error});
  //       Alert.alert('Alert', error.response.data.status);
  //       dispatch(actionDispatch(ActionType.VERIFY_FAIL));
  //     });
  // };

  // static LogOut = () => async (dispatch, state) => {
  //   dispatch(actionDispatch(ActionType.LOGOUT));
  //   if (state().authReducer.user !== null) {
  //     AsyncStorage.removeItem('user');
  //     dispatch(actionDispatch(ActionType.LOGOUT_SUCCESS));
  //     Actions.login();
  //   } else {
  //     dispatch(actionDispatch(ActionType.LOGOUT_SUCCESS));
  //     Actions.login();
  //   }
  // };

  // static isLoggedIn = username => async dispatch => {
  //   if (!username || username === '') {
  //     let data = AsyncStorage.getItem('user');
  //     if (!data) {
  //       dispatch(AuthAction.LogOut());
  //     } else {
  //       data = JSON.parse(data);
  //       dispatch(actionDispatch(ActionType.LOGIN_SUCCESS, data));
  //     }
  //   }
  // };

  // static Updatepassword = obj => async (dispatch, state) => {
  //   console.log({obj});
  //   dispatch(actionDispatch(ActionType.UPDATE_PASSWORD));
  //   post('/user/forget/password/update', obj)
  //     .then(success => {
  //       dispatch(actionDispatch(ActionType.UPDATE_PASSWORD_SUCCESS));
  //       Actions.login();
  //     })
  //     .catch(error => {
  //       console.log({error});
  //       Alert.alert('Alert', error.response.data.status);
  //       dispatch(actionDispatch(ActionType.UPDATE_PASSWORD_FAIL));
  //     });
  // };
}
