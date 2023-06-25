import React from "react";
import styles from "./display-stats.module.css";

const rename = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
};
const colors = {
  hp: "#df2140",
  attack: "#ff994d",
  defense: "#fedc43",
  "special-attack": "#85ddff",
  "special-defense": "#a8ef8c",
  speed: "#fb94a8",
};
const DisplayStats = ({ stats }) => {
  return (
    <div className={styles.container}>
      {stats.map(({ base_stat, stat },id) => {
        return (
          <div className={styles.statContainer} key={id}>
            <div className={styles.circle} style={{backgroundColor:colors[stat.name]}}>{rename[stat.name]}</div>
            <div className="">{base_stat}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayStats;
