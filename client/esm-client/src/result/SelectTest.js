import React, { useEffect } from "react";
import { fetchAttemptTests } from "../actions/testActions";
import { selectedTestResult } from "../actions/selectActions";
import { connect } from "react-redux";
import "./SelectTest.css";
import TestList from "./TestList";

function SelectTest(props) {
  const { tests, profileID } = props;

  const handleSelectedTest = (testData) => {
    props.selectedTest(testData);
  };

  useEffect(() => {
    props.fetchTests(profileID);
  }, []);

  return (
    <>
      <div className="select__test__container">
        <TestList tests={tests} handleSelectedTest={handleSelectedTest} />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tests: state.tests.attemptedTest,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: (profileID) => dispatch(fetchAttemptTests(profileID)),
    selectedTest: (testData) => dispatch(selectedTestResult(testData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTest);
