import { logoutUser } from "./authActions";
export const FETCH_CLASSES_REQUEST = "FETCH_CLASSES_REQUEST";
export const FETCH_CLASSES_SUCCESS = "FETCH_CLASSES_SUCCESS";
export const FETCH_CLASSES_FAILURE = "FETCH_CLASSES_FAILURE";

const requestClasses = () => {
  return {
    type: FETCH_CLASSES_REQUEST,
  };
};

const receiveClasses = (data) => {
  return {
    type: FETCH_CLASSES_SUCCESS,
    data,
  };
};

const ClassesError = () => {
  return {
    type: FETCH_CLASSES_FAILURE,
  };
};

export const fetchClasses = (values) => (dispatch) => {
  dispatch(requestClasses());

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };
  fetch("/teacher/classes", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data?.error?.name === "TokenExpiredError") {
        dispatch(logoutUser());
      } else {
        const filteredDupicates = data.obj.filter(
          (v, i, a) => a.findIndex((t) => t.className === v.className) === i
        );
        dispatch(receiveClasses(filteredDupicates));
      }
    })
    .catch((error) => {
      console.log(error);
      //Do something with the error if you want!
      dispatch(ClassesError());
    });
};
