import React, { useState, useEffect } from "react";
import { regisProduct } from "../services/product";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { Checkbox } from "antd";
import InputMP from "../components/inputMP/inputMP";
import { getAllMP } from "../services/mp";

import { Form, Input, Select } from "antd";

export default function Custumer({ authenticate }) {
  const [form, setForm] = useState({
    name: "",
    clave: "",
    qualityExams: [],
  });
  const { name, clave, qualityExams } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /*let [MPCounter, setMPCounter] = useState([1]);
  useEffect(() => {
    console.log("arr Inicial", MPCounter)

  }, [MPCounter]);*/
  /*const addMPFun = (event)=>{
    event.preventDefault();
    let originalArr = MPCounter
    let add = 1
    originalArr.push(add) 
    setMPCounter(originalArr)
    console.log("arr final",MPCounter)
  }*/

  //const [MPList, setMPList] = useState([]);

  /* const obtainProducts = async () => {
    getAllMP()
      .then((res) => {
        setMPList(res.data.MP);
      })
      .catch((err) => console.log(err));
  };
*/

  const [MPLists, setMPList] = useState([]);
  const obtainProducts = async () => {
    getAllMP()
      .then((res) => {
        setMPList(res.data.MP);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    obtainProducts();
  }, []);

  const { Option } = Select;

  //function MP(){
  const [MPList, setMPCounter] = useState([1]);

  const addMP = (todoText) => {
    const myMP = [...MPList, {}];
    setMPCounter(myMP);
  };

  // }

  function handleInputChange(event) {
    console.log(event);
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      name,
      clave,
      qualityExams,
    };
    console.log("credentials---", credentials);
    regisProduct(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.NEWMP);
    });
  }
  let contador = 1;

  const plainOptions = [
    "IR",
    "Densidad aparente",
    "Humedad",
    "Apariencia",
    "Sabor",
    "PH",
  ];

  function onChange(checkedValues) {
    console.log(checkedValues);
    //return setForm({ ...form, qualityExams: checkedValues });
  }

  return (
    <div>
      <h1>Nuevo Producto</h1>
      <form className="signup__form">
        <label htmlFor="input-username">Nombre del producto:</label>
        <input
          id="input-username"
          type="text"
          name="name"
          placeholder="Nombre"
          value={name}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="input-username">Clave del producto:</label>
        <input
          id="input-username"
          type="text"
          name="clave"
          placeholder="Clave"
          value={clave}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="input-password">Pruebas de calidad:</label>
        <Checkbox.Group
          name="qualityExams"
          options={plainOptions}
          onChange={onChange}
        />
        <br />
        <Checkbox.Group name="qualityExams" options onChange={onChange} />
        <br />

        {MPList.map((i) => (
          <>
            <br />
            <Input.Group compact>
              <Form.Item
                noStyle
                rules={[{ required: true, message: "Province is required" }]}
                name="MP"
              >
                <Select
                  placeholder="Selecciona MP"
                  onChange={onChange}
                  name="MP"
                  value="2"
                >
                  {MPLists.map(({ clave }) => (
                    <Option key={clave} value={clave}>
                      {clave}{" "}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={["MP", "porcentaje"]}
                noStyle
                rules={[{ required: true, message: "Porcentaje is required" }]}
              >
                <Input
                  style={{ width: "50%" }}
                  placeholder="Porcentaje"
                  type="number"
                />
              </Form.Item>
            </Input.Group>
            <br />
          </>
        ))}
        <button type="danger" onClick={addMP}>
          Add Mp
        </button>

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="button__submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
