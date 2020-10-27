import React, { useEffect } from "react";
import { fetchTests } from "../actions/testActions";
import { selectedTest } from "../actions/selectActions";
import { connect } from "react-redux";
import "./SelectTest.css";
import TestList from "./TestList";

function SelectTest(props) {
  const { tests, studentClassName } = props;

  const handleSelectedTest =(testData)=>{
      props.selectedTest(testData);
  }

  useEffect(() => {
    props.fetchTests(studentClassName);
  }, []);

  return (
    <>
      <div className="select__test__container">
        {tests ? <TestList tests={tests} handleSelectedTest={handleSelectedTest} /> : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tests: state.tests.test,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: (classID) => dispatch(fetchTests(classID)),
    selectedTest: (testData) =>dispatch(selectedTest(testData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTest);
