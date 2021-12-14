import React, { useState, useEffect } from "react";
import { regisOrder } from "../services/order";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { Checkbox } from "antd";
import InputMP from "../components/inputMP/inputMP";
import { getAllMP } from "../services/mp";
import { getAllClients } from "../services/custumer";
import { getAllProducts } from "../services/product";
import { getAllPackages } from "../services/packages";



import { Form, Input, Select } from "antd";

export default function Oder({ authenticate }) {
  const [form, setForm] = useState({
    orderNumber: "",
    client: "",
    product:[{claveProduct: 0, monto: 0, package: "", amount: 0}]

  });
  const { orderNumber, client,product,claveMP,porcentaje} = form;

  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const [MPLists, setMPList] = useState([]);
  const x = async () => {
    getAllMP()
      .then((res) => {
        setMPList(res.data.MP);
      })
      .catch((err) => console.log(err));
  };


  const [clientLists, seClientList] = useState([]);
  const obtainClients = async () => {
    getAllClients()
      .then((res) => {
         // console.log(res.data.Custumers)
        seClientList(res.data.Custumers);
      })
      .catch((err) => console.log(err));
  };

  const [productLists, setProductList] = useState([]);
  const obtainProducts = async () => {
    getAllProducts()
      .then((res) => {
         // console.log(res.data.AllProducts)
         setProductList(res.data.AllProducts);
      })
      .catch((err) => console.log(err));
  };

  const [packageLists, setPackageList] = useState([]);
  const obtainPackages = async () => {
    getAllPackages()
      .then((res) => {
          //console.log(res.data)
         setPackageList(res.data.Packages);
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    obtainProducts();
    obtainClients();
    obtainProducts();
    obtainPackages();
  }, []);


  const { Option } = Select;
  const [productList, setproductCounter] = useState([1]);
  let [contador, setContador] = useState(0);
  const addProduct = (event) => {
    event.preventDefault();
    let add = 1
    let conterOrg = contador
    let newCount =conterOrg + add 
    setContador(newCount)
    const myProduct = [...productList, {}];
    setproductCounter(myProduct);
    let oldArray=form.product
    let newData={claveProduct: 0, monto: 0, package: "", amount: 0}
    oldArray.push(newData)
  return  setForm({ ...form, product: oldArray })
  };



  function handleInputChange(event) {
    const { name, value } = event.target;
  return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    //event.preventDefault();
    //console.log(form)
    const credentials = {
      orderNumber:orderNumber,
      client:client,
      product:product,
    };
    console.log("credentials---", credentials);
    regisOrder(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.NEWORDER);
   });
  }




  function onChangeSelectPorc(event,index){
      let name =event.target.name
      let value =""
      let oldArray=form.product
      let newArray=form.product
      if(name == "claveProduct" || name ==  "package" ){
       value = event.target.value
      }
      else{
        value =parseFloat(event.target.value)
      }

    name === "claveProduct" ? newArray[index].claveProduct=value:

    name === "package" ? newArray[index].package=value:


    name === "monto" ? newArray[index].monto=value:
    
    name === "amount" ? newArray[index].amount=value:
    console.log("hola")

    console.log("newwwwsasasaaswarrarrrr",newArray)

    return setForm({ ...form,product:newArray });
  }

  return (
    <div>
      <h1>Nuevo Pedido</h1>
      <form className="signup__form">
        <label htmlFor="input-username">Numero de Orden:</label>
        <input
          id="input-username"
          type="number"
          name="orderNumber"
          placeholder="Numero de orden"
          value={orderNumber}
          onChange={handleInputChange}
          required/>
                      <br />
                      <br />
                  <Form.Item
                noStyle
                rules={[{ required: true, message: "Province is required" }]}
                name=""
              >
                <label htmlFor="input-username">Cliente:</label>  
                <Select
                  placeholder="Selecciona Cliente"
                  onChange={(e)=>handleInputChange({"target":{"name":"client","value":e}})}
                  name=""
                >
                  {clientLists.map((client,indx) =>                    
                        <Option key={indx} value={client.custumername}>
                        {client.custumername}
                      </Option>
                  )}
                </Select>
              </Form.Item>              
              <br />
              <br />
        {productList.map((mp,index) =>{ 
        return(
          <>
            <Input.Group compact>
           <label htmlFor="input-username">Producto:</label> 
              <Form.Item
                noStyle
                rules={[{ required: true, message: "Province is required" }]}
                name="MP"
                key={index}
              >

                <Select
                  placeholder="Selecciona Producto"
                  onChange={(e)=>onChangeSelectPorc({"target":{"name":"claveProduct","value":e}},index)}
                  name="Product"
                >
                  {productLists.map((product,indx) =>                    
                        <Option key={indx} value={product.clave}>
                        {product.clave}
                      </Option>
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                name={["MP", "porcentaje"]}
                noStyle
                rules={[{ required: true, message: "Porcentaje is required" }]}
              >
                <Input
                  style={{ width: "50%" }}
                  placeholder="Cantidad"
                  type="number"
                  name="amount"
                  onChange={(e)=>onChangeSelectPorc(e,index)}
                  value= {porcentaje}
                  index={contador}
                />
              </Form.Item>
              <Form.Item
                name={["MP", "porcentaje"]}
                noStyle
                rules={[{ required: true, message: "Porcentaje is required" }]}
              >
                  <br />
                  <br />
                             <label htmlFor="input-username">Monto:</label>  
                <Input
                  style={{ width: "50%" }}
                  placeholder="Monto"
                  type="number"
                  name="monto"
                  onChange={(e)=>onChangeSelectPorc(e,index)}
                  value= {porcentaje}
                  index={contador}

                />
              </Form.Item>
            </Input.Group>
            <br />

            <label htmlFor="input-username">Material de empaque:</label>      
            <Select
                  placeholder="Selecciona Material de empaque"
                  onChange={(e)=>onChangeSelectPorc({"target":{"name":"package","value":e}},index)}
                  name="MP"
                >
                  {packageLists.map((packages,indx) =>                    
                        <Option key={indx} value={packages.name}>
                        {packages.name}
                      </Option>
                  )}
                </Select>  
                <br />
              <br />
          </>
        )})}
              <br />
              <br />
        <button type="danger" onClick={(e)=>addProduct(e)}>
          Add Product
        </button>
        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}
        <button className="button__submit" type="submit" onClick={(e)=>handleFormSubmission(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}  