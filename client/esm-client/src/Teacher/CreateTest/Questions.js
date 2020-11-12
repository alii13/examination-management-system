import React, { useState } from "react";
import { Input, Popover } from "antd";
import { AiFillPlusCircle } from "react-icons/ai";

export default function Rules(props) {
  const [questionDescripiton, setQuestionDescripiton] = useState("");
  const [opiton1, setOption1] = useState("");
  const [opiton2, setOption2] = useState("");
  const [opiton3, setOption3] = useState("");
  const [opiton4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const submitInput = (
    <div>
      <p className="verified-popover ">Add Question</p>
    </div>
  );

  const handleOnChangeQuestion = (e) => {
    setQuestionDescripiton(e.target.value);
  };
  const handleOption1 = (e) => {
    setOption1(e.target.value);
  };
  const handleOption2 = (e) => {
    setOption2(e.target.value);
  };
  const handleOption3 = (e) => {
    setOption3(e.target.value);
  };
  const handleOption4 = (e) => {
    setOption4(e.target.value);
  };
  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };
  const handleAddQuestion = () => {
    const questionData = {
      questionDescripiton,
      opiton1,
      opiton2,
      opiton3,
      opiton4,
      answer,
    };

    props.addQuestion(questionData);
    console.log(questionData);
    setQuestionDescripiton("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswer("");
  };

  return (
    <>
      <div className="rules__wrapper">
        <div className="options__wrapper ">
          <Input.TextArea
            placeholder="Question Description"
            className="input "
            value={questionDescripiton}
            onChange={handleOnChangeQuestion}
            style={{ margin: "0 5px" }}
          />
          <div className="add__new" onClick={handleAddQuestion}>
            {
              <Popover content={submitInput}>
                <AiFillPlusCircle className="success" />
              </Popover>
            }
          </div>
        </div>
        <div className="question__options">
          <Input
            placeholder="Option 1"
            className="input option"
            value={opiton1}
            onChange={handleOption1}
            style={{ margin: "10 5px" }}
          />
          <Input
            placeholder="Option 2"
            className="input option"
            value={opiton2}
            onChange={handleOption2}
            style={{ margin: "10 5px" }}
          />
          <Input
            placeholder="Option 3"
            className="input option"
            value={opiton3}
            onChange={handleOption3}
            style={{ margin: "10 5px" }}
          />
          <Input
            placeholder="Option 4"
            className="input option"
            value={opiton4}
            onChange={handleOption4}
            style={{ margin: "10 5px" }}
          />
          <Input
            placeholder="Enter Correct Option No. i.e 1, 2 etc"
            type="number"
            className="input option"
            value={answer}
            onChange={handleAnswer}
            style={{ margin: "10 5px" }}
            min={1}
            max={4}
            
          />
        </div>
      </div>
    </>
  );
}
