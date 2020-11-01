import React, { useState } from "react";
import { Row, Col, Typography, Form, Input, Button, Select } from "antd";
import "./Signup.css";

export default function Signup() {
  const [showSelect, setShowSelect] = useState(false);
  const { Title } = Typography;
  const { Option } = Select;

  const submitForm = (values) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    //console.log("Success:", values);
    fetch("/user/signup", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // localStorage.setItem("token",`Bearer ${data.token}`);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSelect = (select, optionData) => {
    console.log(optionData);
    if (optionData.value === "teacher") {
      setShowSelect(true);
    } else {
      setShowSelect(false);
    }
  };
  return (
    <>
      <Row justify="center" align="middle" className="hero">
        <Col xs={22} sm={22} md={8} lg={8} className="signup__container">
        <p className="sub-title__signup">🎓 EMS</p>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={submitForm}
            onFinishFailed={onFinishFailed}
          >
            <div className="element__wrapper">
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name!",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your Last Name!",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="abcd@gmail.com" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                ]}
              >
                <Input type="tel" placeholder="7275XXXXXX" />
              </Form.Item>

              <div className="element__wrapper">
                <Form.Item
                  name="role"
                  rules={[
                    {
                      message: "Please input your role!",
                    },
                  ]}
                >
                  <Select defaultValue="Role" onSelect={handleSelect}>
                    <Option value="student">Student</Option>
                    <Option value="teacher">Teacher</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="section"
                  rules={[
                    {
                      message: "Please input your section!",
                    },
                  ]}
                >
                  <Select defaultValue="Section" disabled={showSelect}>
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                    <Option value="D">D</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="className"
                  rules={[
                    {
                      message: "Please input your email!",
                    },
                  ]}
                
                >
                  <Select defaultValue="Class" disabled={showSelect}>
                    <Option value="X">X</Option>
                    <Option value="XI">XI</Option>
                    <Option value="XII">XII</Option>
                  </Select>
                </Form.Item>
              </div>

              <Button type="primary"  className="sign__up" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
