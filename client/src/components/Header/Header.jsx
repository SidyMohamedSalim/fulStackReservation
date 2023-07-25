import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { AddTourModal } from "../AddTourModal";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [OpenedAddTour, setOpenendAddTOur] = useState(false);
  const headerColor = useHeaderColor();

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const handlerAddPropertyClick = () => {};

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to={"/"}>
          <img src="./logo.png" alt="logo" width={100} />
        </Link>

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <Link to="/tours">Destinations</Link>
            <a href="mailto:zainkeepscode@gmail.com" target={"_blank"}>
              Contact
            </a>
            {isAuthenticated && (
              <>
                <div onClick={() => setOpenendAddTOur(true)}>
                  Ajouter une Destination
                </div>
                <AddTourModal
                  OpenedAddTour={OpenedAddTour}
                  setOpenendAddTOur={setOpenendAddTOur}
                />
              </>
            )}

            {isAuthenticated ? (
              <ProfileMenu user={user} logout={logout} />
            ) : (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            )}
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
