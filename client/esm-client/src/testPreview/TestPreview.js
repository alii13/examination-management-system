import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTimeSpentByStudent } from "../actions/attemptTestActions";
import Counter from "./Counter";
import HandleLiveTest from "./HandleLiveTest";

class TestPreview extends Component {
  state = {
    testName: this.props.selectedTest.testName,
    minutes: this.props.selectedTest.minutes,
    _id: this.props.selectedTest._id,
    intervalId: null,
    timer: this.props.timer,
  };

  componentDidMount() {
    this.loadData(this.state._id);
    const intervalID = setInterval(this.loadData.bind(this), 60000);
    this.setState({ intervalId: intervalID, timer: this.state.timer });
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  handleCounter =()=>{
    this.clickChild();
  }

  loadData() {
    try {
      //   let testName, minutes, _id;
      let testName, tM, _id, rM;
      if (JSON.parse(localStorage.getItem(this.state._id)) === null) {
        testName = this.state.testName;
        tM = this.state.minutes;
        _id = this.state._id;
        rM = tM;
        localStorage.setItem(
          `${_id}`,
          JSON.stringify({ testName, _id, tM, rM })
        );
      } else {
        const testData = JSON.parse(localStorage.getItem(`${this.state._id}`));

        let { testName, tM, _id, rM } = testData;
        rM = rM - 1;
        localStorage.setItem(
          `${_id}`,
          JSON.stringify({ testName, _id, tM, rM })
        );
      }

      //   const profileID = localStorage.getItem("profileID"),
      //     completed = false;
      //   const testData = JSON.parse(localStorage.getItem("trash"));
      //   let updatingAttemptedMinutes = localStorage.getItem(testData._id);

      //   const data = {
      //     profileID,
      //     testName,
      //     _id,
      //     completed,
      //     minutes,
      //     updatingAttemptedMinutes,
      //   };
      //   //console.log(this.props.selectedTest, "props")
      //   if (_id) {
      //    // this.props.updateTimer(data);
      //   }
    } catch (e) {
      console.log(e);
    }
  }
  
 

  render() {
    return (
      <>
        <Counter testID={this.state._id} totalMinutes={this.state.minutes} handleCounter ={this.handleCounter}/>
        <HandleLiveTest
          testID={this.state._id}
          totalMinutes={this.state.minutes}
          testName={this.state.testName}
          testName={this.state.testName}
          totalMinutes={this.state.minutes}
          counterEnd ={click => this.clickChild = click}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTest: state.selectedTest.selectedTestData,
    timer: state.userAttemptedTime.attemptedTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTimer: (data) => dispatch(updateTimeSpentByStudent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestPreview);
