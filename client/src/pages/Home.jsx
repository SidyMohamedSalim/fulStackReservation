import React, { useState } from "react";
import Companies from "../components/Companies/Companies";
import Contact from "../components/Contact/Contact";

import GetStarted from "../components/GetStarted/GetStarted";

import Hero from "../components/Hero/Hero";
import Tours from "../components/Tours/Tours";
import Value from "../components/Value/Value";

const Home = () => {
  const [filter, setFilter] = useState();
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Hero filter={filter} setFilter={setFilter} />
      </div>
      {filter ? (
        <Tours Filter={filter} />
      ) : (
        <>
          <Companies />
          <Tours Filter={filter} />
          <Value />
          <Contact />
          <GetStarted />
        </>
      )}
    </div>
  );
};

export default Home;
