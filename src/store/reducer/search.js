import {ActionType} from '../actions';

const initialState = {
  search: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SEARCH:
      return {...state, isLoading: true};

    case ActionType.SEARCH_SUCCESS:
      return {...state, isLoading: false, search: action.payload};
    case ActionType.SEARCH_FAIL:
      return {...state, isLoading: false};

      case ActionType.RE_SEARCH:
        return {...state, isLoading: false,  search: [],
        };
  

    default:
      return state;
  }
};
