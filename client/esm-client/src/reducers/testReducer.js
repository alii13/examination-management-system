import {
    FETCH_TEST_REQUEST,
    FETCH_TEST_SUCCESS,
    FETCH_TEST_FAILURE,
  } from "../actions/testActions";

  const initialState = {
    isFetching: false,
    isLoading: false,
    fetchingError: false,
    isFetched: false,
    test: [],
  }

  export default function (state = initialState, action) {
    
    switch (action.type) {
      case FETCH_TEST_REQUEST:
        console.log("fetch tests request fired")
        return {
          ...state,
          isFetching: true,
          isLoading: true,
          fetchingError: false,
        };
      case FETCH_TEST_SUCCESS:
        console.log("fetch tests success fired", action.tests)
        return {
          ...state,
          isFetching: false,
          isLoading: false,
          isFetched: true,
          test: action.tests,
        };
      case FETCH_TEST_FAILURE:
        console.log("fetch tests failure fired")
        return {
          ...state,
          isFetching: false,
          isFetched: false,
          isLoading: false,
          fetchError: true,
        };

      default:
        return state;
    }
  };
  