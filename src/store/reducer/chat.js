import {ActionType} from '../actions';

const initialState = {
  chat: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_CHAT:
      return {...state, isLoading: true};

    case ActionType.GET_CHAT_SUCCESS:
      return {...state, isLoading: false};
    case ActionType.GET_CHAT_FAIL:
      return {...state, isLoading: false};

    case ActionType.ADD_CHAT:
      return {...state, isLoading: true};

    case ActionType.ADD_CHAT_SUCCESS:
      return {...state, isLoading: false, chat: action.payload};
    case ActionType.ADD_CHAT_FAIL:
      return {...state, isLoading: false};

    default:
      return state;
  }
};
