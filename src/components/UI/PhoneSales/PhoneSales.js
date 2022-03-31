import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch } from "react-redux";
import Columns from "./Columns";
import { phoneActions } from "../../../store/phone";
import { useSelector } from "react-redux";

const PhoneSales = () => {
  const [data, setData] = useState([]);
  const columns = Columns;

  const dispatch = useDispatch();

  const phones = useSelector((state) => state.phone.phones);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://react-http-9dad6-default-rtdb.firebaseio.com/phones.json"
      );
      // console.log(response);

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

      dispatch(phoneActions.loadPhones(result));
    };

    getData();
  }, [dispatch]);

  useEffect(() => {
    setData(phones);
  }, [phones]);

  return (
    <>
      <div style={{ width: "75%", margin: "25px 25px" }}>
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
