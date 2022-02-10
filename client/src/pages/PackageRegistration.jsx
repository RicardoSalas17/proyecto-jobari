import React, { useState } from "react";
import { regisPackage } from "../services/packages";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { Checkbox } from "antd";

export default function Custumer({ authenticate }) {
  const [form, setForm] = useState({
    name:"",
    clave: "",
    capacity:0 ,
  });
  const { name, clave, capacity } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
const { name, value } = event.target;
return setForm({ ...form, [name]: value });

  }

  function handleFormSubmission(event) {
  event.preventDefault();
    const credentials = {
        name,
      clave,
      capacity,
    };
    console.log("credentials---",credentials)
    //console.log("authenticate---", authenticate);
    regisPackage(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      setForm({
        name:"",
        clave: "",
        capacity:0 ,
      })
      //navigate(PATHS.NEWPACKAGE);
    });
  }

  return (
    <div>
      <h1>Nuevo Empaque</h1>
      <form onSubmit={handleFormSubmission} className="signup__form">
      <label htmlFor="input-username">Nombre del empaque</label>
        <input
          id="input-username"
          type="text"
          name="name"
          placeholder="Nombre"
          value={name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="input-username">Clave del empaque</label>
        <input
          id="input-username"
          type="text"
          name="clave"
          placeholder="Clave de la materia prima"
          value={clave}
          onChange={handleInputChange}
          required
        />
        <br />
        <label htmlFor="input-username">Capacidad del empaque</label>
        <input
          id="input-username"
          type="number"
          name="capacity"
          placeholder="Capacidad de la materia prima"
          value={capacity}
          onChange={handleInputChange}
          required
        />

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
