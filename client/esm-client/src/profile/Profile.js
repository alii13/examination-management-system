import React, { Component } from "react";
import { Row, Col, Form, Input, Avatar, Popover } from "antd";
import { connect } from "react-redux";
import "./Profile.css";
import { Roles } from "../Roles/roles";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: undefined,
      isVerified: undefined,
      lastName: undefined,
      email: undefined,
      phone: undefined,
      role: undefined,
      section: undefined,
      isVerified: undefined,
    };
  }
  submitForm = (values) => {
    // props.sendSignUpRequest(values);
    console.log(values);
  };
  static getDerivedStateFromProps(props, state) {
    return {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      isVerified: props.userisVerified,
      phone: props.user.phone,
      role: props.user.role,
      section: props.user.section,
      isVerified: props.user.isVerified,
      className: props.user.className,
    };
  }
  render() {
    console.log(this.props.user);
    const verfied = (
      <div>
        <p className="verified-popover">Verified !</p>
      </div>
    );
    const notVerfied = (
      <div>
        <p className="notverifieid-popover">Not Verified!</p>
      </div>
    );
    return (
      <>
        <Row justify="center" align="middle" className="hero">
          <Col xs={22} sm={22} md={8} lg={8} className="signup__container">
            <div className="avatar-wrapper">
              <Avatar
                size={{ xs: 80, sm: 80, md: 80, lg: 80, xl: 90, xxl: 100 }}
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                className="avatar-image"
              />
              <Popover content={this.state.isVerified ? verfied : notVerfied}>
                <img
                  src={
                    this.state.isVerified ? "/verified.png" : "/notVerified.png"
                  }
                  alt="verification"
                  className="verified"
                />
              </Popover>
              <p
                className="profile__heading"
                style={{ margin: 0, textAlign: "center" }}
              >
                Your Profile
              </p>
            </div>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.submitForm}
            >
              <div className="element__wrapper">
                <Form.Item>
                  <Input
                    placeholder="First Name"
                    readonly="readOnly"
                    value={this.state.firstName}
                    className="input"
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    placeholder="Last Name"
                    readonly="readOnly"
                    value={this.state.lastName}
                    className="input"
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <Input
                  placeholder="abcd@gmail.com"
                  readonly="readOnly"
                  value={this.state.email}
                  className="input"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="tel"
                  placeholder="7275XXXXXX"
                  readonly="readOnly"
                  value={this.state.phone}
                  className="input"
                />
              </Form.Item>
              <div className="element__wrapper">
                <Form.Item>
                  <Input
                    placeholder="Role"
                    readonly="readOnly"
                    value={this.state.role}
                    className="input"
                  />
                </Form.Item>
                <Form.Item
                  className={Roles.teacher === this.state.role ? "hidden" : ""}
                >
                  <Input
                    placeholder="Class"
                    readonly="readOnly"
                    value={this.state.className}
                    className="input"
                  />
                </Form.Item>
                <Form.Item
                  className={Roles.teacher === this.state.role ? "hidden" : ""}
                >
                  <Input
                    placeholder="Section"
                    readonly="readOnly"
                    value={this.state.section}
                    className="input"
                  />
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user ? state.auth.user : null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
