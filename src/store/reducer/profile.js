import { ActionType } from '../actions';

const initialState = {
  userprofile: [],
  isLoading: false,
  UpdateisLoading: false,
  userprofile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.PROFILE:
      return { ...state, isLoading: true };

    case ActionType.PROFILE_SUCCESS:
      return { ...state, isLoading: false, userprofile: action.payload };

    case ActionType.GET_USER_PROFILE:
      return { ...state, isLoading: false };



    case ActionType.GET_USER_PROFILE_SUCCESS:
      return { ...state, isLoading: false, userprofile: action.payload };


    case ActionType.GET_USER_PROFILE_FAIL:
      return { ...state, isLoading: false };



    default:
      return state;
  }
};
