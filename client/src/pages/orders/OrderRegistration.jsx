import React, { useState, useEffect } from "react";
import { regisOrder } from "../../services/order";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import { getAllClients } from "../../services/custumer";
import { getAllProducts } from "../../services/product";
import { getAllPackages } from "../../services/packages";
import "./orders.scss";
import {
  Layout,
  Breadcrumb,
  Form,
  Col,
  Row,
  Input,
  Button,
  Select,
} from "antd";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
const { Content } = Layout;

export default function Oder(props) {
  const [form, setForm] = useState({
    orderNumber: "",
    client: "",
    product: [{ claveProduct: 0, cantidad: 0, package: "", amount: 0 }],
  });
  const { orderNumber, client, product } = form;
  const navigate = useNavigate();

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
    let add = 1;
    let conterOrg = contador;
    let newCount = conterOrg + add;
    setContador(newCount);
    const myProduct = [...productList, {}];
    setproductCounter(myProduct);
    let oldArray = form.product;
    let newData = { claveProduct: 0, cantidad: 0, package: "", amount: 0 };
    oldArray.push(newData);
    return setForm({ ...form, product: oldArray });
  };
  const deleteProduct = (event, indx) => {
    event.preventDefault();
    let add = 1;
    let conterOrg = contador;
    let newCount = conterOrg - add;
    setContador(newCount);
    const myProduct = [...productList, {}];
    setproductCounter(myProduct);
    let oldArray = form.product;
    oldArray.splice(indx, 1);
    return setForm({ ...form, product: oldArray });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "orderNumber") {
      return setForm({ ...form, [name]: Number(value) });
    }
    return setForm({ ...form, [name]: value });
  };

  const handleFormSubmission = (event) => {
    // event.preventDefault();
    //console.log(form)
    const { user } = props;
    const regisOrderForm = {
      orderNumber,
      client,
      products: product,
      author: user._id,
    };
   // console.log("credentials---", regisOrderForm);

    Swal.fire({
      title: `Se creara una orden, Quieres continuar?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        regisOrder(regisOrderForm).then((res) => {
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
              icon: "success",
              title: `Se creo orden con numero**`,
              showConfirmButton: false,
              timer: 1500,
            });
             navigate(PATHS.SEEALLORDERS);
            //navigate(`${PATHS.SEEALLPRODUCTS}/${res.data.custumer._id}`);
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se hicieron cambios", "", "info");
      }
    });

      /*regisOrder(regisOrderForm).then((res) => {
      if (!res.status) {
 
      }
   //   navigate(PATHS.SEECALENDAR);
   });*/
  };

  const onChangeSelectPorc = (event, index) => {
    let name = event.target.name;
    let value = event.target.value;
    let newArray = form.product;
    if (name === "claveProduct") {
      newArray[index].claveProduct = value;
    }
    if (name === "package") {
      newArray[index].package = value;
    }
    if (name === "cantidad") {
      newArray[index].cantidad = Number(value);
    }
    if (name === "amount") {
      newArray[index].amount = Number(value);
    }
    return setForm({ ...form, product: newArray });
  };

  const onChangeSelectClient = (a, e) => {
    return setForm({ ...form, client: e.value });
  };

  return (
    <div>
      <Content style={{ padding: "30px 50px 1px 50px " }}>
        <div className="site-layout-content">
          <Row>
            <Col span={24}>
              <h1>Nuevo Pedido</h1>
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
                  label="Numero de Orden:"
                  rules={[
                    {
                      required: true,
                      message: "Porfavor escribe el Numero de orden.",
                    },
                  ]}
                >
                  <Input
                    type="Number"
                    name="orderNumber"
                    value={orderNumber}
                    onChange={handleInputChange}
                    placeholder="Numero de orden"
                  />
                </Form.Item>

                <Form.Item label="Cliente:">
                  <Select
                    placeholder="Selecciona un Cliente"
                    onChange={(e, i) => {
                      onChangeSelectClient(e, i);
                    }}
                    name="client"
                  >
                    {!clientLists ? (
                      <LoadingOutlined />
                    ) : (
                      clientLists.map((client, indx) => (
                        <Option key={indx} value={client._id}>
                          {client.custumername}
                        </Option>
                      ))
                    )}
                  </Select>
                </Form.Item>
                {product.map((mp, index) => {
                  return (
                    <>
                      <Input.Group compact>
                        <label htmlFor="input-username">Producto:</label>
                        <Form.Item
                          noStyle
                          rules={[
                            { required: true, message: "Province is required" },
                          ]}
                          key={index}
                        >
                          <Select
                            placeholder="Selecciona Producto"
                            onChange={(e) =>
                              onChangeSelectPorc(
                                { target: { name: "claveProduct", value: e } },
                                index
                              )
                            }
                            name="Product"
                            value={product[index].clave}
                          >
                            {!productLists ? (
                              <div>cargandio</div>
                            ) : (
                              productLists.map((products, indx) => (
                                <Option key={indx} value={products._id}>
                                  {products.clave}
                                </Option>
                              ))
                            )}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          noStyle
                          rules={[
                            { required: true, message: "Cantidad is required" },
                          ]}
                        >
                          <Input
                            style={{ width: "50%" }}
                            placeholder="Cantidad"
                            type="Number"
                            name="cantidad"
                            value={product[index].cantidad}
                            onChange={(e) => onChangeSelectPorc(e, index)}
                            index={contador}
                          />
                        </Form.Item>
                        <Form.Item
                          noStyle
                          rules={[
                            {
                              required: true,
                              message: "Porcentaje is required",
                            },
                          ]}
                        >
                          <br />
                          <br />
                          <label htmlFor="input-username">Monto:</label>
                          <Input
                            style={{ width: "50%" }}
                            placeholder="Monto"
                            type="Number"
                            name="amount"
                            onChange={(e) => onChangeSelectPorc(e, index)}
                            value={product[index].amount}
                            index={contador}
                          />
                        </Form.Item>
                      </Input.Group>
                      <br />

                      <label htmlFor="input-username">
                        Material de empaque:
                      </label>
                      <Select
                        placeholder="Selecciona Material de empaque"
                        onChange={(e) =>
                          onChangeSelectPorc(
                            { target: { name: "package", value: e } },
                            index
                          )
                        }
                        name="MP"
                      >
                        {packageLists.map((packages, indx) => (
                          <Option key={indx} value={packages._id}>
                            {packages.name}
                          </Option>
                        ))}
                      </Select>
                      <br />

                      {product.length > 1 && (
                        <Form.Item wrapperCol={{ offset: 8, span: 5 }}>
                          <Button
                            type="danger"
                            onClick={(e) => deleteProduct(e, index)}
                          >
                            Eliminar producto
                            <DeleteOutlined
                                    key={`c${index}`}
                                    style={{
                                      fontSize: "20px",
                                      color: "#ffffff",
                                    }}
                                  />
                          </Button>
                        </Form.Item>
                      )}
                      <br />
                    </>
                  );
                })}
                <Form.Item wrapperCol={{ offset: 8, span: 5 }}>
                  <Button type="primary" onClick={(e) => addProduct(e)}>
                    Add Product
                  </Button>
                </Form.Item>
                <br />
                <br />
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
}
