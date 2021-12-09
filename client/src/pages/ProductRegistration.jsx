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
    MP:[{claveMP:1, porcentaje:0}]
  });
  const { name, clave, qualityExams,MP,claveMP,porcentaje} = form;

  const [error, setError] = useState(null);
  const navigate = useNavigate();


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
  const [MPList, setMPCounter] = useState([1]);
  let [contador, setContador] = useState(0);
  const addMP = (event) => {
    event.preventDefault();
    let add = 1
    let conterOrg = contador
    let newCount =conterOrg + add 
    setContador(newCount)
    const myMP = [...MPList, {}];
    setMPCounter(myMP);
    let oldArray=form.MP
    let newData={"claveMP":0, "porcentaje":0}
    oldArray.push(newData)
  setForm({ ...form, MP: oldArray })
  };



  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      name,
      clave,
      qualityExams,
      MP,
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


  const plainOptions = [
    "IR",
    "Densidad aparente",
    "Humedad",
    "Apariencia",
    "Sabor",
    "PH",
  ];

  function onChange(checkedValues) {
    console.log(checkedValues.target);
    return setForm({ ...form, qualityExams: checkedValues });
  }

  function onChangeSelect(value,contador){
   let oldForm=form 
    oldForm.MP[contador].claveMP = value
    setForm(oldForm)
  }

  function onChangeSelectPorc(event,index){
    event.preventDefault();
   let oldForm =form 
   let value =parseFloat(event.target.value)
    oldForm.MP[contador].porcentaje = value
   setForm(oldForm)
   console.log("NEW------>", oldForm)
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

        {MPList.map((mp,index) =>{ 

        return(
          <>
            <br />
            <Input.Group compact>
              <Form.Item
                noStyle
                rules={[{ required: true, message: "Province is required" }]}
                name="MP"
                key={index}
              >
                <Select
                  placeholder="Selecciona MP"
                  onChange={(e)=>onChangeSelect(e,index)}
                  name="MP"
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
                  name="Porcentaje"
                  onChange={(e)=>onChangeSelectPorc(e,index)}
                  value= {porcentaje}
                  index={contador}

                />
              </Form.Item>
            </Input.Group>
            <br />
          </>
        )})}
        <button type="danger" onClick={(e)=>addMP(e)}>
          Add Mp
        </button>

        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="button__submit" type="submit" onClick={(e)=>handleFormSubmission(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}  