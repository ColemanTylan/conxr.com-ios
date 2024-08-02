import {ActionType} from '../actions';

const initialState = {
  usertoken: '',
  userdata: [],
  isLoading: false,
  UpdateisLoading: false,
  cookies: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {...state, isLoading: true};

    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usertoken: action.payload.token,
        userdata: action.payload.userdata,
        cookies: action.payload.cookies,
      };

    case ActionType.LOGIN_FAIL:
      return {...state, isLoading: false};

    case ActionType.LOGIN_DIRECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usertoken: action.payload.token,
        userdata: action.payload.userdata,
        cookies: action.payload.cookies,
      };

    // Update password

    case ActionType.UPDATE_PASSWORD:
      return {...state, isLoading: true};

    case ActionType.UPDATE_PASSWORD_SUCCESS:
      return {...state, isLoading: false};

    case ActionType.UPDATE_PASSWORD_FAIL:
      return {...state, isLoading: false};

    // LOGOUT

    case ActionType.LOGOUT:
      return {...state, isLoading: true};

    case ActionType.LOGOUT_SUCCESS:
      return {...state, isLoading: false, userdata: initialState.userdata};
    case ActionType.LOGOUT_FAIL:
      return {...state, isLoading: false};

    // SINGUP

    case ActionType.SIGNUP:
      return {...state, isLoading: true};

    case ActionType.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usertoken: action.payload.usertoken,
        userdata: action.payload.userdata,
        cookies: action.payload.cookies,
      };
    case ActionType.SIGNUP_FAIL:
      return {...state, cookie: '', isLoading: false};

    // Verifiy

    case ActionType.VERIFY:
      return {...state, isLoading: true};

    case ActionType.VERIFY_SUCCESS:
      return {...state, isLoading: false};

    case ActionType.VERIFY_FAIL:
      return {...state, isLoading: false};

    case ActionType.UPDATE_PROFILE:
      return {...state, UpdateisLoading: true};

    case ActionType.UPDATE_PROFILE_SUCCESS:
      return {...state, UpdateisLoading: false, userdata: action.payload};

    case ActionType.UPDATE_PROFILE_FAIL:
      return {...state, UpdateisLoading: false};

    default:
      return state;
  }
};
