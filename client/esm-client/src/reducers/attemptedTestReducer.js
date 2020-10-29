import { UPDATE_ATTEMPT_TEST_REQUEST, UPDATE_ATTEMPT_TEST_SUCCESS, UPDATE_ATTEMPT_TEST_FAILURE } from "../actions/attemptTestActions";

const initialState = {
  attemptedTime: 0,
  isFetching:false,
  isFetched:false,
  isFetchingError:false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_ATTEMPT_TEST_REQUEST:
      // console.log("login success fired", action.obj)
      return {
        ...state,
        isFetching: true,
      };

      case UPDATE_ATTEMPT_TEST_SUCCESS:
        // console.log("login success fired", action.obj)
        //console.log(action.data);
        return {
          ...state,
          isFetched: true,
          isFetching: false,
          attemptedTime: 12,
        };
    case UPDATE_ATTEMPT_TEST_FAILURE:
      // console.log("login success fired", action.obj)
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isFetchingError: true,

      };

    default:
      return state;
  }
}
