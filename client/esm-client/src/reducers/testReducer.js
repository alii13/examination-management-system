import {
  FETCH_TEST_REQUEST,
  FETCH_TEST_SUCCESS,
  FETCH_ATTEMPT_TEST_SUCCESS,
  FETCH_TEST_FAILURE,
} from "../actions/testActions";

const trimLength = 8;

const initialState = {
  isFetching: false,
  isLoadingTest: false,
  isLoadingAttemptedTest: false,
  fetchingError: false,
  isFetched: false,
  test: [],
  attemptedTest: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TEST_REQUEST:
      return {
        ...state,
        isFetching: true,
        isLoadingTest: true,
        isLoadingAttemptedTest: true,
        fetchingError: false,
      };
    case FETCH_TEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoadingTest: false,
        isFetched: true,
        test:
          (action.tests.length > trimLength
            ? action.tests.slice(0,trimLength)
            : action.tests),
      };
    case FETCH_ATTEMPT_TEST_SUCCESS:
      // console.log(action.tests)
      return {
        ...state,
        isFetching: false,
        isLoadingAttemptedTest: false,
        attemptedTest:
          (action.tests[0].attemptedTest.length > trimLength
            ? action.tests[0].attemptedTest.slice(0,trimLength)
            : action.tests[0].attemptedTest),
      };
    case FETCH_TEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isLoadingTest: false,
        isLoadingAttemptedTest: false,
        fetchError: true,
      };

    default:
      return state;
  }
}