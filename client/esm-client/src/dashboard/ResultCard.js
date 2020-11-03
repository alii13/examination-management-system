import React, { useEffect } from "react";
import "./TestCard.css";
import { HiOutlineClipboardList, HiClipboardCopy } from "react-icons/hi";
import { fetchAttemptTests } from "../actions/testActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";

function ResultCard(props) {
  let { tests, isLoading, profileID, trimLength } = props;
  if (tests)
    tests =
      tests.length > trimLength ? tests.slice(-trimLength).reverse() : tests;

  useEffect(() => {
    props.fetchTests(profileID);
    console.log("fired");
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
              <Link to="/result" key={index}>
                <li className="left__body__test">
                  <div className="test__index">
                    <p
                      className="index__box "
                      style={{ backgroundColor: "#1e90ff" }}
                    >
                      {index + 1}
                    </p>
                  </div>
                  <div className="test__name"> {test.testName}</div>
                  <div className="test__icon">
                    <HiClipboardCopy />
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="skeleton">
            {Array(trimLength)
              .fill()
              .map((item, i) => (
                <div className="single-skeleton" key={i}>
                  <Skeleton.Avatar
                    className="avatar-skelton"
                    active={true}
                    size="default"
                    shape="square"
                  />
                  <Skeleton.Input
                    className="input-skelton"
                    active={true}
                    size="default"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.tests.isLoadingAttemptedTest,
    tests: state.tests.attemptedTest,
    profileID: state.auth.profileID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: (profileID) => dispatch(fetchAttemptTests(profileID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultCard);
