import React from "react";
import "./styles.css";
import('https://fonts.cdnfonts.com/css/pokemon-solid');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemons: []
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
      .then(response => response.json())
      .then(data => {
        let results = data.results;
        let promisesArray = results.map(result => {
          return fetch(result.url).then(response => response.json());
        });
        return Promise.all(promisesArray);
      })
      .then(data =>
        this.setState({ pokemons: data }, () =>
          console.log("Main Pokemon State: ", this.state.pokemons)
        )
      );
  }

  render() {
    return <PokeList pokemons={this.state.pokemons} />;
  }
}

const PokeList = ({ pokemons }) => {
  console.log(pokemons);

  if (pokemons.length === 0) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {pokemons.map(pokemon => (
        <Pokemon name={pokemon.name} sprite={pokemon.sprites.front_default} types={pokemon.types} />
      ))}
    </div>
  );
};

export const Pokemon = ({ name, sprite, types }) => {
  return (
    <div className={"poke-card " + types[0].type.name} >
      {" "}
      <img alt="Pokemon sprite" src={sprite} /> <h3>{name}</h3>{" "}
    </div>
  );
};

export default App;
