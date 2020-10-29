import React from "react";
import { connect } from "react-redux";
import TestPreview from "./TestPreview";
function TestPreviewWrapper(props) {
  const { selectedTest } = props;
  const isSelected = Object.keys(selectedTest).length == 0 ? false : true;
  return (
    <>{isSelected ? <TestPreview /> : <p>Please select a test first</p>}</>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedTest: state.selectedTest.selectedTestData,
  };
};

export default connect(mapStateToProps, null)(TestPreviewWrapper);
