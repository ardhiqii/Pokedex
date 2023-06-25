import React from "react";
import styles from "./detail.module.css";
import { useParams } from "react-router-dom";
import PokemonDetail from "../../components/pokemon-detail/PokemonDetail";
import { useState } from "react";
import PokeballLoading from "../../components/pokeball-loading/PokeballLoading";
import { useEffect } from "react";
const Detail = () => {
  const [showModal, setShowModal] = useState(false);
  const [onCapture, setOnCapture] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [status, setStatus] = useState(<h2>CATCH THE MONSTER</h2>);
  const [userPokemon,setUserPokemon] = useState(JSON.parse(localStorage.getItem("pokemon")))
  const { id } = useParams();

  const PokemonDetailProps = { id, setShowModal, isCaptured,setIsCaptured,setIsCaptured,setStatus,userPokemon };


  useEffect(()=>{
    if(userPokemon==null){
        localStorage.setItem("pokemon",JSON.stringify([]))
        setUserPokemon([]);
    }
    const updateValue = JSON.stringify(userPokemon)
    localStorage.setItem("pokemon",updateValue)
  },[userPokemon,isCaptured])


  const updateStorage = (type) =>{
    if(type == "add"){
      setUserPokemon((prev)=>[id,...prev])
    }else{
      setUserPokemon(userPokemon.filter((currId)=> currId != id ))
    }
  }

  const capturing = () => {
    setOnCapture(true);
    const succes = true
    setStatus(succes ? <h2>Succed</h2> : <h2>Failed</h2>);
    setIsCaptured(succes);
    if(succes){
        updateStorage("add")
    }
    setTimeout(() => {
      setOnCapture(false);
    }, 4000);
    setTimeout(() => {
      setShowModal(false);
      setStatus(!succes && <h2>CATCH THE MONSTER</h2>);
    }, 6000);
  };

  const remove = () =>{
    console.log("remove");
    updateStorage("remove")
    setIsCaptured(false)
    setTimeout(() => {
      setStatus(<h2>CATCH THE MONSTER</h2>)
      setShowModal(false);
    }, 1000);
  }
  return (
    <div className={styles.container}>
      <PokemonDetail {...PokemonDetailProps} />
      <div
        className={styles.modalContainer}
        style={showModal ? { display: "flex" } : { display: "none" }}
      >
        <div className={styles.modalMain}>
          {onCapture ? (
            <PokeballLoading />
          ) : (
            <>
            <div
              className={styles.button}
              style={isCaptured ? { backgroundColor: "#a8ef8c" } : {}}
              onClick={ isCaptured ? remove : capturing}
            >
              {status}
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
