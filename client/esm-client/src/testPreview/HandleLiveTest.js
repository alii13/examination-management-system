import React, { Component } from "react";
import { questions } from "./mockData";
import { connect } from "react-redux";
import { updateTimeSpentByStudent } from "../actions/attemptTestActions";
import "./HandleLiveTest.css";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Footer from "./Footer";

class HandleLiveTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testID: undefined,
      totalMinutes: undefined,
      questionsData: [],
      answers: [],
      totalScore: 0,
      footerClick:false,
      activateQue: 0,
      totalAnswered: 0,
      answered:false,
      totalPending: 5,
      totalFlagged: 0,
      flag:false,
      questionIndex:0,
      userAnswers:Array.apply(undefined, Array(5)),
      value: undefined,
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

  //   shouldComponentUpdate(nextProps, nextState) {
  //     return nextProps.questions.length != this.props.questions.length;
  // }
  changeActivatedQueFromFooter = (changeActivatedQue) => {
      if(changeActivatedQue !== "flag__question")
      this.child.changeActivatedQueInChild(changeActivatedQue)
      else{
        
        
      } 
  }
  changeParentActivatedQue = (index)=>{
      this.setState({
        activateQue:index,
        footerClick:true,
      })

  }


  handleFooterButtons = (buttonClicked)=>{
      this.changeActivatedQueFromFooter(buttonClicked);
  }

  handleClearResponse = (index, blankClearAttempt) => {
    if(!blankClearAttempt){

    let updatedUserAnswers = this.state.userAnswers;
    updatedUserAnswers[index] = undefined;
    this.setState({
        totalAnswered: this.state.totalAnswered - 1,
        totalPending: this.state.totalPending + 1,
        userAnswers: updatedUserAnswers,
        activateQue:index,
        footerClick:false,
        answered:false,
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
        activateQue:index,
        footerClick:false,
        answered:true,
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
        userAnswers:updatedUserAnswers,
        activateQue:index,
        footerClick:false,
        answered:true,
      });
    }
  };
  handleQuestionClick = (index) => {
    this.child.changeActivatedQueInChild(index)
  };

  render() {
      console.log(this.state.userAnswers);
    return (
      <>
        <div className="question_board dashboard">
          <div className="left__side">
            <div className="score">
              {`Activated Questions Parent ${this.state.activateQue}`}
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
              activateQue={this.state.activateQue}
              footerClick={this.state.footerClick}
              onRef={ref => (this.child = ref)}
              answered={this.state.answered}
            />
          </div>
          <RightSide
            questionsData={this.state.questionsData}
            questionAnswered={this.questionAnswered}
            questionIndex={this.state.questionIndex}
            handleClearResponse={this.handleClearResponse}
            onRef={ref => (this.child = ref)}
            changeParentActivatedQue={this.changeParentActivatedQue}
          />
          <div className="footer">
              <Footer handleFooterButtons={this.handleFooterButtons}/>
          </div>
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
