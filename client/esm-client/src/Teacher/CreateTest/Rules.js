import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Input, Popover } from "antd";

export default function Rules(props) {
  const [rule, setRule] = useState("");
  const submitInput = (
    <div>
      <p className="verified-popover ">Add Rule</p>
    </div>
  );

  const handleOnChnage = (e) => {
    setRule(e.target.value);
  };
  const handleAddRule = () => {
    if (rule !== "") {
      props.addRule(rule);
      setRule("");
    }
  };
  
  return (
    <>
      <div className="rules__wrapper">
        <div className="options__wrapper">
          <Input
            placeholder="Write your rule for test"
            className="input"
            value={rule}
            onChange={handleOnChnage}
            style={{ margin: "0 5px" }}
          />
          <div className="add__new" onClick={handleAddRule}>
            {
              <Popover content={submitInput}>
                <AiFillPlusCircle className="success" />
              </Popover>
            }
          </div>
        </div>
      </div>
    </>
  );
}
