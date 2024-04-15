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
      <div className="title">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt=""  width={"500px"}/>
      </div>
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
