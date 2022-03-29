import React from "react";
import { useSelector } from "react-redux";

import Modal from "../UI/Modal/Modal";
import usePhoneInput from "../hooks/use-phone-input";
import classes from "./PhoneForm.module.css";

const Phone = (props) => {
  const phones = useSelector((state) => state.phone.phones);

  console.log("CELULARES: ", phones);
  const inNotEmpty = (value) => value.trim() !== "";

  const isNumberValid = (value) =>
    value.trim() !== null && value.trim() !== "" && !isNaN(value.trim());

  const {
    value: brandValue,
    isValid: brandIsValid,
    hasError: brandHasError,
    valueChangeHandler: brandChangeHandler,
    inputBlurHandler: brandBlurHandler,
    reset: resetBrand,
  } = usePhoneInput(inNotEmpty);

  const brandFormClass = brandHasError
    ? classes["invalid"]
    : classes["form-control"];

  const {
    value: modelValue,
    isValid: modelIsValid,
    hasError: modelHasError,
    valueChangeHandler: modelChangeHandler,
    inputBlurHandler: modelBlurHandler,
    reset: resetModel,
  } = usePhoneInput(inNotEmpty);

  const modelFormClass = modelHasError
    ? classes["invalid"]
    : classes["form-control"];

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = usePhoneInput(inNotEmpty);

  const descriptionFormClass = descriptionHasError
    ? classes["invalid"]
    : classes["form-control"];

  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = usePhoneInput(isNumberValid);

  const priceFormClass = priceHasError
    ? classes["invalid"]
    : classes["form-control"];

  const formIsValid =
    brandIsValid && modelIsValid && descriptionIsValid && priceIsValid;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const body = JSON.stringify({
      brand: brandValue,
      model: modelValue,
      description: descriptionValue,
      imagen: "url",
      price: priceValue,
    });

    console.log("Data a enviar: ", body);

    await fetch(
      "https://react-http-9dad6-default-rtdb.firebaseio.com/phones.json",
      {
        method: "POST",
        body: body,
      }
    );

    resetBrand();
    resetModel();
    resetDescription();
    resetPrice();
    props.onClose();
  };
  return (
    <Modal onCancel={props.onClose}>
      <form onSubmit={submitHandler}>
        <div className={brandFormClass}>
          <label htmlFor="brand">Marca</label>
          <input
            type="text"
            id="brand"
            value={brandValue}
            onChange={brandChangeHandler}
            onBlur={brandBlurHandler}
          />
          {brandHasError && (
            <p className={classes["error-text"]}>
              Por favor introduzca una marca de celular!
            </p>
          )}
        </div>
        <div className={modelFormClass}>
          <label htmlFor="model">Modelo</label>
          <input
            type="text"
            id="model"
            value={modelValue}
            onChange={modelChangeHandler}
            onBlur={modelBlurHandler}
          />
          {modelHasError && (
            <p className={classes["error-text"]}>
              Por favor introduzca un modelo de celular!
            </p>
          )}
        </div>
        <div className={descriptionFormClass}>
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            value={descriptionValue}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          />
          {descriptionHasError && (
            <p className={classes["error-text"]}>
              Por favor introduzca una descripión!
            </p>
          )}
        </div>
        <div className={priceFormClass}>
          <label htmlFor="description">Precio</label>
          <input
            type="text"
            id="price"
            value={priceValue}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
          />
          {priceHasError && (
            <p className={classes["error-text"]}>
              Por favor introduzca precio del celular vlido!
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onClose}>
            Cancelar
          </button>
          {formIsValid && <button className={classes.submit}>Enviar</button>}
        </div>
      </form>
    </Modal>
  );
};

export default Phone;
