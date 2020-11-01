import React, { Component } from "react";

export default class Footer extends Component {
  handleNext = (e) => {
    //this.props.handleNextButton()
    // console.log(e.currentTarget.classList[0])
    this.props.handleFooterButtons(e.currentTarget.classList[0]);
  };
  submitTest = () => {
    this.props.handleSubmitTest();
  };
  render() {
    return (
      <>
        <div className="footer__wrapper">
          <div className="left__footer">
            <div
              className="previous__question box"
              onClick={(e) => this.handleNext(e)}
            >
              Previous
            </div>
            <div
              className="flag__question box"
              onClick={(e) => this.handleNext(e)}
            >
              Flag
            </div>
            <div
              className="next__question box"
              onClick={(e) => this.handleNext(e)}
            >
              Next
            </div>
          </div>
          <div className="right__footer">
            <div className="end__test box" onClick={this.submitTest}>
              End Test
            </div>
          </div>
        </div>
      </>
    );
  }
}
