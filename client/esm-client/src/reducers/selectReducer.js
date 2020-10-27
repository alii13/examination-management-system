import { TEST_SELECTED, SELECTED_TEST_RESULT } from "../actions/selectActions";

const initialState = {
  selectedTestData: {},
  selectedTestResultData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEST_SELECTED:
      // console.log("login success fired", action.obj)
      return {
        ...state,
        selectedTestData: action.testData,
      };

      case SELECTED_TEST_RESULT:
        // console.log("login success fired", action.obj)
        return {
          ...state,
          selectedTestResultData: action.testData,
        };

    default:
      return state;
  }
}
