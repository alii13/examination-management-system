import React, { useEffect } from "react";
import "./TestCard.css";
import { HiOutlineClipboardList, HiClipboardCopy } from "react-icons/hi";
import { fetchAttemptTests } from "../actions/testActions";
import { connect } from "react-redux";

function ResultCard(props) {
  const { tests, isLoading, profileID } = props;

  useEffect(() => {
    props.fetchTests(profileID);
  }, []);

  return (
    <>
      <div className="left__header">
        <p className="left__header__text">
          {<HiOutlineClipboardList />}Recently Attempted Tests
        </p>
      </div>
      <div className="left__body">
        {!isLoading && tests ? (
          <ul className="left__body__list__ul">
            {tests.map((test, index) => (
              <li className="left__body__test" key={index}>
                <div className="test__index"><p className="index__box">{index + 1}</p></div>
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
    isLoading: state.tests.isLoadingAttemptedTest,
    tests: state.tests.attemptedTest,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: (classID) => dispatch(fetchAttemptTests(classID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultCard);
