import React, { useState } from "react";
import { regisMP } from "../services/mp";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { Checkbox } from "antd";

export default function Custumer({ authenticate }) {
  const [form, setForm] = useState({
    name:"",
    clave: "",
    qualityExams:[] ,
  });
  const { name, clave, qualityExams } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
console.log(event)
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
    console.log("credentials---",credentials)
    regisMP(credentials).then((res) => {
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
    return setForm({ ...form, qualityExams: checkedValues });
  }

  return (
    <div>
      <h1>Nueva MP</h1>
      <form onSubmit={handleFormSubmission} className="signup__form">
      <label htmlFor="input-username">Nombre de la materia prima</label>
        <input
          id="input-username"
          type="text"
          name="name"
          placeholder="Nombre"
          value={name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="input-username">Clave de la materia prima</label>
        <input
          id="input-username"
          type="text"
          name="clave"
          placeholder="Clave de la materia prima"
          value={clave}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password">Pruebas de calidad:</label>
        <Checkbox.Group name="qualityExams" options={plainOptions} onChange={onChange}  />
        <br />

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
