export const UPDATE_ATTEMPT_TEST_REQUEST = "UPDATE_ATTEMPT_TEST_REQUEST";
export const UPDATE_ATTEMPT_TEST_SUCCESS = "UPDATE_ATTEMPT_TEST_SUCCESS";
export const UPDATE_ATTEMPT_TEST_FAILURE = "UPDATE_ATTEMPT_TEST_FAILURE";

const requestUpdateTimeSpent = () => {
  return {
    type: UPDATE_ATTEMPT_TEST_REQUEST,
  };
};

const receiveUpdateTimeSpent = (tests) => {
  return {
    type: UPDATE_ATTEMPT_TEST_SUCCESS,
    tests,
  };
};

const updateTimeSpentError = () => {
  return {
    type: UPDATE_ATTEMPT_TEST_FAILURE,
  };
};

export const updateTimeSpentByStudent = (values) => (dispatch) => {
  dispatch(requestUpdateTimeSpent());
  const {
    profileID,
    testName,
    completed,
    attemptedTime,
    totalTime,
    testID,
  } = values;

  const data = { profileID, testName, completed, attemptedTime, totalTime };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },

    body: JSON.stringify(data),
  };

  fetch(`/update-test-status/${testID}`, requestOptions)
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
