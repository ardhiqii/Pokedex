import React from 'react'
import styles from "./display-ability.module.css"
const DisplayAbility = ({name,isHidden}) => {
    const arrName = name.split("-");
    for (let i = 0; i < arrName.length; i++){
        arrName[i] = arrName[i].charAt(0).toUpperCase() + arrName[i].slice(1)
    }
    const abilityName = arrName.join(" ")

  return (
    <div className={styles.container}>
        <p>{abilityName}</p>
    </div>
  )
}

export default DisplayAbility