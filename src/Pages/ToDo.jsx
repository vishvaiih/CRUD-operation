import React, { useState } from 'react'

function ToDo() {

  const [task,settask] = useState("");
  const [toDo,setToDo] = useState([]);

  const handleAdd = () => {
        

         if(task.trim() === ""){
          return;
         }

         console.log("task",task)

         const newtask = {
          id : Math.random() * Math.pow(5,9),
          task : task,
         }

         setToDo([...toDo,newtask])
  }

  console.log("todo",toDo)

  return (
    <div className='mainDiv'>
    <p className="todolist">TODO LIST</p>

    <input type='text' className='text' placeholder='Enter Task...' onChange={(e) => settask(e.target.value)}></input>
    <button className='btn' onClick = {() => handleAdd()}>ADD</button>

    <div className='tasklist'>

        <div className='sidebyside'>
          <p>task 1</p>
          <div className='buttons'>
            <button>DELETE</button>
            <button>EDIT</button>
          </div>
        </div>

        
    </div>


  </div> 
  )
}

export default ToDo
