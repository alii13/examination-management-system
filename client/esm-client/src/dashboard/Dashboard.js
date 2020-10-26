import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import Test from "./Test";

function Dashboard(props) {
  const style = { background: "#0092ff", padding: "8px 0" };
  const { studentClassName } = props;

 

  return (
    <>
      <div className="container">
        <Row gutter={[48, 10]} justify="center">
          <Col className="gutter-row" xs={24} sm={24} md={9} xl={9}>
          <Test studentClassName={studentClassName}/>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={9} xl={9}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.tests.isLoading,
    studentClassName: state.auth.user ? state.auth.user.className : null,
    tests: state.tests.test,
  };
};


export default connect(mapStateToProps, null)(Dashboard);
