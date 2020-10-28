import React, {useState} from "react";
import { Row, Col, Typography, Form, Input, Button, Select } from "antd";
import "./Signup.css";

export default function Signup() {
  const [showSelect, setShowSelect] = useState(false);
  const { Title } = Typography;
  const { Option } = Select;

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

  const submitForm = (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  };
    //console.log("Success:", values);
    fetch('/user/signup', requestOptions)
        .then(response => response.json())
        .then(data => {
          // localStorage.setItem("token",`Bearer ${data.token}`);
        });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSelect = (select, optionData)=>{
    console.log(optionData);
    if(optionData.value === "teacher"){
      setShowSelect(true);
    }else{
        setShowSelect(false);
    }
  }
  return (
    <>
      <Row justify="center" align="middle" className="hero">
        <Col xs={20} sm={20} md={6} lg={6} className="signup__container">
          <Title>Sign Up</Title>

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
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!",
                },
              ]}
            >
              <Input placeholder="Jhon" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name!",
                },
              ]}
            >
              <Input placeholder="Doe" />
            </Form.Item>
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
              <Input placeholder="abcd@gmail.com" />
            </Form.Item>
            <Form.Item
              label="Phone"
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
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  message: "Please input your role!",
                },
              ]}
            >
              <Select defaultValue="Select" onSelect={handleSelect}>
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Section"
              name="section"
              rules={[
                {
                  message: "Please input your section!",
                },
              ]}
            >
              <Select defaultValue="Select" disabled={showSelect}>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
                <Option value="D">D</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Class"
              name="className"
              rules={[
                {
                  message: "Please input your email!",
                },
              ]}
            >
              <Select defaultValue="Select" disabled={showSelect}>
                <Option value="X">X</Option>
                <Option value="XI">XI</Option>
                <Option value="XII">XII</Option>
              </Select>
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
              <Input.Password placeholder="xxxx" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
