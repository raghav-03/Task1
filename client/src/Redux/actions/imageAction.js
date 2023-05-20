import {
  SHOW_ALL_IMAGE_REQUEST,
  SHOW_ALL_IMAGE_SUCCESS,
  SHOW_ALL_IMAGE_FAIL,
  CLEAR_ERRORS,
  ADD_IMAGE_FAIL,
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_REQUEST,
  IMAGE_REQUEST,
  IMAGE_SUCCESS,
  IMAGE_FAIL,
  EDIT_IMAGE_FAIL,
  EDIT_IMAGE_SUCCESS,
  EDIT_IMAGE_REQUEST,
  DELETE_IMAGE_FAIL,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
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
import axios from "axios";

// Show all imgaes
export const imageaction =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SHOW_ALL_IMAGE_REQUEST,
      });
      let link = `/api/image/show/?keyword=${keyword}&page=${currentPage}`;
      console.log(link);
      const { data } = await axios.get(link);
      dispatch({
        type: SHOW_ALL_IMAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SHOW_ALL_IMAGE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const addimageaction = (imageData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_IMAGE_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    let link = `/api/image`;
    const { data } = await axios.post(link, imageData, config);
    dispatch({
      type: ADD_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_IMAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clearing Errors
export const clearerr = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const oneimageaction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: IMAGE_REQUEST,
    });
    let link = `/api/image/show/${id}`;
    console.log(link);
    const { data } = await axios.get(link);
    dispatch({
      type: IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: IMAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const editimageaction = (imageData, id) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_IMAGE_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    let link = `/api/image/edit/${id}`;
    const { data } = await axios.put(link, imageData, config);
    dispatch({
      type: EDIT_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_IMAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteimageaction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_IMAGE_REQUEST,
    });
    let link = `/api/image/delete/${id}`;
    const { data } = await axios.delete(link);
    dispatch({
      type: DELETE_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_IMAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const loadcredentials = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_REQUEST });

    const { data } = await axios.get(`/api/user/userdetail`);
    dispatch({ type: LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const loginaction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/user/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const registeraction =
  (name, email, password, avatar, confirmpassword) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/user/signup`,
        { name, email, password, avatar, confirmpassword },
        config
      );

      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const logoutaction = () => async (dispatch) => {
  try {
    await axios.get(`/api/user/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.payload.data.message,
    });
  }
};
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/user/forgot`, { email }, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const resetPassword =
  (token, password, cpassword) => async (dispatch) => {
    try {
      console.log("rgt");
      dispatch({ type: RESET_PASSWORD_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/user/resetpass/${token}`,
        { password, cpassword },
        config
      );

      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
