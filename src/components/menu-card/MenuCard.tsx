import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import "./MenuCard.scss";

type MenuProps = {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuCard = ({ showMenu, setShowMenu }: MenuProps) => {
  return (
    <div className={`menu-card ${showMenu ? "show" : "close"}`}>
      {links.map((link, index) => (
        <Link key={index} to={link.url}>
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuCard;

const links = [
  { name: "Home", url: ROUTES.home },
  { name: "Dashboard", url: ROUTES.dashboard },
  { name: "Blog", url: ROUTES.blog },
  { name: "About Us", url: ROUTES.about_us },
  { name: "Log In", url: ROUTES.auth },
];
