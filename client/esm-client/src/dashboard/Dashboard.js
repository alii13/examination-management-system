import React, { useState } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import TestCard from "./TestCard";
import ResultCard from "./ResultCard";
import "./Dashboard.css";

function Dashboard(props) {
  const { studentClassName, profileID, userInfo } = props;
  const trimLength = 8;

  // console.log(userInfo);

  return (
    <>
      <div className={"container dashboard"}>
        <Row gutter={[48, 10]} justify="center">
          <Col className="gutter-row" xs={24} sm={24} md={9} xl={9}>
            <TestCard
              studentClassName={studentClassName}
              trimLength={trimLength}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={9} xl={9}>
            <ResultCard trimLength={trimLength} />
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    studentClassName: state.auth.user ? state.auth.user.className : null,
    profileID: state.auth.user ? state.auth.user.profileID : null,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
