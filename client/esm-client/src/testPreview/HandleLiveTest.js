import React, { Component } from "react";
import { questions } from "./mockData";
import { connect } from "react-redux";
import { updateTimeSpentByStudent } from "../actions/attemptTestActions";
import "./HandleLiveTest.css";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

class HandleLiveTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testID: null,
      totalMinutes: null,
      questionsData: [],
      answers: [],
      totalScore: 0,
      activateQue: null,
      totalAnswered: 0,
      totalPending: 5,
      totalFlagged: 0,
      userAnswers:Array.apply(null, Array(5)),
      value: null,
    };
  }

  componentDidMount() {
    //  const answers = question
    // make a call using redux

    this.setState({
      questionsData: questions,
      answers: [2, 4, 3, 3, 3],
    });
    // fire function given by redux
    console.log(this.props, "handleLive Component did mount");
  }

  //   componentDidUpdate(prevState, prevProps) {

  //     if(this.props.questions.length>0){

  //     }

  //    }

  //    static getDerivedStateFromProps(props, state) {
  //     if (props.questions.length !== state.questionsData.length) {
  //       return {
  //         questionsData: props.questions,
  //       };
  //     }

  //     // Return null if the state hasn't changed
  //     return null;
  //   }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     return nextProps.questions.length != this.props.questions.length;
  // }

  handleClearResponse = (index, blankClearAttempt) => {
    if(!blankClearAttempt){

    let updatedUserAnswers = this.state.userAnswers;
    updatedUserAnswers[index] = undefined;
    this.setState({
        totalAnswered: this.state.totalAnswered - 1,
        totalPending: this.state.totalPending + 1,
        userAnswers: updatedUserAnswers,
      });
}

  };
  questionAnswered = (index, option, changed) => {
    if (!changed) {
      let updatedScore = this.state.totalScore;
      if (this.state.answers[index] === option) {
        updatedScore = updatedScore + 1;
      }
      let updatedUserAnswers = this.state.userAnswers;
      updatedUserAnswers[index] = option;
      this.setState({
        totalAnswered: this.state.totalAnswered + 1,
        totalPending: this.state.totalPending - 1,
        userAnswers:updatedUserAnswers,
      });
    } else {
      let updatedScore = this.state.totalScore;
      if (this.state.answers[index] === option) {
        updatedScore = updatedScore + 1;
      } else {
        updatedScore = updatedScore - 1;
      }
      // answers array
      let updatedUserAnswers = this.state.userAnswers;
      updatedUserAnswers[index] = option;
      this.setState({
        totalScore: updatedScore,
        userAnswers:updatedUserAnswers
      });
    }
  };
  handleQuestionClick = (index) => {
    this.setState({
      activateQue: index,
    });
    console.log(`question ${index - -1} Clicked`);
  };

  render() {
      console.log(this.state.userAnswers);
    return (
      <>
        <div className="question_board dashboard">
          <div className="left__side">
            <div className="score">
              {`Activated Questions ${this.state.activateQue}`}
            </div>
            <div className="questions__status">
              <div className="total__answered box">
                <span className="count__answered">
                  {this.state.totalAnswered}{" "}
                </span>
                Answered
              </div>
              <div className="total__flagged box">
                <span className="count__flagged">0 </span>Flagged
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
            />
          </div>
          <RightSide
            activateQue={this.state.activateQue}
            questionsData={this.state.questionsData}
            questionAnswered={this.questionAnswered}
            handleClearResponse={this.handleClearResponse}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTest: state.selectedTest.selectedTestData,
    questions: [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTimer: (data) => dispatch(updateTimeSpentByStudent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleLiveTest);
