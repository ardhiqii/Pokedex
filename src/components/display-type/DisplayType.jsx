import React from 'react'
import styles from "./display-type.module.css"
import { COLORS } from '../../pokemon-type-colours'
const DisplayType = ({type,size="14px"}) => {
    const color = COLORS[type]
  return (
    <div className={styles.container}>
        <p className={styles.p} style={{fontSize:size,backgroundColor:color}}>{type.toUpperCase()}</p>
    </div>
  )
}

export default DisplayType