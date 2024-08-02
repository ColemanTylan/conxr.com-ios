import {ActionType} from '../actions';

const initialState = {
  post: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_POST:
      return {...state, isLoading: true};

    case ActionType.ADD_POST_SUCCESS:
      return {...state, isLoading: false, post: action.payload};

    case ActionType.ADD_POST_FAIL:
      return {...state, isLoading: false};

    case ActionType.GET_POST:
      return {...state, isLoading: true};

    case ActionType.GET_POST_SUCCESS:
      return {...state, isLoading: false, post: action.payload};

    case ActionType.GET_POST_FAIL:
      return {...state, isLoading: false};

    default:
      return state;
  }
};
