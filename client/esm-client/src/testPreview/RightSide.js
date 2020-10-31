import React, { Component } from "react";
import { Radio, Input } from "antd";

export default class RightSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activateQue: 0,
      questionsData: [],
      changeIndex:0,
      questionIndex:0,
      selectedAnswers: Array.apply(undefined, Array(5))
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      questionsData: props.questionsData,
      questionIndex: props.questionIndex,
    };
  }
       
  handleClearResponse = (index) => {
    let newSelectedAnswers = this.state.selectedAnswers;
    console.log(newSelectedAnswers[index]);
    let blankClearAttempt = (newSelectedAnswers[index]===undefined)?true:false;

    newSelectedAnswers[index] = undefined;
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
  componentDidMount() {
    this.props.onRef(this)
  }

  changeActivatedQueInChild =(changeActivatedQue)=>{
    console.log(changeActivatedQue)

    if(changeActivatedQue==="next__question"){
      console.log("insdie if")
      console.log(this.state.questionsData.length,this.state.activateQue)
      if(this.state.activateQue<this.state.questionsData.length-1){
      this.setState({
        activateQue:this.state.activateQue+1
      })
      this.props.changeParentActivatedQue(this.state.activateQue+1);
    }
    }
    else if(changeActivatedQue==="previous__question"){
      if(this.state.activateQue>0){
      this.setState({
        activateQue:this.state.activateQue-1
      })
      this.props.changeParentActivatedQue(this.state.activateQue-1);
    }
    }else if(changeActivatedQue==="flag__question"){
      console.log("flagged")
    }else{
      this.setState({
        activateQue:changeActivatedQue
      })

    }
    
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  render() {
    console.log(this.state.selectedAnswers)
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };

    return (
      <>
        <div className="descripiton__wrapper">
    <div className="question__no">Question {this.state.activateQue+1} out of {5}</div>
          {this.state.questionsData &&
            this.state.questionsData.map((question, index) => {
              if ((this.state.activateQue === index)) {
                return (
                  <div className="description__box" key={index}>
                    <div className="descripiton"> {question.description}</div>
                    <div className="options">
                      <Radio.Group onChange={(e)=> this.onChange(e, index)} value={this.state.selectedAnswers[index]}>
                        <Radio style={radioStyle} value={1}>
                         {question.options[0].option}
                        </Radio>
                        <Radio style={radioStyle} value={2}>
                        {question.options[1].option}
                        </Radio>
                        <Radio style={radioStyle} value={3}>
                        {question.options[2].option}
                        </Radio>
                        <Radio style={radioStyle} value={4}>
                        {question.options[3].option}
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
