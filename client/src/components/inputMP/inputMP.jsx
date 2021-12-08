import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import { getAllMP } from "../../services/mp";

import {
    Form,
    Input,
    Select
  } from "antd";

const InputMP = (props) => {
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

  const { Option } = Select;
  const [form, setForm] = useState({
    MP: "",
    porcentaje: "",
  });
  const { MP, porcentaje } = form;
  function getValueMP(event) {

    const name = "MP"
    const value = event

   onChange(name, value)
      }

  function onChange(name, value){
         setForm({ ...form, [name]: value });
        //console.log(form)
      }

  return ( 
  
      <Input.Group compact>
        <Form.Item

          noStyle
          rules={[{ required: true, message: "Province is required" }]}
          name="MP"  
        >
          <Select
           placeholder="Selecciona MP" 
           onChange={getValueMP}  
           name="MP"
           value= "2"
           >
            {MPList.map(({ clave }) => (
              <Option 
              key={clave}
              value={clave}
               >{clave} </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={["MP", "porcentaje"]}
          noStyle
          rules={[{ required: true, message: "Porcentaje is required" }]}
        >
          <Input style={{ width: "50%" }} placeholder="Porcentaje" type="number" />
        </Form.Item>
      </Input.Group>
  );
};

export default InputMP;