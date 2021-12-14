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
        setOrderList(res.data.ORDERS);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getALLORDERS()
  }, []);

        return(
<div className="site-card-wrapper">
    <h2>Activas:</h2>
<Row gutter={16}>
  <Col span={8}>
  {orderList.map((order,indx) => 
  order.status==="open"?
   <Col span={30} key={indx}>                
                  <Card title={order.orderNumber} bordered={true}>
                      <p>Cliente:{order.client}</p>
                Productos:
                {order.product.map((product,indx) =>  

                   <p key={indx}>{product.claveProduct}</p>
                )
                }                
                </Card>
                <br />
                  </Col>
                  :
                  <h2>Vacio</h2>
                )
            }
  </Col>
</Row>

<h2>Terminadas:</h2>
<Row gutter={16}>
  <Col span={8}>
  {orderList.map((order,indx) => 
  order.status==="close"?
   <Col span={30} key={indx}>                
                  <Card title={order.orderNumber} bordered={true}>
                      <p>Cliente:{order.client}</p>
                      <p>Status: {order.status}</p>
                Productos:
                {order.product.map((product,indx) =>  

                   <p key={indx}>{product.claveProduct}</p>
                )
                }                
                </Card>
                <br />
                  </Col>
                  :
                  <h2>Vacio</h2>
                )
            }
  </Col>
</Row>
</div>            
                  )}  