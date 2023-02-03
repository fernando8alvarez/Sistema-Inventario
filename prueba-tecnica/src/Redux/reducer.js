import {
  REGISTER_USER,
  LOGIN_USER,
  LOADING,
  AUTHENTICATION,
  PRODUCT_LIST,
  CREATE_PRODUCT,
} from "../Redux/actions";

const initialState = {
  message: [],
  user: [],
  loading: false,
  isAuthenticated: false,
  productList: [],
  newProduct:[]
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER:
      return {
        ...state,
        message: [action.payload],
        loading: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: [action.payload],
        loading: false,
      };
    case AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        newProduct: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
