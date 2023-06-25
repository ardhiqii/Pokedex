import React from "react";
import styles from "./pokeball-loading.module.css";
const PokeballLoading = () => {
  return (
    <>
      {/* <div className={styles.wrapper}>
      <div className={styles.pokeball}></div>
    </div> */}
    
      <div className={styles.pokeball}>
        <div className={styles.pokeball__button}></div>
      </div>
    </>
  );
};

export default PokeballLoading;
