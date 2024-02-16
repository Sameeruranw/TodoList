import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const Home = () => {
  const [todos, settodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => settodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:5000/update/" + id)
      .then(result =>{
        location.reload()
      } 
      
      )
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) =>{
    axios.delete("http://localhost:5000/delete/" + id)
    .then(result =>{
        location.reload()
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="home">
      <h1>Todo List</h1>
      <Create />
      {todos.length === 0 ? (
        <h1>No records found</h1>
      ) : (
        todos.map((todo, i) => (
          <div className="task" key={i}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <MdCheckBoxOutlineBlank />
              ) : (
                <IoIosCheckbox className="icon" />
              )}
            </div>
            <p>{todo.task}</p>
            <MdDelete className="icon" onClick={()=> handleDelete(todo._id)} />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
