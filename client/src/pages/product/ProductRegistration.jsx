import React, { useState, useEffect } from "react";
import { regisProduct } from "../../services/product";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import { getAllMP } from "../../services/mp";
import { getAllProducts } from "../../services/product";
import {
  DeleteOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import {
  Checkbox,
  Layout,
  Breadcrumb,
  Form,
  Col,
  Row,
  Input,
  Button,
  Select,
  Skeleton
} from "antd";
import Swal from "sweetalert2";
import "./product.scss";
const { Content } = Layout;
const { Option } = Select;

export default function SEEPRODUCTDETAIL(props) {
  const [form, setForm] = useState({
    name: "",
    clave: "",
    qualityExams: [],
    MP:[{claveMP:0, porcentaje:0}],
    productMP:[{claveProduct:0, porcentaje:0}]
  });
  const { name, clave, qualityExams,MP, productMP} = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //MP
  const [counter, setContador] = useState(0);
  const [MPList, setMPList] = useState([]);
  const obtainMP = async () => {
    getAllMP()
      .then((res) => {
        setMPList(res.data.MP);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    obtainMP();
  },[]);
  const addMP = (event) => {
    event.preventDefault();
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
  function onChangeSelect(value,contador){
    let oldFormMpSelect=form 
     oldFormMpSelect.MP[contador].claveMP = value
    return setForm(oldFormMpSelect)
   }
 
   function onChangeSelectPorc(event,index){
     event.preventDefault();
     let oldFormSelecPorc =form.MP
     let value =parseFloat(event.target.value)
     oldFormSelecPorc[index].porcentaje = value
     return setForm({ ...form, MP: oldFormSelecPorc })
   }


   //Product
   const [counterProd, setProductContador] = useState(0);
   const [productList, setProductList] = useState([]);
   const obtainProduct = async () => {
    getAllProducts()
       .then((res) => {
        setProductList(res.data.AllProducts);
       })
       .catch((err) => console.log(err));
   };
 
   useEffect(() => {
     obtainProduct();
   },[]);
   const addProduct = (event) => {
     event.preventDefault();
     let count = counterProd
     let mpOld = productMP
     mpOld.push({"claveProduct":0, "porcentaje":0})
     setForm({ ...form, productMP: mpOld })
     count++
     setProductContador(count)
   };
   const handleDeleteProduct=(event,insdx) =>{
     event.preventDefault();
     const productMPL=productMP
     let mprdOld = productMPL
     const mprNew = mprdOld.filter(function (item, indx){
       if(indx !== insdx){
         return item}
     })
    return setForm({ ...form, productMP: mprNew })
     
   }
   function onChangeSelectProduct(value,contador){
     let oldFormProd=form 
      oldFormProd.productMP[contador].claveProduct = value
     return setForm(oldFormProd)
    }
  
    function onChangeSelectPorcProduct(event,index){
      event.preventDefault();
      let oldFormP =form.productMP
      let value =parseFloat(event.target.value)
      oldFormP[index].porcentaje = value
      return setForm({ ...form, productMP: oldFormP })
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
      productMP
    };
    regisProduct(productRegisForm).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
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


              <Col key={`clg`}span={12}>
              <h1>Materias Primas</h1>
              {!MP ?
              <Skeleton></Skeleton> :
              MP.map((mp,ind) =>{
                const index = ind
                let numberK = index +1
        return(
          <Form.Item
          label={`Materia prima ${numberK}  :`}
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
              key={`mgud${index}`}
              style={{ width: "46%" }}
              placeholder="Selecciona MP"
              onChange={(e)=>onChangeSelect(e,index)}
              name="MP"
              >
                {!MPList ?
                  <LoadingOutlined />
                  :
                  MPList.map((mp, indx) => 
              {
                return(
                  <Option key={`mp${indx}`} value={mp.clave}>
                  {mp.clave}
                </Option>)
                  }
                  
                  )
                }
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
                {
                  MP.length > 1 ?
                  <Button key={`bt${index}`} style={{ width: "25%" }}type="danger" id={index} onClick={(e)=>handleDeleteMP(e,index)}>
                  <DeleteOutlined key={`c${index}`} style={{ fontSize: '25px', color: '#ffffff' }} />
                  </Button>
                  :
                  <br key={`st${index}`}/>
                }
              

            </Input.Group>
            </Form.Item>
            
            )})}
            <Form.Item wrapperCol={{ offset: 8, span: 5 }}>
            <Button type="danger"  onClick={(e)=>addMP(e)}>
            Agregar Mp
          </Button>
          </Form.Item>
              
            </Col>








            <Col key={`clhhg`}span={12}>
            <h1>Producto MP</h1>
            {!productMP ?
            <Skeleton></Skeleton> :
            productMP.map((mp,indes) =>{
              const indexprod = indes
              let numberKsc = indexprod +1
      return(
        <Form.Item
        label={`Producto ${numberKsc}  :`}
        key={`msfr${indexprod}`}
        rules={[
          {
            required: true,
            message: "Secciona mater prima.",
          },
        ]}
      >
          <Input.Group
          label="Producto para materia prima:"
          key={indexprod} 
          compact>
            <Select
            key={`mad${indexprod}`}
            style={{ width: "46%" }}
            placeholder="Selecciona Producto para MP"
            onChange={(e)=>onChangeSelectProduct(e,indexprod)}
            name="productMP"
            >
              {!productList ?
                <LoadingOutlined />
                :
                productList.map((product, indx) => 
            {
              return(
                <Option key={`mep${indx}`} value={product.clave}>
                {product.clave}
              </Option>)
                }
                
                )
              }
            </Select>
            <Input
              style={{ width: "29%" }}
              placeholder="Porcentaje"
              name="Porcentaje"
              onChange={(e)=>onChangeSelectPorcProduct(e,indexprod)}
              value= {productMP[indexprod].porcentaje }
              indexprod={indexprod}
              key={`mew${indexprod}`}
              type="Number"
              step="any"
              />
              {
                productMP.length > 1 ?
                <Button key={`b3t${indexprod}`} style={{ width: "25%" }}type="danger" id={indexprod} onClick={(e)=>handleDeleteProduct(e,indexprod)}>
                <DeleteOutlined key={`cx${indexprod}`} style={{ fontSize: '25px', color: '#ffffff' }} />
                </Button>
                :
                <br key={`s2t${indexprod}`}/>
              }
            

          </Input.Group>
          </Form.Item>
          )})}
          <Form.Item wrapperCol={{ offset: 8, span: 5 }}>
          <Button type="danger"  onClick={(e)=>addProduct(e)}>
          Agregar Producto
        </Button>
        </Form.Item>
          </Col>


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