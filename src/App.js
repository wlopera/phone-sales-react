import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Layout/Header";
import Home from "./components/UI/Home/Home";
import PhoneSales from "./components/UI/PhoneSales/PhoneSales";
import Total from "./components/UI/Total/Total";

import classes from "./App.module.css";
import { useState } from "react";
import PhoneForm from "./components/Phone/PhoneForm";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <BrowserRouter>
      {showModal && <PhoneForm onClose={hideModalHandler} />}
      <Header onShowModal={showModalHandler} />
      <div className={classes.divMain}>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/sales" element={<PhoneSales />}></Route>
          <Route exact path="/totals" element={<Total />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
