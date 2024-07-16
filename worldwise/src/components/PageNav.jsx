import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
/* WE DIDN'T USE <a href="/pricing">pricing</a> BECAUSE BY USING ANCHOR TAG THE WHOLE PAGE GETS RELOADED BUT ON SINGLE PAGE APPLICATION WE DONT WORK LIKE THIS ONLY THAT COMPONENT TREE NEEDS TO BE CHANGED
by using navlink instead of link we can get the active class like which class is active like if we click on home that class will be active but in link we do not get this property
*/
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
