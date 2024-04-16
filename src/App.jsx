import { useEffect, useState } from "react";
import "../public/App.css";

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  useEffect(() => {
    const getPokemones = async () => {
      //Obtenemos la lista de pokemones de la api
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      const listaPokemones = await response.json();
      const { results } = listaPokemones;

      /*
        Obtenemos la otra url para hacer un fetch y asi 
        acceder al id, nombre, imagen y tipo de cada pokemon.
      */
      const newPokemones = results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const poke = await response.json();
        return {
          id: poke.id,
          name: poke.name,
          img: poke.sprites.other.dream_world.front_default,
          type: poke.types,
        };
      });
      //resolvemos las promesas
      setPokemones(await Promise.all(newPokemones));
    };
    getPokemones();
  }, []);
  //esta funcion cambia el estado cada vez que se hace click
  const toggleLista = () => {
    setMostrarLista(!mostrarLista);
  };
  //esta funcion elimina el pokemon del estado pokemones
  const handleDeletePokemon = (id) => {
    const updatedPokemones = pokemones.filter((pokemon) => pokemon.id !== id);
    setPokemones(updatedPokemones);
  };

  return (
    <div className="custom-cursor">
      <div className="title">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
          alt=""
          width={"500px"}
        />
      </div>
      <div className="boton">
        <button onClick={toggleLista} className="boton-color">
          {mostrarLista ? "Ocultar Pokemones" : "Mostrar Pokemones"}
        </button>
      </div>


      {mostrarLista && (
        <div className="listpoke">
          {pokemones.map((pokemon) => {
            return (
              <div key={pokemon.id} className="list">
                <img src={pokemon.img} alt={pokemon.name} />
                <div>
                  <h2>{pokemon.name}</h2>
                  <span>{pokemon.id}</span>
                  <h3>
                    Type:{" "}
                    {pokemon.type.map((type) => type.type.name).join(", ")}
                  </h3>
                  <button onClick={() => handleDeletePokemon(pokemon.id)} className="boton-eli">
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
