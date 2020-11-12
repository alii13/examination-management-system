import React, { Component } from "react";
import { Row, Col, Form, Input, Button, Select, notification } from "antd";
import "./index.css";
import { connect } from "react-redux";
import Rules from "./Rules";
import Questions from "./Questions";
import RenderData from "./RenderData";
import { submitTest, testCreatedFalse } from "../../actions/TeacherActions";

class CreateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: [],
      questions: [],
      isLoading: false,
      testCreated: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      isLoading: props.isLoading,
      testCreated: props.testCreated,
    };
  }

  submitForm = (values) => {
    let questions = [];
    let answers = [];
    console.log(values);

    const {
      testName,
      category,
      className,
      section,
      minutes,
      outOfMarks,
    } = values;


    questions = this.state.questions.map((question, index) => {
      return {
        description: question.questionDescripiton,
        options: [
          {
            option: question.opiton1,
          },
          {
            option: question.opiton2,
          },
          {
            option: question.opiton3,
          },
          {
            option: question.opiton4,
          },
        ],
      };
    });
    this.state.questions.map((question, index) => {
      answers.push(parseInt(question.answer));
    });
    const teacherId = this.props.teacherID;
    const rules = this.state.rules;

    const sendData = {
      teacherId,
      testName,
      category,
      className,
      section,
      rules,
      testCreated: false,
      minutes,
      outOfMarks,
      questions,
      answers,
    };

    this.props.submitTest(sendData);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleSelect = (select, optionData) => {};

  handleDeleteRule = (Removeindex) => {
    
    this.setState({
      rules: this.state.rules.filter((item, index) => index !== Removeindex),
    });
  };
  handleDeleteQuestion = (Removeindex) => {
  
    this.setState({
      questions: this.state.questions.filter((item, index) => index !== Removeindex),
    });
  };
  addRule = (value) => {
    this.setState({
      rules: [...this.state.rules, { value }],
    });
  };


  openNotification = () => {
    const args = {
      message: "Test Created",
      description: "Congratulations, Your Test created successfully.",
      duration: 3,
    };
    notification.open(args);
  };

  addQuestion = ({
    questionDescripiton,
    opiton1,
    opiton2,
    opiton3,
    opiton4,
    answer,
  }) => {
    this.setState({
      questions: [
        ...this.state.questions,
        { questionDescripiton, opiton1, opiton2, opiton3, opiton4, answer },
      ],
    });
  };

  componentDidUpdate(){
    if (this.props.testCreated) {
      this.props.testCreatedFalse()
      this.openNotification();
    }
  }

  render() {
    const { Option } = Select;

    return (
      <>
        <Row justify="center" align="middle">
          <Col xs={22} sm={22} md={10} lg={10} className="signup__container">
            <p className="sub-title__signup"> 🎓 Create Test</p>
            <Form
              name="basic"
              className="create__test__form"
              initialValues={{
                remember: true,
              }}
              onFinish={this.submitForm}
              onFinishFailed={this.onFinishFailed}
            >
              <div className="element__wrapper">
                <Form.Item
                  name="testName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Test Name!",
                    },
                  ]}
                >
                  <Input placeholder="Test Name" className="input" />
                </Form.Item>
                <Form.Item
                  name="outOfMarks"
                  rules={[
                    {
                      required: true,
                      message: "Please enter total marks!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Total Marks"
                    className="input"
                    type="number"
                  />
                </Form.Item>
              </div>
              <Form.Item
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please enter a category",
                  },
                ]}
              >
                <Input placeholder="Catergory of Test" className="input" />
              </Form.Item>
              <Form.Item
                name="minutes"
                rules={[
                  {
                    required: true,
                    message: "Please enter total duration of test",
                  },
                ]}
              >
                <Input
                  placeholder="Duration of test ( in Minutes )"
                  className="input"
                  type="number"
                />
              </Form.Item>

              <div className="element__wrapper">
                <Form.Item
                  name="section"
                  rules={[
                    { required: true, message: "Please input your section!" },
                  ]}
                >
                  <Select defaultValue="Section">
                    <Option value="A">A</Option>
                    <Option value="B">B</Option>
                    <Option value="C">C</Option>
                    <Option value="D">D</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="className"
                  rules={[{ required: true, message: "Please select a class" }]}
                >
                  <Select defaultValue="Class">
                    <Option value="IX">IX</Option>
                    {/* <Option value="XI">XI</Option>
                    <Option value="XII">XII</Option> */}
                  </Select>
                </Form.Item>
              </div>
              <p className="primary-wihtoutFont" style={{ fontWeight: "500" }}>
                {" "}
                Test Rules
              </p>
              <RenderData
                ruleData={this.state.rules}
                rules={true}
                clickedRule={this.handleDeleteRule}
              />
              <Form.Item>
                <Rules addRule={this.addRule} />
              </Form.Item>
              <p className="primary-wihtoutFont" style={{ fontWeight: "500" }}>
                {" "}
                Test Questions
              </p>
              <RenderData
                questionData={this.state.questions}
                questions={true}
                clickedRule={this.handleDeleteQuestion}
              />
              <Form.Item>
                <Questions addQuestion={this.addQuestion} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  loading={this.state.isLoading}
                  className="sign__up"
                  htmlType="submit"
                  disabled={(this.state.questions.length<1)?(true):(false)}
                >
                  {this.state.isLoading ? "Creating Test" : "Create Test"}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    teacherID: state.auth.profileID,
    isLoading: state.teacher.isLoadingTest,
    testCreated: state.teacher.testCreated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitTest: (values) => dispatch(submitTest(values)),
    testCreatedFalse: () => dispatch(testCreatedFalse()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTest);
