import React, { useEffect } from "react";
import "./TestCard.css";
import { HiOutlineClipboardList, HiClipboardCopy } from "react-icons/hi";
import { fetchTests } from "../actions/testActions";
import { connect } from "react-redux";

function TestCard(props) {
  const { tests, isLoading, studentClassName } = props;

  useEffect(() => {
    props.fetchTests(studentClassName);
  }, []);

  return (
    <>
      <div className="left__header">
        <p className="left__header__text">
          {<HiOutlineClipboardList />}Today's Test
        </p>
      </div>
      <div className="left__body">
        {!isLoading && tests ? (
          <ul className="left__body__list__ul">
            {tests.map((test, index) => (
              <li className="left__body__test" key={index}>
                <div className="test__index">{index + 1}</div>
                <div className="test__name"> {test.testName}</div>
                <div className="test__icon">
                  <HiClipboardCopy />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="left__body__test">Loading...</p>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.tests.isLoadingTest,
    tests: state.tests.test,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: (classID) => dispatch(fetchTests(classID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCard);
