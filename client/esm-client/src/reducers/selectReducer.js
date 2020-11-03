import {
  TEST_SELECTED,
  SELECTED_TEST_RESULT,
  SELECTED_ASSIGNED_TEST,
} from "../actions/selectActions";

const initialState = {
  selectedTestData: {},
  selectedTestResultData: {},
  selectedAssignedTestData: {},
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
    case SELECTED_ASSIGNED_TEST:
      // console.log("login success fired", action.obj)
      return {
        ...state,
        selectedAssignedTestData: action.testData,
      };

    default:
      return state;
  }
}
