export const TEST_SELECTED = "TEST_SELECTED";
export const SELECTED_TEST_RESULT = "SELECTED_TEST_RESULT";

const selectTest = testData => {
    return {
      type: TEST_SELECTED,
      testData
    };
  };

  const selectTestResult = testData => {
    return {
      type: SELECTED_TEST_RESULT,
      testData
    };
  };

export const selectedTest = (data) => (dispatch) => {

    dispatch(selectTest(data));
  
  };

  export const selectedTestResult = (data) => (dispatch) => {

    dispatch(selectTestResult(data));
  
  };