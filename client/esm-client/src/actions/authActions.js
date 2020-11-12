export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const SEND_PASS_RESET = "SEND_PASS_RESET";
export const SEND_PASS_RESET_ERROR = "SEND_PASS_RESET_ERROR";
export const SEND_PASS_RESET_SUCCESS = "SEND_PASS_RESET_SUCCESS";

export const USER_ACCOUNT_CREATED = "USER_ACCOUNT_CREATED";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user, profileID) => {
  return {
    type: LOGIN_SUCCESS,
    user,
    profileID,
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

const requestsignup = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

const receiveSignup = (user) => {
  return {
    type: SIGN_UP_SUCCESS,
    user,
  };
};

const signupError = (errMess) => {
  return {
    type: SIGN_UP_FAILURE,
    errMess,
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};

const sendingPassReset = () => {
  return {
    type: SEND_PASS_RESET,
  };
};

const sendPassResetError = (errMess) => {
  return {
    type: SEND_PASS_RESET_ERROR,
    errMess,
  };
};

const sendPassResetSuccess = () => {
  return {
    type: SEND_PASS_RESET_SUCCESS,
  };
};

const userAccountCreated = () => {
  return {
    type: USER_ACCOUNT_CREATED,
  };
};

export const loginUser = (values) => (dispatch) => {
  dispatch(requestLogin());

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },

    body: JSON.stringify(values),
  };

  fetch("/user/login", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", `Bearer ${data.token}`);
        localStorage.setItem("userProfile", JSON.stringify(data.payload.user));
        localStorage.setItem("profileID", data.payload.profileID);
        dispatch(receiveLogin(data.payload.user, data.payload.profileID));
        // history.push("/studentHome");
      }
    })
    .catch((error) => {
      //Do something with the error if you want!
      dispatch(loginError());
    });
};

export const signUpUser = (values) => (dispatch) => {
  dispatch(requestsignup());

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  };
  //console.log("Success:", values);
  fetch("/user/signup", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        // localStorage.setItem("token", `Bearer ${data.token}`);
        // localStorage.setItem('userProfile', JSON.stringify(data.payload.user));
        // localStorage.setItem('profileID', data.payload.profileID);
        dispatch(receiveSignup(data.user));
        //history.push("/studentHome");
      }
    })
    .catch((error) => {
      //Do something with the error if you want!
      console.log(error)
      dispatch(signupError());
    });
};

export const accountCreated = () => (dispatch) => {
  dispatch(userAccountCreated());
};

// export const signupUser = (displayName, email, password, password2) => dispatch => {
//   dispatch(requestsignup());
//   //verifying password and name.
//   if(displayName.length < 3){
//     return dispatch(signupError("Name must have atleast 3 characters."));
//   }

//   if(displayName.length > 50){
//     return dispatch(signupError("Name must have atmost 50 characters."));
//   }

//   if(!/^[a-zA-Z ]*$/.test(displayName)){
//     return dispatch(signupError("Name must contain only alphabets."));
//   }

//   if(password !== password2){
//     return dispatch(signupError("Passwords do not match"));
//   }

// };

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  dispatch(receiveLogout());
};

// export const verifyAuth = () => dispatch => {
//   dispatch(verifyRequest());
//   myFirebase.auth().onAuthStateChanged(user => {
//     if (user !== null) {
//       dispatch(receiveLogin(user));
//     }
//     dispatch(verifySuccess());
//   });
// };

// export const sendPasswordResetLink = (email) => dispatch => {
//   dispatch(sendingPassReset());
//   myFirebase.auth().sendPasswordResetEmail(email)
//   .then(()=>{
//     dispatch(sendPassResetSuccess());
//   })
//   .catch(error=>{
//     console.error(error);
//     switch(error.code){
//       case 'auth/invalid-email':
//         dispatch(sendPassResetError("Invalid email address."));
//         break;
//       case 'auth/user-not-found':
//         dispatch(sendPassResetError("User not found with the given email address."));
//         break;
//       default:
//         dispatch(sendPassResetError("Failed to send password reset email."));
//     }
//   })
// }
