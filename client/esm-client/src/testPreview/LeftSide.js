import React, { Component } from "react";

export default class LeftSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsData: [],
      selectRef:null
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      questionsData: props.questionsData,
      activateQue:props.activateQue,

    };
  }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps === this.props){
            return false
        }
        else if(nextProps.selectRef !== this.props.selectRef){
            return false
        }else{
            return true
        }
     
    
  }
  render() {
    //let selectRef,selectedData = {};
    const handleClick = (e, index) => {
        console.log(this.state.selectRef);

      if (this.state.selectRef) {
        this.state.selectRef.classList.remove("selected");
      }
      //selectRef = e.currentTarget;
      this.setState({
        selectRef: e.currentTarget
      })
      e.currentTarget.classList.add("selected");
      //selectedData = this.state.questionsData[index];
      this.props.handleQuestionClick(index);
    };

    return (
      <>
          <div className="questions__wrapper">
            {this.state.questionsData &&
              this.state.questionsData.map((question, index) => (
                <div
                  className="question"
                  onClick={(e) => handleClick(e, index)}
                  key={index}
                >
                  {question.questionIndex - -1}
                </div>
              ))}
          </div>
      </>
    );
  }
}
