import { useState } from "react";
import styles from "./pokemon-card.module.css";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import DisplayType from "../display-type/DisplayType";
import whoPokemon from "../../assets/who-that-pokemon.png"
const PokemonCard = ({ name, api }) => {
  const [image, setImage] = useState("");
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = api.split("/")[6];
  const namePokemon = name.charAt(0).toUpperCase() + name.slice(1);
  useEffect(() => {
    setLoading(true);
    const getImage = async () => {
      const { data } = await axios(api);
      const sprites = data.sprites;
      setTypes(data.types);

      const imageURL =
        sprites["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ];
      setImage(imageURL);
      setLoading(false);
    };
    getImage();
  }, []);
  if (loading) return "Loading Pokemon";

  return (
    <NavLink to={`/pokemon/${id}`} className={styles.container}>
      <div className={styles.imageContainer}>
        <div className="image">
          <img src={image ? image : whoPokemon} className={image == null ? styles.image:""} />
        </div>
      </div>
      <div className={styles.info}>
        <h3>{namePokemon}</h3>
        <div className={styles.typesContainer}>
          {types.map(({ type }) => (
            <DisplayType type={type.name} key={type} />
          ))}
        </div>
      </div>
    </NavLink>
  );
};

export default PokemonCard;
