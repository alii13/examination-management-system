import React from "react";
import { Col } from "antd";
import "./StudentStatus.css";

export default function StudentStatus(props) {
  const student = props.student;
  const className = props.className;
  const testName = props.testName;
  return (
    <>
      <Col className="gutter-row gutter-col-adder" sm={24} xs={24} md={6} lg={6}>
        <div className="student__status__wrapper">
          <div className="status__header">
            <p className="status__header__heading">
              {student.firstName.toUpperCase()} {student.lastName.toUpperCase()}
            </p>
          </div>
          <div className="student__status__body">
            <div className="status__test">
              Test Name: <span className="status__testname"> {testName}</span>
            </div>
            <div className="status__test__total">
              Total Marks:{" "}
              <span className="status__testname">{student.totalMarks}</span>
            </div>
            <div className="status__test__obtained">
              Obtained Marks:{" "}
              <span className="status__testname">{student.correct}</span>
            </div>
            <div className="status__test__correct">
              Correct Answers:{" "}
              <span className="status__testname success-wihtoutFont">
                {student.correct}
              </span>
            </div>
            <div className="status__test__wrong">
              Wrong Answers:{" "}
              <span className="status__testname danger">{student.wrong}</span>
            </div>
            <div className="status__test__unanswered">
              Not Answered:{" "}
              <span className="status__testname primary-wihtoutFont">
                {student.unanswered}
              </span>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
}
