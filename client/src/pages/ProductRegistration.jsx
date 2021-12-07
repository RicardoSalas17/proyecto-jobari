import React, { useState, useEffect } from "react";
import { regisProduct } from "../services/product";
import { getAllMP } from "../services/mp";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import {
  Checkbox,
  Form,
  Input,
  Select
} from "antd";

export default function Custumer({ authenticate }) {
  const [form, setForm] = useState({
    name: "",
    clave: "",
    qualityExams: [],
  });
  const { name, clave, qualityExams } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [MPList, setMPList] = useState([]);

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

  function handleInputChange(event) {
    console.log(event);
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }
  const { Option } = Select;
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
      <form className="signup__form">
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
        <br />
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
        <br />
        <label htmlFor="input-password">Pruebas de calidad:</label>
        <Checkbox.Group
          name="qualityExams"
          options={plainOptions}
          onChange={onChange}
        />
        <br />

        <label htmlFor="input-password">Pruebas de calidad:</label>
        <Checkbox.Group name="qualityExams" options onChange={onChange} />
        <br />

        <Form
          name="complex-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="Address">
            <Input.Group compact>
              <Form.Item
                name={["address", "province"]}
                noStyle
                rules={[{ required: true, message: "Province is required" }]}
              >
                <Select placeholder="Select">
                  {MPList.map(({ clave }) => (
                    <Option value={clave}>{clave} </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={["address", "street"]}
                noStyle
                rules={[{ required: true, message: "Street is required" }]}
              >
                <Input style={{ width: "50%" }} placeholder="Input street" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Form>

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
