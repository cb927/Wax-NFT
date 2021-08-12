import { SET_CURRENT_USER, USER_LOADING, SET_CURRENT_PAGE } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  waxAccount: "waxAccount",
  loading: false,
  currentPage: "home"
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        waxAccount: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
}
