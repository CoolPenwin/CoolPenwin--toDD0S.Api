import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = 'https://playground.4geeks.com/todo/users/loool';

    // Verificar si el usuario ya existe
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          // Usuario no encontrado, proceder a crearlo
          return fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: "loool",
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
        // Establecer el nombre de usuario
        setUsername(data.name);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {username && (
        <div>
          <h1>{username}</h1>
        </div>
      )}
    </div>
  );
};

// export default MyComponent;