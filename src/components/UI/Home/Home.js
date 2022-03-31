import React from "react";
import logo from "../../../assets/base/fondo.jpeg";

const Home = () => {
  return (
    <>
      <h1 style={{ backgroundColor: "lightblue" }}>
        Tienda virtual de celulares
      </h1>
      <img src={logo} alt="logo" />
      <hr />
    </>
  );
};

export default Home;
