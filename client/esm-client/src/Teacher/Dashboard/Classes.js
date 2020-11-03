import React, { useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { HiOutlineClipboardList, HiClipboardCopy } from "react-icons/hi";
import { fetchClasses } from "../../actions/classesActions";
import { connect } from "react-redux";
import { Skeleton } from "antd";

function Classes(props) {
  let { classesList, isLoading, studentClassName, trimLength, classes } = props;
  if (classesList)
    classesList =
      classesList.length > trimLength
        ? classesList.slice(-trimLength).reverse()
        : classesList;

  useEffect(() => {
    props.fetchClasses();
  }, []);
  console.log(props);

  return (
    <>
      <div className="left__header red__header">
        <p className="left__header__text">
          {<HiOutlineClipboardList />}Recent Registered Classes
        </p>
      </div>
      <div className="left__body">
        {!isLoading && classesList ? (
          <ul className="left__body__list__ul">
            {classesList.map((individualClass, index) => (
              <Link to="/attempt-test" key={index}>
                <li className="left__body__test">
                  <div className="test__index">
                    <p className="index__box red__index">{index + 1}</p>
                  </div>
                  <div className="test__name ">
                    {" "}
                    Class - {individualClass.className}
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
    classesList: state.classesData.classes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchClasses: () => dispatch(fetchClasses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
