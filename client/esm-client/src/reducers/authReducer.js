import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  SEND_PASS_RESET_SUCCESS,
  SEND_PASS_RESET,
  SEND_PASS_RESET_ERROR,
  USER_ACCOUNT_CREATED,
} from "../actions/authActions";
// import storageListner from "../storageListener/localStorageListener";

const initialState = {
  isLoggingIn: false,
  isSigningUp: false,
  isLoading: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  signupError: false,
  logoutError: false,
  accountCreated: false,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  sendPassResetSuccess: false,
  sendPassResetError: false,
  profileID: localStorage.getItem("profileID"),
  user: JSON.parse(localStorage.getItem("userProfile"))
    ? JSON.parse(localStorage.getItem("userProfile"))
    : {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log("login request fired");
      return {
        ...state,
        isLoggingIn: true,
        isLoading: true,
        loginError: false,
      };
    case LOGIN_SUCCESS:
      console.log("login success fired", action.obj);
      return {
        ...state,
        isLoggingIn: false,
        isLoading: false,
        isAuthenticated: true,
        user: action.user,
        profileID: action.profileID,
      };
    case LOGIN_FAILURE:
      console.log("login failure fired");
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        isLoading: false,
        loginError: true,
      };

    case SIGN_UP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
        isLoading: true,
        signupError: false,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        isLoading: false,
        signupError: false,
        accountCreated: true,
        // isAuthenticated: true,
        // user: action.user,
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        isLoading: false,
        signupError: action.errMess,
      };

    case USER_ACCOUNT_CREATED:
      return {
        ...state,
        accountCreated: false,
      };

    case SEND_PASS_RESET:
      return {
        ...state,
        isLoading: true,
        sendPassResetSuccess: false,
        sendPassResetError: false,
      };

    case SEND_PASS_RESET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sendPassResetSuccess: true,
        sendPassResetError: false,
      };

    case SEND_PASS_RESET_ERROR:
      return {
        ...state,
        isLoading: false,
        sendPassResetSuccess: false,
        sendPassResetError: action.errMess,
      };

    case LOGOUT_REQUEST:
      return { ...state, isLoggingOut: true, logoutError: false };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("profileID");
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {},
      };

    case LOGOUT_FAILURE:
      return { ...state, isLoggingOut: false, logoutError: true };

    case VERIFY_REQUEST:
      return { ...state, isVerifying: true, verifyingError: false };

    case VERIFY_SUCCESS:
      return { ...state, isVerifying: false };
    default:
      return state;
  }
}
