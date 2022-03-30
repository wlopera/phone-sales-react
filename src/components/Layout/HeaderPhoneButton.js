import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Icon } from "semantic-ui-react";

import classes from "./HeaderPhoneButton.module.css";

const HeaderPhoneButton = (props) => {
  const phones = useSelector((state) => state.phone.phones);

  return (
    <div className={classes.divClass}>
      <button className={classes.btnClass} onClick={props.onShow}>
        <Icon name="mobile alternate" size="large" />
        <span className={classes.txtClass}>Agregar</span>
        <span className={classes.numberClass}>{phones.length}</span>
      </button>
    </div>
  );
};

export default HeaderPhoneButton;
