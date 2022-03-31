import React from "react";
import { useSelector } from "react-redux";

import classes from "./Total.module.css";

const Total = () => {
  const totals = useSelector((state) => state.phone.totals);

  const content = (
    <div className={classes.totals}>
      <ul>
        {Object.keys(totals).map((key, index) => (
          <li key={index}>
            {key.toUpperCase()}: {totals[key]}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <h1 className={classes.h1Class}>TOTALES</h1>
      {content}
    </>
  );
};

export default Total;
