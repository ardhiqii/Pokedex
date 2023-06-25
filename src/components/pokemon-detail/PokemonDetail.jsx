import React from "react";
import styles from "./pokemon-detail.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DisplayType from "../display-type/DisplayType";
import DisplayAbility from "../display-ability/DisplayAbility";
import DisplayStats from "../display-stats/DisplayStats";
import whoPokemon from "../../assets/who-that-pokemon.png";
import pokeball from "../../assets/pokeball-8bit.png";
const PokemonDetail = ({ id, isCaptured, setShowModal,setIsCaptured,setStatus,userPokemon }) => {
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(true);
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  useEffect(() => {
    if(userPokemon.includes(id)){
        setIsCaptured(true)
    }
    setLoading(true);
    const getData = async () => {
      const data = await axios(API_URL);
      setPokemon(data.data);
      setLoading(false);
    };
    getData();
  }, [userPokemon,isCaptured]);

  const showModalHandler = () => {
    if(isCaptured){
      setStatus(<h2>Release</h2>)
    }
    setShowModal(true);
    
  };

  if (loading) return "Loading";
  const { height, weight, types, abilities, stats } = pokemon;
  let { name, moves } = pokemon;
  moves = moves.slice(0, 4);
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const imageURL =
    pokemon.sprites["versions"]["generation-v"]["black-white"]["animated"][
      "front_default"
    ];
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className="">
          <img
            src={imageURL ? imageURL : whoPokemon}
            className={imageURL == null ? styles.image : ""}
          />
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.nameContainer}>
          <h3>{name}</h3>
          <button onClick={showModalHandler}>
            <img
              src={pokeball}
              style={isCaptured ? { filter: "contrast(100)" } : {}}
              
            />
          </button>
        </div>

        <div className={styles.typesContainer}>
          {types.map(({ type }, id) => (
            <DisplayType key={id} type={type.name} />
          ))}
        </div>

        <div className={styles.abilitiesContainer}>
          <h5>ABILITIES</h5>
          <div className={styles.abilities}>
            {abilities.map(({ ability }, id) => {
              const { name } = ability;
              return <DisplayAbility name={name} key={id} />;
            })}
          </div>
        </div>

        <div className={styles.abilitiesContainer}>
          <h5>MOVES</h5>
          <div className={styles.abilities}>
            {moves.map(({ move }, id) => {
              const { name } = move;
              return <DisplayAbility name={name} key={id} />;
            })}
          </div>
        </div>

        <div className={styles.WHSContainer}>
          <div className={styles.WHContainer}>
            <h5>HEIGHT</h5>
            <p className={styles.numberContainer}>{height}dm</p>
          </div>
          <div className={styles.WHContainer}>
            <h5>WEIGHT</h5>
            <p className={styles.numberContainer}>{weight}Hg</p>
          </div>
        </div>

        <div className={styles.statsContainer}>
          <h5>STATS</h5>
          <DisplayStats stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
