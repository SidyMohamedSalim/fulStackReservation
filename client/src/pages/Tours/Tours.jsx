import React, { useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
import useTours from "../../hooks/useTours";
import "./Tours.css";
import { PuffLoader } from "react-spinners";
import TourCard from "../../components/TourCard/TourCard";
const Tours = () => {
  const { data, isError, isLoading } = useTours();
  const [filter, setFilter] = useState("");

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth tours-container ">
        <SearchInput filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter tours-container">
          {data.tours
            .filter(
              (tour) =>
                tour.title.toLowerCase().includes(filter.toLowerCase()) ||
                tour.city.toLowerCase().includes(filter.toLowerCase()) ||
                tour.country.toLowerCase().includes(filter.toLowerCase()) ||
                tour.description.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card) => (
              <TourCard card={card} key={card.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tours;
