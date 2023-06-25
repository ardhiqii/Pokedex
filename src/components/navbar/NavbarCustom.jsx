import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import pokeball from "../../assets/pokeball.png";
import backpack from "../../assets/backpack.png";
const NavbarCustom = () => {
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : styles.navLink
              }
            >
              <img src={pokeball} className={styles.icon} />
              All Pokemon
            </NavLink>
          </li>
          <li className={styles.li}>
            <NavLink
              to="/bags"
              className={({ isActive }) =>
                isActive ? styles.active : styles.navLink
              }
            >
              <img src={backpack} className={styles.icon} />
              Bags
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarCustom;
