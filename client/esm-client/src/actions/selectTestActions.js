export const TEST_SELECTED = "TEST_SELECTED";

const selected = testData => {
    return {
      type: TEST_SELECTED,
      testData
    };
  };

export const selectedTest = (data) => (dispatch) => {

    dispatch(selected(data));
  
  };