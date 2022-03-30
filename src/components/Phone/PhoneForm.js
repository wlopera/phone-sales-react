import React, { useEffect, useState } from "react";
import { Image, Select } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import Modal from "../UI/Modal/Modal";
import usePhoneInput from "../hooks/use-phone-input";
import usePhoneSelect from "../hooks/use-phone-select";

import classes from "./PhoneForm.module.css";
import { brandsPhone, modelsPhone } from "../Utils/Utilities";

import { phoneActions } from "../../store/phone";

const Phone = (props) => {
  const [models, setModels] = useState([]);
  const [imagenUrl, setImagenUrl] = useState("cellphone.png");

  const dispatch = useDispatch();

  const isNotSelected = (value) => value !== "0";

  const isNotEmpty = (value) => value.trim() !== "";

  const isNumberValid = (value) =>
    value.trim() !== null && value.trim() !== "" && !isNaN(value.trim());

  const {
    value: brandValue,
    isValid: brandIsValid,
    hasError: brandHasError,
    valueChangeHandler: brandChangeHandler,
    inputBlurHandler: brandBlurHandler,
    reset: resetBrand,
  } = usePhoneSelect(isNotSelected);

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
  } = usePhoneSelect(isNotSelected);

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
  } = usePhoneInput(isNotEmpty);

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

  useEffect(() => {
    const brand = brandsPhone.filter((item) => item.value === brandValue);

    const model = modelsPhone.filter((item) => item.brand === brand[0].text);
    if (model[0]) {
      modelChangeHandler(null, { value: "0" });
      setModels(model[0].data);
    } else {
      modelChangeHandler(null, { value: "0" });
      setModels([]);
    }
  }, [brandValue]);

  useEffect(() => {
    const model = models.filter((item) => item.value === modelValue);
    const eventDescription = { target: { value: "" } };
    const eventPrice = { target: { value: "" } };
    if (model.length > 0 && model[0].value !== "0") {
      eventDescription.target.value = model[0].memo;
      eventPrice.target.value = "" + model[0].price;
      setImagenUrl(model[0].url);
    } else {
      setImagenUrl("cellphone.png");
    }
    descriptionChangeHandler(eventDescription);
    priceChangeHandler(eventPrice);
  }, [modelValue]);

  const formIsValid =
    brandIsValid && modelIsValid && descriptionIsValid && priceIsValid;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const body = {
      brand: brandsPhone[brandValue].text,
      model: models[modelValue].text,
      description: descriptionValue,
      imagen: imagenUrl,
      price: priceValue,
    };

    console.log("Data a enviar: ", body);

    const response = await fetch(
      "https://react-http-9dad6-default-rtdb.firebaseio.com/phones.json",
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();

    body.id = result.name;
    body.key = result.name;

    dispatch(phoneActions.addPhone(body));

    // resetBrand();
    // resetModel();
    // resetDescription();
    // resetPrice();
    props.onClose();
  };

  return (
    <Modal onCancel={props.onClose}>
      <form onSubmit={submitHandler}>
        <h1 className={classes.headerModal}>Agregar Celular</h1>
        <div className="row">
          <div className="col">
            <div className={brandFormClass}>
              <label htmlFor="brand">Marca</label>
              <Select
                id="brand"
                name="brand"
                value={brandValue}
                placeholder="Seleccione marca de celular"
                options={brandsPhone}
                onChange={brandChangeHandler}
                onBlur={brandBlurHandler}
                style={{ minWidth: "250px" }}
              />
              {brandHasError && (
                <p className={classes["error-text"]}>
                  Seleccione marca de celular
                </p>
              )}
            </div>
            <div className={modelFormClass}>
              <label htmlFor="model">Modelo</label>
              <Select
                id="model"
                name="model"
                value={modelValue}
                placeholder="Seleccione un modelo"
                options={models}
                onChange={modelChangeHandler}
                onBlur={modelBlurHandler}
                style={{ minWidth: "250px" }}
              />
              {modelHasError && (
                <p className={classes["error-text"]}>
                  Seleccione modelo de celular
                </p>
              )}
            </div>
          </div>
          <div className="col">
            <Image
              src={require("../../assets/phones/" + imagenUrl)}
              size="big"
            />
          </div>
        </div>

        <div className={descriptionFormClass}>
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            value={descriptionValue}
            //onChange={descriptionChangeHandler}
            //onBlur={descriptionBlurHandler}
            disabled
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
              Por favor introduzca un precio del celular válido!
            </p>
          )}
        </div>
        <hr />
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
