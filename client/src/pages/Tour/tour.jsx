import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getAllBookings, getTour } from "../../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import "./tour.css";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import useIsBookking from "../../hooks/useIsBooking";
import { Button } from "@mantine/core";
import { Heart } from "../../components/Heart/Heart";

const Tour = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { user } = useAuth0();

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["tour", id],
    async () => await getTour(id)
  );

  const [modalOpenned, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();

  console.log(data);

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  const tour = data?.tour;
  // if (isSuccess && user.email) {
  //   const query = useQuery({
  //     queryKey: ["allBookings"],
  //     queryFn: async () => await getAllBookings(user?.email),
  //   });

  //   console.log(query.data);
  // }

  // const { isBooking , } = useIsBookking(user?.email, tour?.id);

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth  tour-container">
        {/* Like button */}
        <div className="like">
          <Heart id={tour.id} />
        </div>

        {/* image */}
        <img src={tour.image} alt={`image de ${tour.image}`} />

        <div className="flexCenter tour-details">
          {/* Left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{tour.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ${tour.price}
              </span>
            </div>

            {/* Facilities */}
            <div className="flexStart facilities">
              <div className="flexStart faciliy">
                <FaShower size={20} color="#1F3E72" />
                <span>12 Bathrooms</span>
              </div>
              <div className="flexStart faciliy">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>11 Parkings</span>
              </div>
              <div className="flexStart faciliy">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>12 Rooms</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {tour.description}
            </span>

            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {tour.address} {tour.city} {tour.country}
              </span>
            </div>

            {/* Bookkings button */}
            {user?.email && (
              <>
                {isLoading ? (
                  <>
                    <Button variant="outline" w={"100%"} color="red">
                      <span>Annulez Reservation</span>
                    </Button>
                    <span>Vous avez prevu votre visite pour le mois de </span>
                  </>
                ) : (
                  <button
                    className="button"
                    onClick={() => {
                      validateLogin() && setModalOpened(true);
                    }}
                  >
                    JE VAIS VISITER CET ENDROIT
                  </button>
                )}
              </>
            )}

            <BookingModal
              opened={modalOpenned}
              setOpened={setModalOpened}
              tourId={id}
              email={user?.email}
            />
          </div>

          {/* right */}
          <div className="right">
            <Map
              address={tour.address}
              city={tour.city}
              country={tour.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
