import React, { useState } from "react";

import { Icon } from "semantic-ui-react";

import classes from "./HeaderPhoneButton.module.css";

const HeaderPhoneButton = () => {
  const [numberOfCart, setNumberOfCart] = useState(0);
  return (
    <div className={classes.divClass}>
      <button className={classes.btnClass}>
        <Icon name="mobile alternate" size="large" />
        <span className={classes.txtClass}>Agregar</span>
        <span className={classes.numberClass}>{numberOfCart}</span>
      </button>
    </div>
  );
};

export default HeaderPhoneButton;
