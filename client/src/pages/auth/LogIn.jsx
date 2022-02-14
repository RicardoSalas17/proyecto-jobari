import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./auth.scss";
import * as PATHS from "../../utils/paths";
import * as USER_HELPERS from "../../utils/userToken";
import { Layout, Breadcrumb, Form, Col, Row, Input, Button } from "antd";
import Swal from "sweetalert2";
const { Content } = Layout;

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    mail: "",
    password: "",
  });
  const { mail, password } = form;
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission() {
    const credentials = {
      mail,
      password,
    };
    if (mail === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, llena todos los campos",
      });
    } else {
      login(credentials).then((res) => {
        // unsuccessful login
        if (!res.status) {
          return Swal.fire({
            icon: "error",
            title: `Error ${res.errorStatus}`,
            text: `${res.errorMessage}.`,
          });
        }
        // successful login
        if (res.status) {
          Swal.fire({
            icon: "success",
            title: `Se inicio seson de ${mail}`,
            showConfirmButton: false,
            timer: 1500,
          });
          USER_HELPERS.setUserToken(res.data.accessToken);
          authenticate(res.data.user);
          navigate(PATHS.HOMEPAGE);
        }
      });
    }
  }

  return (
    <Content style={{ padding: "30px 50px 0 50px " }}>
      <div className="site-layout-content">
        <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>
        <Row align="middle">
          <Col span={24}>
            <h1>Login</h1>
          </Col>
          <Col className="formAuth" span={24}>
            <Form
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 4 }}
              layout="horizontal"
              onFinish={handleFormSubmission}
            >
              <Form.Item label="E-mail" rules={[{ type: "email" }]}>
                <Input
                  id="input-mail"
                  type="mail"
                  name="mail"
                  placeholder="E-mail"
                  value={mail}
                  onChange={handleInputChange}
                  required
                />
              </Form.Item>
              <Form.Item label="Contraseña">
                <Input
                  id="input-password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleInputChange}
                  required
                  minLength="8"
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Content>
  );
}
