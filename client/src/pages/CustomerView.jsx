import React, { useState, useEffect } from "react";
import { regisOrder } from "../services/order";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { getAllOrders } from "../services/order";
import "./ordersview.css";
import { Card, Col, Row } from 'antd';



export default function SEEALLCLIENTS({ authenticate }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);

  const getALLORDERS = async () => {
    getAllOrders()
      .then((res) => {
        const order =res.data.ORDERS
       // console.log(order)
        setOrderList(order);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getALLORDERS()
  }, []);

        return(
<div className="site-card-wrapper">
<Row gutter={16}>
  <Col span={8}>
  {

  orderList===[] ? <div>CARGANDO</div>:

  orderList.map((order,indx) =>
 <Card key={indx}>
    <h2>{order.orderNumber}</h2>
    <h3>{order.client.custumername}</h3>
    {order.product.map((product, indx)=>
    <div key ={indx}>
      <h4>{product.claveProduct}</h4>
    </div>
    )}
    <h5>{order.status}</h5>
  </Card>
                  )
  }
  </Col>
</Row>
</div>            
                  )}  