import React, { useEffect, useState } from "react";
import "../public/App.css"
function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((data) => data.json())
      .then((datos) => {
        setPokemonData(datos.results);
      })
      .catch((err) => {
        console.log("Error al traer los datos: ", err);
      });
  }, []);

  return (
    <div>
      <h1>Listado de Pokémones</h1>
      <ul>
        {pokemonData.map((pokemon, index) => (
          <li key={index}>
            <h3>Nombre: {pokemon.name}</h3>
            <a href={pokemon.url}>Mas información</a>
            {/* <p onClick={}>Eliminar</p> */}
            <p>Eliminar</p>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;
