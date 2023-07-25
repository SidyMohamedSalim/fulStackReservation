import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import UserDetailContext from "../../Context/UserDetailsContext";
import { createUser } from "../../../utils/api";
import useFavourites from "../../hooks/UseFavorites";

const Layout = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  // const { data: fav } = useFavourites();

  // console.log(fav);

  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: () => createUser(user.email, user.picture),
  });

  const getTokenAndRegistrer = async () => {
    const res = await getAccessTokenSilently({
      authorizationParams: {
        audience: "http://localhost:8000/",
        scope: "openid profile email",
      },
    });
    localStorage.setItem("access_token", res);
    setUserDetails((prev) => ({ ...prev, token: res }));
    console.log(res);
    mutate(res);
  };

  useEffect(() => {
    isAuthenticated && mutate();
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
