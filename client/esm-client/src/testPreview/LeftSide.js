import React, { Component } from "react";

export default class LeftSide extends Component {
  constructor(props) {
    super(props);
    this.accordionContent = [];
    this.state = {
      questionsData: [],
      selectRef: undefined,
      activateQue: 0,
      leftActiveQue: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      questionsData: props.questionsData,
      activateQue: props.activateQue,
      footerClick: props.footerClick,
    };
  }

  changeBg = (activatedQue, answered, footerClicked) => {
    if (this.state.selectRef) {
      this.state.selectRef.classList.remove("selected");
      if (answered == false) {
        this.state.selectRef.classList.remove("answered");
      }
    }
    if (this.accordionContent[activatedQue])
      this.accordionContent[activatedQue].classList.add("selected");
    if (answered && footerClicked == false) {
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
      return false;
    } else if (nextProps.selectRef !== this.props.selectRef) {
      return false;
    } else if (nextProps.flag !== this.props.flag) {
      return false;
    } else {
      this.changeBg(
        nextProps.activateQue,
        nextProps.answered,
        nextProps.footerClick
      );

      return true;
    }
  }
  flagQuestion = () => {
    this.state.selectRef.classList.add("flagged");
  };
  componentDidMount() {
    this.props.flagClicked(this.flagQuestion);
  }

  setFlag = () => {
    this.state.selectRef.classList.add("add-flag");
  };

  render() {
    const handleClick = (e, index) => {
      if (this.state.selectRef) {
        this.state.selectRef.classList.remove("selected");
      }

      this.setState({
        selectRef: this.accordionContent[index],
        leftActiveQue: index,
      });
      this.accordionContent[index].classList.add("selected");

      this.props.handleQuestionClick(index);
    };

    return (
      <>
        <div className="questions__wrapper">
          {this.state.questionsData &&
            this.state.questionsData.map((question, index) => (
              <div
                className={`question`}
                ref={(ref) => (this.accordionContent[index] = ref)}
                onClick={(e) => handleClick(e, index)}
                key={index}
              >
                {index - -1}
              </div>
            ))}
        </div>
      </>
    );
  }
}
