import React, { Component } from "react";

export default class LeftSide extends Component {
  constructor(props) {
    super(props);
    this.accordionContent = [];
    this.state = {
      questionsData: [],
      selectRef: undefined,
      activateQue: 0,
      footerClick: false,
      leftActiveQue:0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      questionsData: props.questionsData,
      activateQue: props.activateQue,
      footerClick: props.footerClick,
    };
  }

  changeBg = (activatedQue, answered) => {
    console.log("change BG", activatedQue);
    if (this.state.selectRef) {
      this.state.selectRef.classList.remove("selected");
      if (answered == false) {
        this.state.selectRef.classList.remove("answered");
      }
    }
    if (this.accordionContent[activatedQue])
      this.accordionContent[activatedQue].classList.add("selected");
    if (answered) {
      this.accordionContent[activatedQue].classList.add("answered");
    }
    this.setState({
      selectRef: this.accordionContent[activatedQue],
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps === this.props &&
      nextProps.activateQue == this.props.activateQue
    ) {
      console.log("component will no re render");
      return false;
    } else if (nextProps.selectRef !== this.props.selectRef) {
      return false;
    } else {
      this.changeBg(nextProps.activateQue, nextProps.answered);

      return true;
    }
  }
  setFlag=()=>{
    
    this.state.selectRef.classList.add("add-flag");
  }
  // componentDidMount(){
  //   // this.setState({
  //   //   selectRef: this.accordionContent[0]
  //   // })
  //   console.log(this.accordionContent[0])
  // }

  render() {
    // if(this.accordionContent){
    //   console.log(this.accordionContent)
    //   // this.setState(
    //   //   {
    //   //     selectRef: this.accordionContent[0]
    //   //   }
    //   // )
    // }
    //let selectRef,selectedData = {};
    console.log(this.state.leftActiveQue);
    const handleClick = (e, index) => {
      if (this.state.selectRef) {
        this.state.selectRef.classList.remove("selected");
      }
      //selectRef = e.currentTarget;
      this.setState({
        selectRef: this.accordionContent[index],
        leftActiveQue:index
      });
      this.accordionContent[index].classList.add("selected");
      //selectedData = this.state.questionsData[index];
      this.props.handleQuestionClick(index);
    };

    return (
      <>
        <div className="questions__wrapper">
          <div className="">Inside left {this.state.leftActiveQue}</div>
          {this.state.questionsData &&
            this.state.questionsData.map((question, index) => (
              <div
                className={`question`}
                ref={(ref) => (this.accordionContent[index] = ref)}
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
