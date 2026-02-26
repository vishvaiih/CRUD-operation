import { Pending } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

function ToDo() {
  const [task, setTask] = useState("");
  const [toDo, setToDo] = useState([]);

  const [editId, setEditId] = useState("");

  const [search,setSearch] = useState("");

  const [filterSerachTask,setFilterSearchTask] = useState([]);

  const handleAdd = () => {
    if (task.trim() === "") {
      return;
    }

    console.log("task", task);

    const newtask = {
      id: Math.random() * Math.pow(5, 9),
      task: task,
      status:"pending",
    };
    

    setToDo([...toDo, newtask]);

    setTask("");
  };

  useEffect(() => {
    if (toDo?.length > 0) {
      localStorage.setItem("task", JSON.stringify(toDo));
    }
  }, [task]);

  useEffect(() => {
    const getTask = JSON.parse(localStorage.getItem("task")) || [];
    setToDo(getTask);
  }, []);

  const handleDelete = (id) => {
    const updatedData = toDo?.filter((itm) => itm.id !== id);
    setToDo(updatedData);
    localStorage.setItem("task", JSON.stringify(updatedData));
  };

  const handleEdit = (id) => {
    setEditId(id);
    const find = toDo?.find((itm) => itm.id === id);
    setTask(find.task);
  };

  const handleCancel = () => {
    setTask("");
    setEditId("");
  }

  const handleUpdate = () => {
    const updateData = toDo?.map((itm) => 
        itm.id === editId ? {...itm, task: task} : itm
    
    )

    setToDo(updateData);
    setTask("");
    setEditId("");
  }

  const handleComplete = (id) => {
    console.log("vvv")
    const updateData = toDo?.map((itm) => 
      itm.id === id ? {...itm, status: itm.status === "pending" ? "complete" : "pending"} : itm 
  )
  setToDo(updateData);
  localStorage.setItem("task", JSON.stringify(updateData));

  }

  useEffect(() => {
       const  filterSearchTask = toDo?.filter((itm) => itm.task.includes(search))
       console.log(filterSearchTask,"/////")

       if(search == ""){
        setFilterSearchTask(toDo);
       }else{
        setFilterSearchTask(filterSearchTask);
       }

     
       
      

  },[search,toDo])

  return (
    <div className="mainDiv">
      <p className="todolist">TODO LIST</p>

      <input
        type="text"
        className="text"
        placeholder="Enter Task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      ></input>
      {!editId ? (
        <button className="btn" onClick={() => handleAdd()}>
          ADD
        </button>
      ) : (
        <>
          <button className="btn" onClick={() => handleCancel()}>
            CANCEL
          </button>
          <button className="btn" onClick={() => handleUpdate()}>
            UPDATE
          </button>
          
        </>
      )}

      <div className="tasklist">
      <input
        type="search"
        className="search"
        placeholder="Enter Task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>

        {filterSerachTask?.map((itm) => (
          <div className="sidebyside">
            <p style={{textDecoration: itm.status === "complete" ? "line-through" : "none" , color:itm.status === "complete" ? "green" : "red"}}>{itm.task}</p>
            <div className="buttons">
              <button onClick={() => handleDelete(itm.id)}>DELETE</button>
              <button onClick={() => handleEdit(itm.id)}>EDIT</button>
              <button style={{ minWidth: "100px" }} onClick={() => handleComplete(itm.id)}>{itm.status === "pending" ? "COMPLETE" : "PENDING"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDo;
