import React from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import SelectTest from "./SelectTest";

function ResultWrapper(props) {
  const { profileID } = props;
  return (
    <>
      <div className="container dashboard">
        <Row gutter={[48, 10]} justify="center">
          <Col className="gutter-row" xs={24} sm={24} md={14} xl={14}>
            <SelectTest profileID={profileID} />
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    profileID: state.auth.user ? state.auth.profileID : null,
  };
};

export default connect(mapStateToProps, null)(ResultWrapper);
