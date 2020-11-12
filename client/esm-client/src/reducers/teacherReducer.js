import {
  SUBMIT_TEST_REQUEST,
  SUBMIT_TEST_SUCCESS,
  SUBMIT_TEST_FAILURE,
  ASSIGNED_TEST_REQUEST,
  ASSIGNED_TEST_FAILURE,
  ASSIGNED_TEST_SUCCESS,
  SET_TEST_CREATED_FALSE,
} from "../actions/TeacherActions";

const initialState = {
  isFetching: false,
  isLoadingTest: false,
  fetchingError: false,
  isFetched: false,
  testCreated: false,
  testSubmitted: false,
  testSubmitError: false,
  assignedTests: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_TEST_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoadingTest: true,
        fetchingError: false,
      };
    case SUBMIT_TEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        testCreated: true,
        isLoadingTest: false,
        isFetched: true,
      };
    case SUBMIT_TEST_FAILURE:
      return {
        ...state,
        isFetching: true,
        isLoadingTest: true,
        fetchingError: false,
      };
    case ASSIGNED_TEST_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoadingTest: true,
        fetchingError: false,
      };
    case ASSIGNED_TEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        testCreated: true,
        isLoadingTest: false,
        isFetched: true,
        assignedTests: action.tests,
      };
    case ASSIGNED_TEST_FAILURE:
      return {
        ...state,
        isFetching: true,
        isLoadingTest: true,
        fetchingError: false,
      };
    case SET_TEST_CREATED_FALSE:
      return {
        ...state,
        testCreated: false,
      };

    default:
      return state;
  }
}
