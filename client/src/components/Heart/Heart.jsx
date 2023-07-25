import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toFav } from "../../../utils/api";
import { toast } from "react-toastify";

export const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");

  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user.email),
    // onSuccess: toast.success("ajouté aux Favories"),
  });

  //   const el = getAllFav(user?.email);

  //   const thisFav = el.data.filter((fav) => fav.user.TourId === id);

  const handleLike = () => {
    if (validateLogin()) {
      mutate();
      setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
    }
  };
  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};
