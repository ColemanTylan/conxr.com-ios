import {login, post, singup, Get, put} from '../../utils/api-call';
import {actionDispatch} from '../../utils/return-obj';
import {ActionType} from '../actions';
import {Keyboard, Alert} from 'react-native';

export default class SearchAction {
  static SearchFirend(number, searchURl, searchData, username) {
    return (dispatch) => {
      Keyboard.dismiss();
      if (number === 1) {
        dispatch(actionDispatch(ActionType.RE_SEARCH));
      } else {
        dispatch(actionDispatch(ActionType.SEARCH));
        Get(searchURl)
          .then((success) => {
            var tempValue = [];
            console.log(success);
            // that is search that come from the api
            Get(`api/v1/add_friend/?user__username=${username}`).then(
              (friend) => {
                /// friend wiill the user friend
                console.log(friend);
                success.data.map((val) => {
                  if (friend.data.length) {
                    friend.data[0].friend_name.map((val2) => {
                      if (val2 == val.user_name) {
                        val.isFirend = true;
                      }
                    });
                  }
                  tempValue.push(val);
                });
                dispatch(actionDispatch(ActionType.SEARCH_SUCCESS, tempValue));
              },
            );

            // Actions.bottom();
          })
          .catch((error) => {
            actionDispatch(ActionType.SEARCH_FAIL), console.log(error);
          });
      }
    };
  }
}
