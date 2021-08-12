import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, SET_CURRENT_PAGE } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// User Login
export const loginUser = waxAccount => dispatch => {
  dispatch(setCurrentUser(waxAccount));
  localStorage.setItem("waxAccount", waxAccount)
};

export const setCurrentUser = waxAccount => {
  return {
    type: SET_CURRENT_USER,
    payload: waxAccount
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Set currentPage
export const setPage = currentPage => dispatch => {
  dispatch(setCurrentPage(currentPage));
}

export const setCurrentPage = currentPage => {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage
  };
};