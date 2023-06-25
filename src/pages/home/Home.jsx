import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./home.module.css";
import PokemonList from "../../components/pokemon-list/PokemonList";
import ReactPaginate from "react-paginate";
import pokeball from "../../assets/pokeball.png"
import Loading from "../../components/loading/Loading";

const limit = 10;
const Home = () => {
  const [pokemon, setPokemon] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const API_URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const { data } = await axios(API_URL);
      setPokemon(data.results);
      setPageCount(Math.ceil(data.count / limit));

      setLoading(false);
    };
    getData();
  }, []);

  const fetchPokemon = async (currentPage) => {
    const FETCH_API_URL = `https://pokeapi.co/api/v2/pokemon?offset=${currentPage}&limit=${limit}`;
    const { data } = await axios(FETCH_API_URL);

    return data.results;
  };
  const handlePageClick = async ({ selected }) => {
    const currentPage = selected;
    const data = await fetchPokemon(currentPage * 10);

    setPokemon(data);
  };
  if (loading) return <Loading/>;
  return (
    <div className={styles.container}>

      <PokemonList data={pokemon} />
      <div className={styles.paginationContainer}>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          pageClassName={styles.pageItem}
          pageLinkClassName={styles.pageItem}
          previousClassName={styles.pageItem}
          previousLinkClassName={styles.pageItem}
          nextClassName={styles.pageItem}
          nextLinkClassName={styles.pageItem}
          activeClassName={styles.active}
        />
      </div>
    </div>
  );
};

export default Home;
