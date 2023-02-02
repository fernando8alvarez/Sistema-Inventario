import {
 REGISTER_USER,
 LOGIN_USER,
 LOADING
} from "../Redux/actions"

const initialState = {
  message : [],
  user: [],
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
  case LOGIN_USER:
    return {
      ...state,
      user: [action.payload],
      loading: false,
    };

  default:
    return state;
  }
}