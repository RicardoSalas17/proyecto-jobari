import React, { useState, useEffect } from "react";
import { regisOrder } from "../services/order";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { getAllOrders } from "../services/order";
import "./ordersview.css";
import { Card, Col, Row } from 'antd';



export default function SEEALLORDERS({ authenticate }) {
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

  console.log("close",order.status)


  


                  )
  

  }
  </Col>
</Row>
</div>            
                  )}  