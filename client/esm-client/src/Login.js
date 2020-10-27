import { Form, Input, Button } from "antd";
import React, {useEffect} from "react";
import { Row, Col, Typography } from "antd";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { loginUser } from "./actions/authActions";
import { connect } from "react-redux";

 function Login(props) {
  const history = useHistory();
  const { Title } = Typography;
  const { isLoading } = props;

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };


  useEffect(() => {
    
    if(props.isAuthenticated){
      history.push("/");
    }

  }, [props])

  const submitForm = (values) => {
    props.sendLoginRequest(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Row justify="center" align="middle" className="hero">
        <Col xs={20} sm={20} md={6} lg={6} className="signin__container">
          <Title>Sign In</Title>

          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={submitForm}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary"
              style={{minWidth:"44px"}}
              loading={isLoading}
               htmlType="submit">
                {(!isLoading)?("Submit"):('Logging In')}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.auth.isAuthenticated,
      isLoading: state.auth.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      sendLoginRequest: (values) => dispatch(loginUser(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
