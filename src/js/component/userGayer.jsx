import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const OseaVisualTodDo = () => {
  const [username, setUsername] = useState("CoolPenwin");
  // const [username, setUsername] = useState("loool");
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [donE, setdonE] = useState(false);

  useEffect(() => {
    if (username) {
      const url = `https://playground.4geeks.com/todo/users/${username}`;

      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            return fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: username,
                todos: [],
              }),
            }).then((response) => {
              if (!response.ok) {
                throw new Error("Error en la creación del usuario");
              }
              return response.json();
            });
          } else {
            throw new Error("Error al verificar el usuario");
          }
        })
        .then((data) => {
          setUsername(data.name);
          console.log("Usuario creado/verificado:", data.name);
          return fetch(`https://playground.4geeks.com/todo/users/${username}`);
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener las tareas del usuario");
          }
          return response.json();
        })
        .then((todosData) => {
          setTodos(todosData.todos);
          console.log("Tareas del usuario obtenidas:", todosData.todos);
          if (todosData.todos.length === 0) {
            addInitialTodo();
          }
        })
        .catch((error) => {
          setError(error.message);
          console.error("Error:", error.message);
        });
    }
  }, [username]);

  // useEffect(() => {
  //   if (username) {
  //     const url = `https://playground.4geeks.com/todo/users/${username}`;

  //     fetch(url)
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         } else if (response.status === 404) {
  //           return fetch(url, {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               name: username,
  //               todos: [],
  //             }),
  //           }).then((response) => {
  //             if (!response.ok) {
  //               throw new Error("Error en la creación del usuario");
  //             }
  //             return response.json();
  //           });
  //         } else {
  //           throw new Error("Error al verificar el usuario");
  //         }
  //       })
  //       .then((data) => {
  //         setUsername(data.name);
  //         console.log("Usuario creado/verificado:", data.name);
  //         return fetch("https://playground.4geeks.com/todo/users");
  //       })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Error al traer la lista de usuarios");
  //         }
  //         return response.json();
  //       })
  //       .then((usersData) => {
  //         setUsers(usersData.users);
  //         console.log("Lista de usuarios obtenida:", usersData.users);
  //         // Añadir el nuevo todo después de verificar o crear el usuario
  //         addInitialTodo();
  //       })
  //       .catch((error) => {
  //         setError(error.message);
  //         console.error("Error:", error.message);
  //       });
  //   }
  // }, [username]);

  const addInitialTodo = () => {
    if (todos.length > 0) {
      return; // Si ya hay tareas, no hacer nada
    }

    const initialTodos = [
      { label: "Tarea 1", is_done: false },
      { label: "Tarea 2", is_done: true },
      { label: "Tarea 3", is_done: false },
    ];

    initialTodos.forEach((todo) => {
      const userUrl = `https://playground.4geeks.com/todo/todos/${username}`;

      fetch(userUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al crear el todo");
          }
          return response.json();
        })
        .then((data) => {
          setTodos((prevTodos) => [...prevTodos, data]); // Añadir el nuevo todo al estado
          console.log("Nuevo todo creado:", data);
        })
        .catch((error) => {
          setError(error.message);
          console.error("Error:", error.message);
        });
    });
  };

  const handleUserChange = (event) => {
    const selectedUserName = event.target.value;
    const userUrl = `https://playground.4geeks.com/todo/users/${selectedUserName}`;

    fetch(userUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }
        return response.json();
      })
      .then((userData) => {
        setUsername(userData.name);
        setTodos(userData.todos);
        console.log("Datos del usuario seleccionado:", userData);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error:", error.message);
      });
  };

  const deleteToDo = (id) => {
    const userUrl = `https://playground.4geeks.com/todo/todos/${id}`;

    fetch(userUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el todo");
        }
        // Actualizar el estado de todos después de eliminar
        setTodos(todos.filter((todo) => todo.id !== id));
        console.log("Todo eliminado:", id);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error:", error.message);
      });
  };
  const countTodosDone = () => {
    const count = todos.reduce(
      (acc, todo) => {
        if (todo.donE) {
          acc.done += 1;
        } else {
          acc.notDone += 1;
        }
        return acc;
      },
      { done: 0, notDone: 0 }
    );

    return count;
  };

  const handleTodoChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].is_done = !updatedTodos[index].is_done;
  
    const userUrl = `https://playground.4geeks.com/todo/todos/${updatedTodos[index].id}`;
  
    fetch(userUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: updatedTodos[index].label,
        is_done: updatedTodos[index].is_done,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el todo");
        }
        return response.json();
      })
      .then((data) => {
        setTodos(updatedTodos);
        console.log("Todo actualizado:", data);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error:", error.message);
      });
  };

  const handleAddTodo = () => {
    const userUrl = `https://playground.4geeks.com/todo/todos/${username}`;

    fetch(userUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: newTodo,
        is_done: false,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear el todo");
        }
        return response.json();
      })
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo("");
        console.log("Nuevo todo creado:", data);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error:", error.message);
      });
  };

  const deleteToDD0S = () => {
    const deletePromises = todos.map(todo => {
      const userUrl = `https://playground.4geeks.com/todo/todos/${todo.id}`;
  
      return fetch(userUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  
    Promise.all(deletePromises)
      .then(responses => {
        const allSuccessful = responses.every(response => response.ok);
        if (!allSuccessful) {
          throw new Error("Error al eliminar uno o más todos");
        }
        setTodos([]); // Vaciar la lista de todos
        console.log("Todos los todos han sido eliminados");
      })
      .catch(error => {
        setError(error.message);
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="text-center">
      <div className="container">
        <h1>{username}</h1>
        <h2>toDos</h2>
        <div className="todo-list">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Añadir nueva tarea"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
          />
          {todos.length === 0 && (
            <div
              className="alert alert-danger d-flex align-items-center mt-3"
              role="alert"
            >
              <FontAwesomeIcon icon={faExclamationTriangle} className="fa-3" />
              <div className="ms-1">No hay tareas, añadir tareas</div>
            </div>
          )}

          {todos.length > 0 && (
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={todo.is_done}
                    onChange={() => handleTodoChange(index)}
                  />
                  <span
                    style={{
                      textDecoration: todo.is_done ? "line-through" : "none",
                    }}
                  >
                    {todo.label}
                  </span>
                  <button
                    type="button"
                    style={{ border: "none", background: "none" }}
                    className="col-1 btn btn-outline-light -danger-text-emphasis"
                    onClick={() => deleteToDo(todo.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="-danger-text-emphasis"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="footer">
            <span>
              {
                todos.length // crear [toDos.done.length][toDos.noDone.length]
              } items on list <button
              type="button"
              style={{ border: "none", background: "none" }}
              className="col-1 btn btn-outline-light -danger-text-emphasis"
              onClick={deleteToDD0S}

            >
              <FontAwesomeIcon
                icon={faTrash}
                className="-danger-text-emphasis"
              />
            </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OseaVisualTodDo;
