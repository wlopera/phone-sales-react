import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";

const PhoneSales = () => {
  const [data, setData] = useState([]);

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
    };

    getData();
  }, []);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      headerStyle: {
        width: "5px",
        backgroundColor: "green",
      },
    },
    {
      dataField: "brand",
      headerAlign: "center",
      text: "Marca",
      headerStyle: {
        width: "100px",
        backgroundColor: "green",
      },
    },
    {
      dataField: "model",
      headerAlign: "center",
      text: "Modelo",
      headerStyle: {
        width: "100px",
        backgroundColor: "green",
      },
    },
    {
      dataField: "description",
      headerAlign: "center",
      text: "Descripción",
      headerStyle: {
        width: "200px",
        backgroundColor: "green",
      },
    },
    {
      dataField: "price",
      headerAlign: "center",
      text: "Precio",
      headerStyle: {
        width: "20px",
        backgroundColor: "green",
      },
    },
  ];

  console.log(123, data, columns);

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
