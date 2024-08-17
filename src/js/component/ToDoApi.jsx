import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const ToDoApi = () => {

/* -----pseudo codigo API-----
1 POST https://playground.4geeks.com/todo/users/<userName>


*/
// let url = "https://playground.4geeks.com/todo/users/CoolPenwin";
// let options = {
//   mothod: "PUT", //o "POST" "GET"
//   body: JSON.stringify(todos),
//   headers: {
//     "Content-Type": "application/json"
//   }
// }
//   fetch(url, options)
     
//     .then(resp => {
//         console.log(resp.ok); // Será true si la respuesta es exitosa
//         console.log(resp.status); // El código de estado 200, 300, 400, etc.
//         console.log(resp.text()); // Intentará devolver el resultado exacto como string
//         return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
//     })
//     .then(data => {
//         // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
//         console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
//     })
//     .catch(error => {
//         // Manejo de errores
//         console.log(error);
//     });

    useEffect(() => {
      fetch("https://playground.4geeks.com/todo/users/CoolPenwin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
            "name": "CoolPenwin",
            "todos": [
              {
                "label": "Hacer Kama",
                "is_done": false,
                "id": 311
              },
              {
                "label": "querrás decir hacer cama? ",
                "is_done": false,
                "id": 313
              }
            ]
          
          // Aquí van los datos del usuario que quieres crear
        }),
      })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error('Error:', error));
    }, []);



  return (
    <div className="text-center">
      <div className="container">
        <h1>toDos</h1>
        <div className="todo-list">
          <input
            type="text"
         
            placeholder="Añadir nueva tarea"
          />

          <div className="footer">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoApi;