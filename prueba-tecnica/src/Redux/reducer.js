import {
  REGISTER_USER,
  LOGIN_USER,
  LOADING,
  AUTHENTICATION,
  PRODUCT_LIST,
  CREATE_PRODUCT,
  CHECK_USER,
  SAVE_USER,
  EDIT_PRODUCT,
  MODIFY_PRODUCT,
} from "../Redux/actions";

const initialState = {
  message: [],
  user: [],
  UserDetail: [],
  loading: false,
  isAuthenticated: false,
  productList: [],
  message2: [],
  productToEdit: [],
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
    case CHECK_USER:
      return {
        ...state,
        UserDetail: [action.payload],
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
        message2: [action.payload],
        loading: false,
      };
    case SAVE_USER:
      return {
        ...state,
        user: [action.payload],
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        productToEdit: [action.payload],
      };
    case MODIFY_PRODUCT:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
