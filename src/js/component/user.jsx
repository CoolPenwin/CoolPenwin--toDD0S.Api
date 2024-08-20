import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const VisualTodDo = () => {
  return (
    <div className="text-center">
      <div className="container">
        <h1>toDos</h1>
        <div className="todo-list">
          <input
            type="text"
            // value={newTask}
            // onChange={(e) => setNewTask(e.target.value)}
            // onKeyPress={handleKeyPress}
            placeholder="Añadir nueva tarea"
          />
          {/* {tasks.length === 0 && ( */}
          <div
            className="alert alert-danger d-flex align-items-center mt-3"
            role="alert"
          >
            <FontAwesomeIcon icon={faExclamationTriangle} className="fa-3" />
            <div className="ms-1">No hay tareas, añadir tareas</div>
          </div>
          {/* // )} */}
          <ul>
            {/* {tasks.map((task, index) => ( */}
            <li
              // key={index}
              className="todo-item "
            >
              <input
                type="checkbox"

                // checked={task.completed}

                // onChange={() => toggleTaskCompletion(index)}
              />
              <span
                className="todo-text"
                style={
                  {
                    // textDecoration: task.completed ? "line-through" : "none",
                  }
                }
              >
                {/* {task.text} */}
              </span>
              <button
                type="button"
                style={{ border: "none", background: "none" }}
                className="col-1 btn btn-outline-light -danger-text-emphasis"
                // onClick={() => deleteTask(index)}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="-danger-text-emphasis"
                />
              </button>
            </li>
            {/* // ))} */}
          </ul>
          <div className="footer">
            <span>
              {/* {countIncompleteTasks()}  */}
              items left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualTodDo;
