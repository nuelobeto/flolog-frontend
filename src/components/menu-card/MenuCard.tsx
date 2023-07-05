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
  const { user, logout, is_pharmacist } = useAuth((state) => state);
  const links = [
    {
      name: is_pharmacist ? "Go Live" : "Home",
      url: is_pharmacist ? ROUTES.chat : ROUTES.client_home,
    },
    {
      name: "Dashboard",
      url: is_pharmacist
        ? ROUTES.consultant_dashboard
        : ROUTES.client_dashboard,
    },
  ];

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

export default MenuCard;
