import React from "react";
import { HiLocationMarker } from "react-icons/hi";

const SearchInput = ({ filter, setFilter }) => {
  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        type="text"
        value={filter}
        style={{ width: "75%" }}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Recherche une nouvelle destination"
      />
      <button className="button">Recherche</button>
    </div>
  );
};

export default SearchInput;
