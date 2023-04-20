import React from "react";
import "../styles.css";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import('https://fonts.cdnfonts.com/css/pokemon-solid');
const PokemonDetails = ({
  pokemons
}) => {
  const {
    id
  } = useParams();
  const pokemon = pokemons.find(pokemon => pokemon.id == id);
  if (!pokemon) {
    return /*#__PURE__*/React.createElement("div", null, "Loading ...");
  }
  const {
    name,
    sprites,
    stats
  } = pokemon;
  return /*#__PURE__*/React.createElement("div", {
    className: "poke-details"
  }, /*#__PURE__*/React.createElement("h2", null, name), /*#__PURE__*/React.createElement("img", {
    src: sprites.front_default,
    alt: name
  }), /*#__PURE__*/React.createElement("h3", null, "Stats:"), /*#__PURE__*/React.createElement("ul", null, stats.map(stat => /*#__PURE__*/React.createElement("li", {
    key: stat.stat.name
  }, stat.stat.name, ": ", stat.base_stat))));
};
export default PokemonDetails;