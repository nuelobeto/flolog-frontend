import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../config/routes";
import useAuth from "../../store/useAuth";
import "./MenuCard.scss";

type MenuProps = {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuCard = ({ showMenu, setShowMenu }: MenuProps) => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth((state) => state);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <div className={`menu-card ${showMenu ? "show" : "close"}`}>
      {links.map((link, index) => (
        <Link key={index} to={link.url}>
          {link.name}
        </Link>
      ))}
      {!user ? (
        <Link to={ROUTES.auth}>Log In</Link>
      ) : (
        <div className="logout" onClick={handleLogout}>
          Log out
        </div>
      )}
    </div>
  );
};

const links = [
  { name: "Home", url: ROUTES.home },
  { name: "Dashboard", url: ROUTES.user_dashboard },
  // { name: "Blog", url: ROUTES.blog },
  // { name: "About Us", url: ROUTES.about_us },
  // { name: "Log In", url: ROUTES.auth },
];

export default MenuCard;
