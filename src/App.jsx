import { useEffect, useState } from "react";
import "../public/App.css";

function App() {
  const [pokemones, setPokemones] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [pokemonShiny, setPokemonShiny] = useState({});

  useEffect(() => {
    const getPokemones = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      const listaPokemones = await response.json();
      const { results } = listaPokemones;

      const newPokemones = results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const poke = await response.json();
        return {
          id: poke.id,
          name: poke.name,
          img: poke.sprites.other.dream_world.front_default,
          shiny: poke.sprites.other["official-artwork"].front_shiny,
          types: poke.types.map((type) => type.type.name), // Guardar los tipos en un array
        };
      });

      setPokemones(await Promise.all(newPokemones));
    };
    getPokemones();
  }, []);

  const toggleLista = () => {
    setMostrarLista(!mostrarLista);
  };

  const handleDeletePokemon = (id) => {
    const updatedPokemones = pokemones.filter((pokemon) => pokemon.id !== id);
    setPokemones(updatedPokemones);
  };

  const cambiar_a_shiny = (id) => {
    setPokemonShiny((prev) => ({
      ...prev,
      [id]: !prev[id], 
    }));
  };

  // Definir un objeto con los colores para cada tipo de carga
  const tipo_colores_fondo = {
    fire: "#e62122", // Ejemplo de color para tipo "fire"
    water: "#2481ef", // Ejemplo de color para tipo "water"
    grass: "#3ba123", // Ejemplo de color para tipo "grass"
    bug: "#92a312",
    normal: "#9fa29f",
    poison: "#923fcc",
    fairy: "#ef71ef",
    electric: "#f9c000",
    ground: "#92501b"
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
              <div key={pokemon.id} className="list" style={{ backgroundColor: tipo_colores_fondo[pokemon.types[0]] }}>
                <img
                  src={pokemonShiny[pokemon.id] ? pokemon.shiny : pokemon.img} 
                  alt={pokemon.name}
                  id="img-pokemon"
                />
                <div>
                  <h2>{pokemon.name}</h2>
                  {/* <span>{pokemon.id}</span> */}
                  <h3 style={{ color: tipo_colores_fondo[pokemon.types[0]] }}>Type: {pokemon.types.join(", ")}</h3>
                  <button onClick={() => cambiar_a_shiny(pokemon.id)} className="boton-eli">{pokemonShiny[pokemon.id] ? "⋘ Normal" : "Shiny ⋙"}</button>
                  <button onClick={() => handleDeletePokemon(pokemon.id)} className="boton-shiny">
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
