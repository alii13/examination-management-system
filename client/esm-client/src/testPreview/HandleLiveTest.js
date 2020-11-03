import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTimeSpentByStudent } from "../actions/attemptTestActions";
import "./HandleLiveTest.css";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Footer from "./Footer";
import { questions } from "./mockData";
import Counter from "./Counter";

class HandleLiveTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testID: undefined,
      totalMinutes: undefined,
      questionsData: [],
      answers: [],
      totalScore: 0,
      footerClick: false,
      activateQue: 0,
      totalAnswered: 0,
      answered: false,
      totalPending: null,
      totalFlagged: 0,
      questionIndex: 0,
      flag: 0,
      testName: null,
      userAnswers: Array.apply(undefined, Array(5)),
    };
  }

  componentDidMount() {
    //  const answers = question
    // make a call using redux
    this.props.counterEnd(this.submitTestOnCounterEnd);

    this.setState({
      questionsData: this.props.selectedTest.questions,
      // questionsData:questions,
      answers: this.props.selectedTest.answers,
      testID: this.props.testID,
      testName: this.props.selectedTest.testName,
      totalPending: this.props.selectedTest.questions.length,
    });
    // fire function given by redux
  }

  changeActivatedQueFromFooter = (changeActivatedQue) => {
    if (changeActivatedQue !== "flag__question") {
      this.setState({
        footerClick: true,
      });
      this.child.changeActivatedQueInChild(changeActivatedQue);
    } else {
      this.triggerFlag();
      if (this.state.flag <= this.state.questionsData.length) {
        this.setState({
          flag: this.state.flag + 1,
        });
      }
    }
  };
  handleSubmitTest = () => {
    this.child.submitTest();
  };
  changeParentActivatedQue = (index) => {
    this.setState({
      activateQue: index,
      footerClick: true,
    });
  };
  submitTestOnCounterEnd = () => {
    this.handleSubmitTest();
  };

  handleFooterButtons = (buttonClicked) => {
    this.changeActivatedQueFromFooter(buttonClicked);
  };

  handleClearResponse = (index, blankClearAttempt) => {
    if (!blankClearAttempt) {
      let updatedUserAnswers = this.state.userAnswers;
      updatedUserAnswers[index] = undefined;
      this.setState({
        totalAnswered: this.state.totalAnswered - 1,
        totalPending: this.state.totalPending + 1,
        userAnswers: updatedUserAnswers,
        activateQue: index,
        footerClick: false,
        answered: false,
      });
    }
  };
  questionAnswered = (index, option, changed) => {
    if (!changed) {
      let updatedUserAnswers = this.state.userAnswers;
      updatedUserAnswers[index] = option;
      this.setState({
        totalAnswered: this.state.totalAnswered + 1,
        totalPending: this.state.totalPending - 1,
        userAnswers: updatedUserAnswers,
        activateQue: index,
        footerClick: false,
        answered: true,
      });
    } else {
      // answers array
      let updatedUserAnswers = this.state.userAnswers;
      updatedUserAnswers[index] = option;
      this.setState({
        userAnswers: updatedUserAnswers,
        activateQue: index,
        footerClick: false,
        answered: true,
      });
    }
  };
  handleQuestionClick = (index) => {
    this.child.changeActivatedQueInChild(index);
  };

  render() {
    return (
      <>
        <div className="question_board">
          <div className="left__side">
            <div className="test__info">
              <div className="username"></div>
              <div className="test__name">
                TestName: <span className="danger">{this.props.testName}</span>
              </div>
              <div className="total__minutes">
                Total Minutes:{" "}
                <span className="danger">{this.props.totalMinutes}</span>
              </div>
            </div>
            <div className="questions__status">
              <div className="total__answered box">
                <span className="count__answered">
                  {this.state.totalAnswered}{" "}
                </span>
                Answered
              </div>
              <div className="total__flagged box">
                <span className="count__flagged">{this.state.flag} </span>
                Flagged
              </div>
              <div className="total__pending box">
                <span className="count__pending">
                  {this.state.totalPending}{" "}
                </span>
                Pending
              </div>
            </div>
            <LeftSide
              questionsData={this.state.questionsData}
              handleQuestionClick={this.handleQuestionClick}
              activateQue={this.state.activateQue}
              answered={this.state.answered}
              footerClick={this.state.footerClick}
              onRef={(ref) => (this.child = ref)}
              flagClicked={(click) => (this.triggerFlag = click)}
              flag={this.state.flag}
            />
          </div>
          <RightSide
            questionsData={this.state.questionsData}
            questionAnswered={this.questionAnswered}
            questionIndex={this.state.questionIndex}
            handleClearResponse={this.handleClearResponse}
            onRef={(ref) => (this.child = ref)}
            changeParentActivatedQue={this.changeParentActivatedQue}
            userAnswers={this.state.userAnswers}
            answers={this.state.answers}
            testID={this.state.testID}
            testName={this.state.testName}
          />
          <div className="footer">
            <Footer
              handleFooterButtons={this.handleFooterButtons}
              handleSubmitTest={this.handleSubmitTest}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTest: state.selectedTest.selectedTestData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTimer: (data) => dispatch(updateTimeSpentByStudent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleLiveTest);
