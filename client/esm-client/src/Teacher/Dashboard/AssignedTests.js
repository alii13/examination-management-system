import React, { useEffect } from "react";
import { HiOutlineClipboardList, HiClipboardCopy } from "react-icons/hi";
import { fetchTeacherTests } from "../../actions/testActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import "./index.css";

function AssignedTests(props) {
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
      <div className="left__teacher__header">
        <p className="left__teacher__header__text">
          {<HiOutlineClipboardList />}Recently Assigned Tests
        </p>
      </div>
      <div className="left__body">
        {!isLoading && tests ? (
          <ul className="left__body__list__ul">
            {tests.map((test, index) => (
              <Link to="/assigned-test" key={index}>
                <li className="left__body__test">
                  <div className="test__index">
                    <p className="index__box index__box__teacher ">
                      {index + 1}
                    </p>
                  </div>
                  <div className="test__name">
                    {" "}
                    {test.testName} - Class {test.className}
                  </div>
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
    isLoading: state.tests.isLoadingTest,
    tests: state.tests.test,
    profileID: state.auth.profileID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: (profileID) => dispatch(fetchTeacherTests(profileID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignedTests);
