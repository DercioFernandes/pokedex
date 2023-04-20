import React from "react";
import "../styles.css";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import('https://fonts.cdnfonts.com/css/pokemon-solid');

const PokemonDetails = ({ pokemons }) => {
    const { id } = useParams();
    const pokemon = pokemons.find((pokemon) => pokemon.id == id);
  
    if (!pokemon) {
      return <div>Loading ...</div>;
    }
  
    const { name, sprites, stats } = pokemon;
  
    return (
      <div className="poke-details">
        <h2>{name}</h2>
        <img src={sprites.front_default} alt={name} />
  
        <h3>Stats:</h3>
        <ul>
          {stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default PokemonDetails;