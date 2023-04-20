import React from "react";
import "./styles.css";
import PokemonDetails from './routes/PokemonDetails.js';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import('https://fonts.cdnfonts.com/css/pokemon-solid');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      currentPage: 1,
      pokemonsPerPage: 10,
      totalPages: null
    };
  }
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/").then(response => response.json()).then(data => {
      const totalPokemons = data.count;
      const totalPages = Math.ceil(totalPokemons / this.state.pokemonsPerPage);
      this.setState({
        totalPages
      });
      return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${this.state.pokemonsPerPage}&offset=${(this.state.currentPage - 1) * this.state.pokemonsPerPage}`).then(response => response.json()).then(data => {
        let results = data.results;
        let promisesArray = results.map(result => {
          return fetch(result.url).then(response => response.json());
        });
        return Promise.all(promisesArray);
      }).then(data => {
        this.setState({
          pokemons: data
        }, () => console.log("Main Pokemon State: ", this.state.pokemons));
      });
    });
  }
  handlePageChange = pageNumber => {
    this.setState({
      currentPage: pageNumber
    }, () => {
      this.componentDidMount();
    });
  };
  render() {
    return /*#__PURE__*/React.createElement(Router, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
      exact: true,
      path: "/"
    }, /*#__PURE__*/React.createElement(PokeList, {
      pokemons: this.state.pokemons
    }), /*#__PURE__*/React.createElement(Pagination, {
      currentPage: this.state.currentPage,
      totalPages: this.state.totalPages,
      onPageChange: this.handlePageChange
    })), /*#__PURE__*/React.createElement(Route, {
      path: "/pokemon/:id"
    }, /*#__PURE__*/React.createElement(PokemonDetails, {
      pokemons: this.state.pokemons
    })))));
  }
}
const PokeList = ({
  pokemons
}) => {
  console.log(pokemons);
  if (pokemons.length === 0) {
    return /*#__PURE__*/React.createElement("div", null, "Loading ...");
  }
  return /*#__PURE__*/React.createElement("div", null, pokemons.map(pokemon => /*#__PURE__*/React.createElement(Pokemon, {
    key: pokemon.id,
    name: pokemon.name,
    sprite: pokemon.sprites.front_default,
    types: pokemon.types,
    id: pokemon.id
  })));
};
const Pokemon = ({
  name,
  sprite,
  types,
  id
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "poke-card " + types[0].type.name
  }, /*#__PURE__*/React.createElement(Link, {
    to: `/pokemon/${id}`
  }, /*#__PURE__*/React.createElement("img", {
    alt: "Pokemon sprite",
    src: sprite
  }), /*#__PURE__*/React.createElement("h3", null, name)));
};
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const pagesToShow = 2; // Number of pages to show before and after current page
  const pageNumbers = [];
  for (let i = Math.max(1, currentPage - pagesToShow); i <= Math.min(totalPages, currentPage + pagesToShow); i++) {
    pageNumbers.push(i);
  }
  return /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("ul", {
    className: "pagination"
  }, pageNumbers.map(number => /*#__PURE__*/React.createElement("li", {
    key: number,
    className: `page-item ${number === currentPage ? 'active' : ''}`
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onPageChange(number),
    className: "page-link"
  }, number)))));
};
export default App;