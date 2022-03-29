import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Layout/Header";
import Home from "./components/UI/Home/Home";
import PhoneSales from "./components/UI/PhoneSales/PhoneSales";

import classes from "./App.module.css";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className={classes.divMain}>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/sales" element={<PhoneSales />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
