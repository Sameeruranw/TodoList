import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [task, setTask] = useState();
  const handleClick = () => {
    axios
      .post("http://localhost:5000/add", { task: task })
      .then(result => location.reload())
      .catch(err => 
        console.log(err));
  };

  const handleKeyPress = (e) =>{
    if(e.keyCode === "enter"){
        handleClick()
    }
  }

  return (
    <>
      <div className="create_form">
        <input
          type="text"
          placeholder="enter the task"
          value={task}
          onKeyPress={handleKeyPress}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleClick} >submit</button>
      </div>
    </>
  );
};

export default Create;
