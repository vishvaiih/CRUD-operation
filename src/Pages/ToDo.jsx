import React, { useEffect, useState } from "react";

function ToDo() {
  const [task, setTask] = useState("");
  const [toDo, setToDo] = useState([]);

  const [editId, setEditId] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") {
      return;
    }

    console.log("task", task);

    const newtask = {
      id: Math.random() * Math.pow(5, 9),
      task: task,
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
        {toDo?.map((itm) => (
          <div className="sidebyside">
            <p>{itm.task}</p>
            <div className="buttons">
              <button onClick={() => handleDelete(itm.id)}>DELETE</button>
              <button onClick={() => handleEdit(itm.id)}>EDIT</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDo;
