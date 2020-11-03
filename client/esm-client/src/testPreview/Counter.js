import React, { useState, useEffect } from "react";
import CountdownTimer from "react-component-countdown-timer";

export default function Counter(props) {
  const { testID, totalMinutes } = props;
  let time;
  if (JSON.parse(localStorage.getItem(`${testID}`)) == null) {
    time = parseInt(totalMinutes) * 60;
  } else {
    const testData = JSON.parse(localStorage.getItem(`${testID}`));
    let remainingTime = testData.rM;
    time = parseInt(remainingTime * 60);
  }
  const handleCounterEnd =()=>{
    props.handleCounter();
  }

  return (
    <>
      <CountdownTimer count={time} hideDay={true} onEnd={handleCounterEnd} />
    </>
  );
}
