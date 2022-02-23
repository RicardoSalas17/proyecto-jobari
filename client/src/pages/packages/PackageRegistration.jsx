import React, { useState } from "react";
import { regisPackage } from "../../services/packages";
import { useNavigate } from "react-router-dom";
import "./packages.scss";
import * as PATHS from "../../utils/paths";
import {
  Layout,
  Breadcrumb,
  Form,
  Col,
  Row,
  Input,
  Button,
} from "antd";
import Swal from "sweetalert2";


const { Content } = Layout;
export default function Custumer(props) {
  const [form, setForm] = useState({
    name:"",
    clave: "",
    capacity:0 ,
  });
  const { name, clave, capacity } = form;
  const navigate = useNavigate();

function handleInputChange(event) {
  const { name, value } = event.target;
  if(name==="capacity"){
const values= parseInt(value)
return setForm({ ...form, [name]: values });
  }
return setForm({ ...form, [name]: value });

  }

  function handleFormSubmission() {
    const { user } = props;
    const formRegisPackages = {
      name,
      clave,
      capacity,
      author: user._id,
    };
console.log("formRegisPackages",formRegisPackages)
    
    if (name === "" || clave === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, llena todos los campos",
      });
    }    else if(!capacity){
      Swal.fire({
        icon: 'error',
        title: 'Error al ingresar Clave',
        text: "Por favor, llena el campo de capacidad solo con numeros y sin espacios"
      })
    }  else {
      Swal.fire({
        title: `Se creara un empaque con la clave : ${clave}, Quieres continuar?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`,
      }).then((result) => {
        if (result.isConfirmed) {
          regisPackage(formRegisPackages).then((res) => {
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
            title: `Se creo Empaque: ${res.data.name}`,
            showConfirmButton: false,
            timer: 1500
    })
   // navigate(`${PATHS.SEEALLPACKAGES}`);
    navigate(`/packages-detail/${res.data._id}`);
  }
          });
        } else if (result.isDenied) {
          Swal.fire("No se hicieron cambios", "", "info");
        }
      });
    }
  }



  return (
    <Content style={{ padding: "30px 50px 1px 50px " }}>
      <div className="site-layout-content">
        <Row>
          <Col span={24}>
            <h1>Nuevo Empaque</h1>
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
                label="Nombre del empaque:"
                rules={[
                  {
                    required: true,
                    message: "Porfavor escribe el Nombre del empaque.",
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
                    message: "Porfavor escribe la clave del empaque.",
                  },
                ]}
              >
                <Input
                  name="clave"
                  value={clave}
                  onChange={handleInputChange}
                  placeholder="Clave del empaque"
                />
              </Form.Item>

              <Form.Item
                label="Capacidad:"
                rules={[
                  {
                    required: true,
                    message: "Porfavor escribe la capacidad.",
                  },
                ]}
              >
                <Input
                  name="capacity"
                  value={capacity}
                  onChange={handleInputChange}
                  placeholder="Capacidad del empaque"
                  type="parseInt"
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
    