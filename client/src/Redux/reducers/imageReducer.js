import {
  SHOW_ALL_IMAGE_REQUEST,
  SHOW_ALL_IMAGE_SUCCESS,
  SHOW_ALL_IMAGE_FAIL,
  CLEAR_ERRORS,
  ADD_IMAGE_FAIL,
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_RESET,
  IMAGE_REQUEST,
  IMAGE_SUCCESS,
  IMAGE_FAIL,
  EDIT_IMAGE_FAIL,
  EDIT_IMAGE_SUCCESS,
  EDIT_IMAGE_REQUEST,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../constants/imageConstants";

export const showallimage = (state = { allimages: [] }, action) => {
  switch (action.type) {
    case SHOW_ALL_IMAGE_REQUEST:
      return {
        loading: true,
        allimages: [],
      };
    case SHOW_ALL_IMAGE_SUCCESS:
      return {
        loading: false,
        allimages: action.payload.images,
        perpageitem: action.payload.perpageitem,
        filteredimagecount: action.payload.filteredimagecount,
      };
    case SHOW_ALL_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const showoneimage = (state = { image: {} }, action) => {
  switch (action.type) {
    case IMAGE_REQUEST:
      return {
        loading: true,
        image: {},
      };
    case IMAGE_SUCCESS:
      return {
        loading: false,
        image: action.payload.image,
      };
    case IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_IMAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };
    case ADD_IMAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_IMAGE_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const editimage = (state = {}, action) => {
  switch (action.type) {
    case EDIT_IMAGE_REQUEST:
      return {
        loading: true,
      };
    case EDIT_IMAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };
    case EDIT_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        logoutsuccess: true,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const forgotPassword = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
