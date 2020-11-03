import React, { useEffect } from "react";
import "./TestCard.css";
import { Link } from "react-router-dom";
import { HiOutlineClipboardList, HiClipboardCopy } from "react-icons/hi";
import { fetchTests } from "../actions/testActions";
import { connect } from "react-redux";
import { Skeleton } from "antd";

function TestCard(props) {
  let { tests, isLoading, studentClassName, trimLength } = props;
  if (tests)
    tests =
      tests.length > trimLength ? tests.slice(-trimLength).reverse() : tests;

  useEffect(() => {
    props.fetchTests(studentClassName);
  }, []);

  return (
    <>
      <div className="left__header red__header">
        <p className="left__header__text">
          {<HiOutlineClipboardList />}Today's Test
        </p>
      </div>
      <div className="left__body">
        {!isLoading && tests ? (
          <ul className="left__body__list__ul">
            {tests.map((test, index) => (
              <Link to="/attempt-test" key={index}>
                <li className="left__body__test">
                  <div className="test__index">
                    <p className="index__box red__index">{index + 1}</p>
                  </div>
                  <div className="test__name "> {test.testName}</div>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: (classID) => dispatch(fetchTests(classID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCard);
