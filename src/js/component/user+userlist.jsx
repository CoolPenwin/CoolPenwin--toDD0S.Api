import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  // const [username, setUsername] = useState("CoolPenwin");
  const [username, setUsername] = useState("loool");
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(""); // Estado para el nuevo todo

  useEffect(() => {
    if (username) {
      const url = `https://playground.4geeks.com/todo/users/${username}`;

      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            return fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: username,
                todos: []
              }),
            }).then(response => {
              if (!response.ok) {
                throw new Error('Error en la creación del usuario');
              }
              return response.json();
            });
          } else {
            throw new Error('Error al verificar el usuario');
          }
        })
        .then(data => {
          setUsername(data.name);
          console.log("Usuario creado/verificado:", data.name);
          return fetch('https://playground.4geeks.com/todo/users');
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al traer la lista de usuarios');
          }
          return response.json();
        })
        .then(usersData => {
          setUsers(usersData.users);
          console.log("Lista de usuarios obtenida:", usersData.users);
          // Añadir el nuevo todo después de verificar o crear el usuario
          addInitialTodo();
        })
        .catch(error => {
          setError(error.message);
          console.error("Error:", error.message);
        });
    }
  }, [username]);

  const addInitialTodo = () => {
    const userUrl = `https://playground.4geeks.com/todo/todos/${username}`;
    
    fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: "vuestra merced ha sido jackeada ",
        is_done: true
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al crear el todo');
      }
      return response.json();
    })
    .then(data => {
      setTodos([...todos, data]); // Añadir el nuevo todo al estado
      console.log("Nuevo todo creado:", data);
    })
    .catch(error => {
      setError(error.message);
      console.error("Error:", error.message);
    });
  };

  const handleUserChange = (event) => {
    const selectedUserName = event.target.value;
    const userUrl = `https://playground.4geeks.com/todo/users/${selectedUserName}`;

    fetch(userUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }
        return response.json();
      })
      .then(userData => {
        setUsername(userData.name);
        setTodos(userData.todos);
        console.log("Datos del usuario seleccionado:", userData);
      })
      .catch(error => {
        setError(error.message);
        console.error("Error:", error.message);
      });
  };
      

  // function handleTodoChange(id) {
  //   fetch(${apiUrl}/todos/${id}, { method: 'DELETE' })
  //   .then(response => {
  //     if (response.ok) {
  //           getTasks();
  //         } else {
  //           response.json().then(data => {
  //             console.error('Error deleting task:', data);
  //           });
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error deleting task:', error);
  //       });
  //     }
  
      const handleTodoChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].is_done = !updatedTodos[index].is_done;

    const userUrl = `https://playground.4geeks.com/todos/${todo.id}`;
    
    fetch(userUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        todos: updatedTodos.map(todo => ({
          id: todo.id,
          label: todo.label,
          is_done: todo.is_done
        }))
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al actualizar el todo');
      }
      return response.json();
    })
    .then(data => {
      setTodos(data.todos);
      console.log("Todo actualizado:", data.todos);
    })
    .catch(error => {
      setError(error.message);
      console.error("Error:", error.message);
    });
  };

  const handleAddTodo = () => {
    const userUrl = `https://playground.4geeks.com/todo/todos/${username}`;
    
    fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: newTodo,
        is_done: false
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al crear el todo');
      }
      return response.json();
    })
    .then(data => {
      setTodos([...todos, data]); // Añadir el nuevo todo al estado
      setNewTodo(""); // Limpiar el input
      console.log("Nuevo todo creado:", data);
    })
    .catch(error => {
      setError(error.message);
      console.error("Error:", error.message);
    });
  };

  console.log("Renderizando componente con usuarios:", users);

  return (
    <React.Fragment>
      <div>
        {error && <p>{error}</p>}
        {username && (
          <div>
            <h1>{username}</h1>
          </div>
        )}
        {users.length > 0 && (
          <select value={username} onChange={handleUserChange}>
            {users.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
        )}
        {todos.length > 0 && (
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                
                <span style={{ textDecoration: todo.is_done ? 'line-through' : 'none' }}>
                  {todo.label}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleAddTodo}
            placeholder="Nuevo todo"
          />
          <button onClick={handleAddTodo}>Añadir Todo</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyComponent;