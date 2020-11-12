import { logoutUser } from "./authActions";
export const TEST_SELECTED = "TEST_SELECTED";
export const SELECTED_TEST_RESULT = "SELECTED_TEST_RESULT";
export const SELECTED_ASSIGNED_TEST = "SELECTED_ASSIGNED_TEST";

const selectTest = (testData) => {
  return {
    type: TEST_SELECTED,
    testData,
  };
};

const selectTestResult = (testData) => {
  return {
    type: SELECTED_TEST_RESULT,
    testData,
  };
};
const selectAssignedTest = (testData) => {
  return {
    type: SELECTED_ASSIGNED_TEST,
    testData,
  };
};

export const selectedTest = (data) => (dispatch) => {
  dispatch(selectTest(data));
};

export const selectedTestResult = (data) => (dispatch) => {
  dispatch(selectTestResult(data));
};
export const selectedAssignedTest = (data) => (dispatch) => {
  dispatch(selectAssignedTest(data));
};
