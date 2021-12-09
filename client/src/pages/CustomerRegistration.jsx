import React, { useState } from "react";
import { regisCustumer } from "../services/custumer";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";

export default function Custumer({ authenticate }) {
  const [form, setForm] = useState({
    custumername: "",
    direction: "",
  });
  const { custumername, direction } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      custumername,
      direction,
    };
    regisCustumer(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.NEWCUSTUMER);
    });
  }

  return (
    <div>
      <h1>Nuevo Cliente</h1>
      <form onSubmit={handleFormSubmission} className="signup__form">
        <label htmlFor="input-username">Nombre del cliente</label>
        <input
          id="input-username"
          type="text"
          name="custumername"
          placeholder="Nombre del cliente"
          value={custumername}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password">Dirección</label>
        <input
          id="input-password"
          type="text"
          name="direction"
          placeholder="Dirección"
          value={direction}
          onChange={handleInputChange}
          required
          minLength="8"
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
