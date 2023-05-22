import { useState } from "react";
import { Link } from "react-router-dom";
import { CloseIcon, MenuIcon } from "../../assets/icons";
import MenuCard from "../menu-card/MenuCard";
import "./Navbar.scss";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="app-nav">
      <Link to="/">
        <img src="/images/logo.webp" alt="flolog logo" />
      </Link>

      <div className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
        {!showMenu ? <MenuIcon /> : <CloseIcon />}
      </div>

      <MenuCard showMenu={showMenu} setShowMenu={setShowMenu} />
    </nav>
  );
};

export default Navbar;
