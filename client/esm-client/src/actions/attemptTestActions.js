import { logoutUser } from "./authActions";
export const UPDATE_ATTEMPT_TEST_REQUEST = "UPDATE_ATTEMPT_TEST_REQUEST";
export const UPDATE_ATTEMPT_TEST_SUCCESS = "UPDATE_ATTEMPT_TEST_SUCCESS";
export const UPDATE_ATTEMPT_TEST_FAILURE = "UPDATE_ATTEMPT_TEST_FAILURE";

const requestUpdateTimeSpent = () => {
  return {
    type: UPDATE_ATTEMPT_TEST_REQUEST,
  };
};

const receiveUpdateTimeSpent = (time) => {
  return {
    type: UPDATE_ATTEMPT_TEST_SUCCESS,
    time,
  };
};

const updateTimeSpentError = () => {
  return {
    type: UPDATE_ATTEMPT_TEST_FAILURE,
  };
};

export const updateTimeSpentByStudent = (values) => (dispatch) => {
  dispatch(requestUpdateTimeSpent());
  let {
    profileID,
    testName,
    completed,
    minutes: totalTime,
    _id: testID,
    updatingAttemptedMinutes,
  } = values;

  updatingAttemptedMinutes =
    updatingAttemptedMinutes !== 0 ? updatingAttemptedMinutes : 0;
  console.log(parseInt(updatingAttemptedMinutes));
  let subtractTime =
    updatingAttemptedMinutes == 0 ? parseInt(totalTime) : parseInt(0);

  let attemptedTime = Math.abs(
    subtractTime - parseInt(updatingAttemptedMinutes - 1)
  );

  const data = { profileID, testName, completed, attemptedTime, totalTime };
  console.log(completed, totalTime, data.attemptedTime);

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },

    body: JSON.stringify(data),
  };

  fetch(`/student/update-test-status/${testID}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        if (data?.error?.name === "TokenExpiredError") {
          dispatch(logoutUser());
        } else {
          data.obj.testStatus.map((test, index) => {
            if (test.testID === testID) {
              localStorage.setItem(testID, test.attemptedTime);
            }
          });

          console.log(data.obj);
          dispatch(receiveUpdateTimeSpent(localStorage.getItem(testID)));
        }
      }
    })
    .catch((error) => {
      //Do something with the error if you want!
      console.log(error);
      dispatch(updateTimeSpentError());
    });
};
