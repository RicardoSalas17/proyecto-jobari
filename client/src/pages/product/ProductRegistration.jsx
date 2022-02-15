import React, { useState, useEffect } from "react";
import { regisProduct } from "../../services/product";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import { getAllMP } from "../../services/mp";
import {
  Checkbox,
  Layout,
  Breadcrumb,
  Form,
  Col,
  Row,
  Input,
  Button,
  Select
} from "antd";
import Swal from "sweetalert2";
import "./product.scss";
const { Content } = Layout;

export default function SEEPRODUCTDETAIL(props) {
  const [form, setForm] = useState({
    name: "",
    clave: "",
    qualityExams: [],
    MP:[{claveMP:0, porcentaje:0}]
  });
  const { name, clave, qualityExams,MP} = form;


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

  const { Option } = Select;
  const [counter, setContador] = useState(0);

  useEffect(() => {
    obtainProducts();
  },[]);
  const addMP = (event) => {
    event.preventDefault();
    console.log(counter)
    let count = counter
    let mpOld = MP
    mpOld.push({"claveMP":0, "porcentaje":0})
    setForm({ ...form, MP: mpOld })
    count++
    setContador(count)
  };
  const handleDeleteMP=(event,indx) =>{
    event.preventDefault();
    let mpOld = MP
    mpOld.splice(indx,1)
   return setForm({ ...form, MP: mpOld })
  }

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
   // event.preventDefault();
    const productRegisForm = {
      name:name,
      clave:clave,
      qualityExams,
      MP,
    };
    console.log("credentials---", productRegisForm);
    /*regisProduct(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.NEWMP);
   });*/
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

  function onChangeSelect(value,contador){
   let oldForm=form 
    oldForm.MP[contador].claveMP = value
   return setForm(oldForm)
  }

  function onChangeSelectPorc(event,index){
    event.preventDefault();
    let oldForm =form.MP
    let value =parseFloat(event.target.value)
    oldForm[index].porcentaje = value
    return setForm({ ...form, MP: oldForm })
  }

  return (
    <div>
<Content style={{ padding: "30px 50px 1px 50px " }}>
      <div className="site-layout-content">
        <Row>
          <Col span={24}>
          <h1>Nuevo Producto</h1>
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
                label="Nombre del producto:"
                rules={[
                  {
                    required: true,
                    message: "Porfavor escribe el Nombre del cliete.",
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
                  placeholder="Clave del producto"
                  type="Number"
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

              {MP.map((mp,index) =>{
        return(
          <Form.Item
          label="Pruebas de Calidad:"
          key={`mfr${index}`}
          rules={[
            {
              required: true,
              message: "Secciona mater prima.",
            },
          ]}
        >
            <Input.Group
            label="Materi Prima:"
            key={index} 
            compact>
              <Select
              key={`md${index}`}
              style={{ width: "46%" }}
              placeholder="Selecciona MP"
              onChange={(e)=>onChangeSelect(e,index)}
              name="MP"
              >
                {console.log("MPs",MPList)}
                {MPList.map((mp, indx) => 
              {
                  console.log("mp",mp)
                return(
                  <Option key={`mp${indx}`} value={mp.clave}>
                  {mp.clave}
                </Option>)
                  }
                  
                  )}
              </Select>
              <Input
                style={{ width: "29%" }}
                placeholder="Porcentaje"
                name="Porcentaje"
                onChange={(e)=>onChangeSelectPorc(e,index)}
                value= {MP[index].porcentaje }
                index={index}
                key={`m${index}`}
                type="Number"
                step="any"
                />

              <Button key={`bt${index}`} style={{ width: "25%" }}type="danger" id={index} onClick={(e)=>handleDeleteMP(e,index)}>
                Eliminar MP
              </Button>
              <br />
                  <p key={`si${index}`} id={index}></p>

            </Input.Group>
            </Form.Item>
        )})}
    <Form.Item wrapperCol={{ offset: 8, span: 5 }}>
          <Button type="danger"  onClick={(e)=>addMP(e)}>
          Add Mp
        </Button>
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
    </div>
  );
}  /*
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
value= {MP[index].porcentaje}
index={contador}
/>
</Form.Item>
<Button type="danger">
Eliminar MP
</Button>*/