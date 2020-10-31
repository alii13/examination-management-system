import React, { Component } from "react";

export default class Footer extends Component {
    handleNext=(e)=>{
        //this.props.handleNextButton()
       // console.log(e.currentTarget.classList[0])
        this.props.handleFooterButtons(e.currentTarget.classList[0])
    }
  render() {
    return (
      <>
        <div className="footer__wrapper">
          <div className="previous__question box" onClick={(e)=>this.handleNext(e)}>Previous</div>
          <div className="flag__question box" onClick={(e)=>this.handleNext(e)}>Flag</div>
          <div className="next__question box" onClick={(e)=>this.handleNext(e)}>Next</div>
        </div>
      </>
    );
  }
}
