import React from "react";
import Companies from "../components/Companies/Companies";
import Contact from "../components/Contact/Contact";

import GetStarted from "../components/GetStarted/GetStarted";

import Hero from "../components/Hero/Hero";
import Tours from "../components/Tours/Tours";
import Value from "../components/Value/Value";

const Home = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Hero />
      </div>
      <Companies />
      <Tours />
      <Value />
      <Contact />
      <GetStarted />
    </div>
  );
};

export default Home;
