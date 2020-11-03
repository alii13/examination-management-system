import {
  FETCH_CLASSES_REQUEST,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAILURE,
} from "../actions/classesActions";

const initialState = {
  isLoading: false,
  isFetched: false,
  isFetchError: false,
  classes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CLASSES_REQUEST:
      // console.log("login success fired", action.obj)
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_CLASSES_SUCCESS:
      // console.log("login success fired", action.obj)
      return {
        ...state,
        isLoading: false,
        isFetched: true,
        classes: action.data,
      };

    case FETCH_CLASSES_FAILURE:
      // console.log("login success fired", action.obj)
      return {
        ...state,
        isfetched: false,
        isLoading: true,
      };

    default:
      return state;
  }
}
