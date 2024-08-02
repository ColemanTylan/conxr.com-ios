import {ActionType} from '../actions';

const initialState = {
  friend: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_FRIEND:
      return {...state, isLoading: true};

    case ActionType.ADD_FRIEND_SUCCESS:
      return {...state, isLoading: false};
    case ActionType.ADD_FRIEND_FAIL:
      return {...state, isLoading: false};

    case ActionType.FRIEND:
      return {...state, isLoading: true};

    case ActionType.FRIEND_SUCCESS:
      return {...state, isLoading: false, friend: action.payload};
    case ActionType.FRIEND_FAIL:
      return {...state, isLoading: false};

    default:
      return state;
  }
};
