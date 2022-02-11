import React, { useState } from "react";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./auth.scss";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { Layout, Menu, Breadcrumb ,  Form, Col, Row,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,} from 'antd';
const { Option } = Select;
const { Content} = Layout;


export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    apellidoPat: "",
    apellidoMat: "",
    mail: "",
    role: "",
    author: ""

  });
  const { 
    username,
    password,
    apellidoPat,
    apellidoMat,
    mail,
    role,
    author } = form;
    const roles =["Calidad","Mantenimiento","Gerencia","Administración", "Producción","Sistema","I&D", "Gestión de calidad", "Ventas", "Embarques", "Sistemas", "ADMIN-AP"]
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission() {
//console.log(event)
    //event.preventDefault();
    const credentials = {
      username,
      password,apellidoPat,
      apellidoMat,
      mail,
      role,
      author 
    };
    console.log(credentials)
    /*
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      // successful signup
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });*/
  }

  return (
    <Content style={{ padding: '30px 50px 0 50px ' }}>
      <div className="site-layout-content">
        <Breadcrumb style={{ margin: '6vh 0' }}>
      </Breadcrumb>
          <Row align="middle">
      <Col span={24}><h1>Sign Up</h1></Col>
            <Col className="formAuth" span={24}>
          <Form
          
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 4 }}
      layout="horizontal"
      onFinish={handleFormSubmission}
    >
      <Form.Item label="Nombre de Usuario"
      rules={[{ required: true }]}>
        <Input 
          id="input-username"
          type="text"
          name="username"
          placeholder="Nombre"
          value={username}
          onChange={handleInputChange}
          required/>
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

           <Form.Item label="Apellido Paterno">
        <Input
          id="input-apellidoPat"
          type="text"
          name="apellidoPat"
          placeholder="Apellido Paterno"
          value={apellidoPat}
          onChange={handleInputChange}
          required
        />
           </Form.Item>

        <Form.Item label="Apellido Mateno">
        <Input
          id="input-apellidoMat"
          type="text"
          name="apellidoMat"
          placeholder="Apellido Materno"
          value={apellidoMat}
          onChange={handleInputChange}
          required
        />
           </Form.Item>

           <Form.Item label="E-mail"
            rules={[{ type: 'email' }]}>
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
           <Form.Item label="Role">
           <Select 
            style={{ width: 120 }} 
            onChange={(e)=>handleInputChange({"target":{"name":"role","value":e}})}
            rules={[{ required: true }]}
            allowClear>
           {roles.map((role,indx) =>                    
                        <Option key={indx} value={role}>
                        {role}
                      </Option>
                  )}
            </Select>
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
