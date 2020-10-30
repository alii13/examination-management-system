import React, { Component } from "react";
import { Radio, Input } from "antd";

export default class RightSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activateQue: null,
      questionsData: [],
      questionIndex:0,
      selectedAnswers: Array.apply(null, Array(5))
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      questionsData: props.questionsData,
      activateQue: props.activateQue,
    };
  }
       
  handleClearResponse = (index) => {
    let newSelectedAnswers = this.state.selectedAnswers;
    console.log(newSelectedAnswers[index]);
    let blankClearAttempt = (newSelectedAnswers[index]===null)?true:false;

    newSelectedAnswers[index] = null;
    this.setState({
      selectedAnswers: newSelectedAnswers
    });
    this.props.handleClearResponse(index, blankClearAttempt);
    console.log("asnwer cleared og question", index-(-1));
  };
  onChange = (e, index) => {
    //console.log("radio checked", e.target.value);
    let newSelectedAnswers = this.state.selectedAnswers;
    if(newSelectedAnswers[index] ===undefined){
        this.props.questionAnswered(index, e.target.value, false);
    }else{
        this.props.questionAnswered(index, e.target.value, true);
    }
    newSelectedAnswers[index] = e.target.value;
    this.setState({
        value: e.target.value,
        selectedAnswers: newSelectedAnswers
      });
      
  

  };
  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };

    return (
      <>
        <div className="descripiton__wrapper">
          {this.state.questionsData &&
            this.state.questionsData.map((question, index) => {
              if ((this.state.activateQue === index)|| (this.state.activateQue == null && this.state.questionIndex === index)) {
                return (
                  <div className="description__box" key={index}>
                    <div className="descripiton"> {question.description}</div>
                    <div className="options">
                      <Radio.Group onChange={(e)=> this.onChange(e, index)} value={this.state.selectedAnswers[index]}>
                        <Radio style={radioStyle} value={1}>
                          Option A
                        </Radio>
                        <Radio style={radioStyle} value={2}>
                          Option B
                        </Radio>
                        <Radio style={radioStyle} value={3}>
                          Option C
                        </Radio>
                        <Radio style={radioStyle} value={4}>
                          Option D
                        </Radio>
                      </Radio.Group>
                      <div
                        className="clear__response"
                        onClick={() => this.handleClearResponse(index)}
                      >
                        Clear Response
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </>
    );
  }
}
