import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTimeSpentByStudent } from "../actions/attemptTestActions";

class TestPreview extends Component {

    state = {
        testName: this.props.selectedTest.testName,
        minutes: this.props.selectedTest.minutes,
        _id: this.props.selectedTest._id,
        intervalId:null
    }

    componentDidMount() {
        this.loadData();
         const  intervalID = setInterval(this.loadData.bind(this), 60000);
        this.setState({intervalId: intervalID});
      }
      componentWillUnmount() {
        clearInterval(this.state.intervalId);
     }

  loadData() {
    try {

       let testName, minutes, _id;
       if(localStorage.getItem('trash')===null){
          testName=this.state.testName;
          minutes=this.state.minutes;
          _id=this.state._id;
          localStorage.setItem('trash', JSON.stringify({testName,minutes,_id}));
       }else{
        console.log("else part")
         const testData = JSON.parse(localStorage.getItem('trash'));
         testName=testData.testName;
         minutes=testData.minutes;
         _id=testData._id;
       }
       
        const  profileID = localStorage.getItem("profileID"), completed = false;
        const testData = JSON.parse(localStorage.getItem('trash'));
         let updatingAttemptedMinutes = localStorage.getItem(testData._id);
      
        const data = {
          profileID,
          testName,
          _id,
          completed,
          minutes,
          updatingAttemptedMinutes,
        };
        //console.log(this.props.selectedTest, "props")
        if(_id){
        this.props.updateTimer(data);
        }
    
    } catch (e) {
      console.log(e);
    }
  }

  render() {


    return (
      <>
        <p>Test Preview</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(TestPreview);
