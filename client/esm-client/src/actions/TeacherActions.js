import { logoutUser } from "./authActions";
export const SUBMIT_TEST_REQUEST = "SUBMIT_TEST_REQUEST";
export const SUBMIT_TEST_SUCCESS = "SUBMIT_TEST_SUCCESS";
export const SUBMIT_TEST_FAILURE = "SUBMIT_TEST_FAILURE";

export const ASSIGNED_TEST_REQUEST = "ASSIGNED_TEST_REQUEST";
export const ASSIGNED_TEST_SUCCESS = "ASSIGNED_TEST_SUCCESS";
export const ASSIGNED_TEST_FAILURE = "ASSIGNED_TEST_FAILURE";

export const SET_TEST_CREATED_FALSE = "SET_TEST_CREATED_FALSE";

const requestSubmitTest = () => {
  return {
    type: SUBMIT_TEST_REQUEST,
  };
};

const receiveSubmitTest = (user, profileID) => {
  return {
    type: SUBMIT_TEST_SUCCESS,
  };
};

const submitTestError = () => {
  return {
    type: SUBMIT_TEST_FAILURE,
  };
};

const requestAssignedTest = () => {
  return {
    type: ASSIGNED_TEST_REQUEST,
  };
};

const receiveAssignedTest = (tests) => {
  return {
    type: ASSIGNED_TEST_SUCCESS,
    tests,
  };
};

const AssignedTestError = () => {
  return {
    type: ASSIGNED_TEST_FAILURE,
  };
};

const setTestCreatedFalse = () => {
  return {
    type: SET_TEST_CREATED_FALSE,
  };
};

export const submitTest = (values) => (dispatch) => {
  console.log(values);

  dispatch(requestSubmitTest());

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },

    body: JSON.stringify(values),
  };
  //console.log("Success:", values);
  fetch("/teacher/create-test", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data?.error?.name === "TokenExpiredError") {
        dispatch(logoutUser());
      } else {
        dispatch(receiveSubmitTest(data.user));
      }
    })
    .catch((error) => {
      //Do something with the error if you want!
      console.log(error);
      dispatch(submitTestError());
    });
};

export const fetchAssignedTests = (profileID) => async (dispatch) => {
  dispatch(requestAssignedTest());

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };

  await fetch(`/teacher/tests/${profileID}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        if (data?.error?.name === "TokenExpiredError") {
          dispatch(logoutUser());
        } else {
          dispatch(receiveAssignedTest(data.obj));
        }
        // history.push("/studentHome");
      }
    })
    .catch((error) => {
      //Do something with the error if you want!
      console.log(error);
      dispatch(AssignedTestError());
    });
};

export const testCreatedFalse = () => async (dispatch) => {
  dispatch(setTestCreatedFalse());
};
