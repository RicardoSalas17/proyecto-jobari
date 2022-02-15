import React, { useState } from "react";
import { regisMP } from "../../services/mp";
import { useNavigate } from "react-router-dom";
import "./mp.scss";
import * as PATHS from "../../utils/paths";
import {
  Checkbox,
  Layout,
  Breadcrumb,
  Form,
  Col,
  Row,
  Input,
  Button,
} from "antd";
import Swal from "sweetalert2";
import "./mp.scss";
const { Content } = Layout;
export default function Custumer(props) {
  const [form, setForm] = useState({
    name: "",
    clave: "",
    qualityExams: [],
  });
  const { name, clave, qualityExams } = form;
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "clave"){
      let valuesNumber = Number(value)
     return setForm({ ...form, [name]: valuesNumber});  
     }
     else{
     return setForm({ ...form, [name]: value });
     }
  }

  function handleFormSubmission() {
    const { user } = props;
    const formRegisMp = {
      name,
      clave,
      qualityExams,
      author: user._id,
    };

    if (name === "" || clave === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, llena todos los campos",
      });
    }    else if(!clave){
      Swal.fire({
        icon: 'error',
        title: 'Error al ingresar Clave',
        text: "Por favor, llena el campo clave solo con numeros y sin espacios"
      })
    } 
    else if (qualityExams.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error al ingresar Pruebas de calidad",
        text: "Por favor, selecciona las pruebas de calidad",
      });
    } else {
      Swal.fire({
        title: `Se creara un cliente con la clave : ${clave}, Quieres continuar?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`,
      }).then((result) => {
        if (result.isConfirmed) {
          regisMP(formRegisMp).then((res) => {
            if (!res.status) {
              res.errstatus === 400 &&
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `${res.errorMessage}`,
                });
              res.errstatus === 500 &&
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `Algo esta mal`,
                });
            }

            if (res.status) {
            Swal.fire({
            icon: 'success',
            title: `Se creo Materia Prima: ${res.data.Mp.name}`,
            showConfirmButton: false,
            timer: 1500
    })
    navigate(`${PATHS.SEEALLMP}`);
   // navigate(`${PATHS.SEEALLPRODUCTS}/${res.data.Mp._id}`);
  }
          });
        } else if (result.isDenied) {
          Swal.fire("No se hicieron cambios", "", "info");
        }
      });
    }
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
    <Content style={{ padding: "30px 50px 1px 50px " }}>
      <div className="site-layout-content">
        <Row>
          <Col span={24}>
            <h1>Nueva MP</h1>
          </Col>
        </Row>
        <Row justify="center" align="center">
          <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>
          <Col className="formAuth" span={24}>
            <Form
              name="basic"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 8 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={handleFormSubmission}
            >
              <Form.Item
                label="Nombre de la materia prima:"
                rules={[
                  {
                    required: true,
                    message: "Porfacor escribe el Nombre del cliete.",
                  },
                ]}
              >
                <Input
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
              </Form.Item>
              <Form.Item
                label="Clave:"
                rules={[
                  {
                    required: true,
                    message: "Porfacor escribe el Nombre del cliete.",
                  },
                ]}
              >
                <Input
                  name="clave"
                  value={clave}
                  onChange={handleInputChange}
                  placeholder="Clave de la materia prima"
                />
              </Form.Item>
              <Form.Item
                label="Pruebas de Calidad:"
                rules={[
                  {
                    required: true,
                    message: "Porfacor escribe el Nombre del cliete.",
                  },
                ]}
              >
                <Checkbox.Group
                  name="qualityExams"
                  options={plainOptions}
                  onChange={onChange}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 5 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Content>
  );
}
