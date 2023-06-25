import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./bags.module.css";
import axios from "axios";
import PokemonCard from "../../components/pokemon-card/PokemonCard";
import PokemonList from "../../components/pokemon-list/PokemonList";

const Bags = () => {
  const [userPokemon, setUserPokemon] = useState(
    JSON.parse(localStorage.getItem("pokemon"))
  );
  const [loading, setLoading] = useState(true);

  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    setLoading(true);
    if (userPokemon.length != 0) {
      const getData = async () => {
        const arrayPromise = [];
        userPokemon.map((idPokemon) => {
          const API_URL = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;
          arrayPromise.push(axios(API_URL));
        });
        const result = await Promise.all(arrayPromise);
        result.map(({ data }) => {
          const url = `https://pokeapi.co/api/v2/pokemon/${data.id}/`;
          const pokemonObject = {
            url,
            name: data.name,
            key: data.id,
          };
          setPokemon((prev) => [...prev, pokemonObject]);
        });
        setLoading(false);
      };
      getData();
    }else{
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userPokemon == null) {
      localStorage.setItem("pokemon", JSON.stringify([]));
      setUserPokemon([]);
    }
    console.log(pokemon);
  }, [userPokemon, pokemon]);
  if (loading) return <h1>Loading</h1>;
  return (
    <div className={styles.container}>
      { userPokemon.length != 0 ? <PokemonList data={pokemon} /> : <><div style={{margin:"auto"}}><h1>You have not catch the monster</h1></div></>}
      
    </div>
  );
};

export default Bags;
