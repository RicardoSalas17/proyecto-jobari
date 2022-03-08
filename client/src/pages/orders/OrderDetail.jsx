import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { getOrder } from "../../services/order";
import { Col, Row, Skeleton, Layout, Breadcrumb } from 'antd';
import "./orders.scss";
const { Content } = Layout;

export default function SEEOORDERDETAIL(props) {
  const [orderData, setOrderData] = useState({});
  const {id} = useParams()

  const getOneOrder = async () => {
     getOrder(id)
      .then((res) => {
          const data = res.data
         return setOrderData(data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOneOrder()
  },[]);

        return(
        <Content style={{ padding: "30px 50px 0 50px " }}>
      <div className="site-layout-content">
      <Row>
      <Col span={24}>
            <h1>Detalle de la orden</h1>
          </Col>
          </Row>
      <Row className="for">
        <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>

        {!orderData.orderNumber ?
            <Col className="formAuth" span={24}>
          <Skeleton></Skeleton>
          </Col>
          :
          <Col className="formAuth" span={24}>
        <h2>Numero de Orden: {orderData.orderNumber}</h2>
        <h2>Cliente: {orderData.client.custumername}</h2>
        {
    orderData.products.map((product, indx)=>
     product.claveProduct &&
      <div key ={indx}>
      <h2>Prducto:</h2>
      <h3>{product.claveProduct.name}</h3>
      <h3>{product.claveProduct.clave}</h3>
      <h2>Cantidad:</h2>
      <h3>{product.cantidad} kg</h3>
      <h2>Empaque:</h2>
      <h3>{product.package.name}</h3>
      <h3>{product.package.clave}</h3>
      <h2>Monto:</h2>
      <h3>${product.amount}</h3>
    </div>
    )
    
    }
<h2>Total: ${orderData.total}</h2>
          </Col>}
        </Row>
      </div>
    </Content>
                 )}

