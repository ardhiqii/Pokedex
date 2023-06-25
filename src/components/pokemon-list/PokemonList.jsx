import React from 'react'
import styles from "./pokemon-list.module.css"
import PokemonCard from '../pokemon-card/PokemonCard'
const PokemonList = ({data}) => {

  return (
    <div className={styles.container}>
        {data.map((monster) => (
          <PokemonCard
            name={monster.name}
            api={monster.url}
            key={monster.name}
          />
        ))}
    </div>
  )
}

export default PokemonList