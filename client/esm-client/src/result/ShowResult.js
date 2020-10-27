import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import "./ShowResult.css";


 function ShowResult(props) {
  return (
    <>
      <div className="container dashboard">
        <Row gutter={[48, 10]} justify="center">
          <Col className="gutter-row" xs={24} sm={24} md={14} xl={14}>
            <div className="result__wrapper">

            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    selectedTest: state.selectedTest.selectedTestData,
  };
};

export default connect(mapStateToProps, null)(ShowResult);