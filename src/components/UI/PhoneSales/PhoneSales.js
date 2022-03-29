import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch } from "react-redux";
import Columns from "./Columns";
import { phoneActions } from "../../../store/phone";

const PhoneSales = () => {
  const [data, setData] = useState([]);
  const columns = Columns;

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://react-http-9dad6-default-rtdb.firebaseio.com/phones.json"
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Error al cargar los datos iniciales...");
      }

      const responseData = await response.json();

      const result = [];
      for (const key in responseData) {
        result.push({
          key: key,
          id: key,
          brand: responseData[key].brand,
          model: responseData[key].model,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setData(result);
      dispatch(phoneActions.loadPhones(result));
    };

    getData();
  }, []);

  // console.log(123, data, columns);

  return (
    <>
      <h1>Ventana de celulares</h1>
      <hr />
      <div style={{ width: "75%" }}>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          striped
          hover
          condensed
          rowStyle={{ backgroundColor: "#e6fff9" }}
        />
      </div>
    </>
  );
};

export default PhoneSales;
