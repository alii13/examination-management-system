import { TEST_SELECTED } from "../actions/selectTestActions";

const initialState = {
  selectedTestData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEST_SELECTED:
      // console.log("login success fired", action.obj)
      return {
        ...state,
        selectedTestData: action.testData,
      };

    default:
      return state;
  }
}
