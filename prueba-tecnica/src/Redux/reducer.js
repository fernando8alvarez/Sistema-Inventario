import {
 REGISTER_USER,
 LOADING
} from "../Redux/actions"

const initialState = {
  message : [],
  loading: false
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      }
  case REGISTER_USER:
    return {
      ...state,
      message: [action.payload],
      loading: false
    };

  case 'ACTION_2':
    return {};

  default:
    return state;
  }
}