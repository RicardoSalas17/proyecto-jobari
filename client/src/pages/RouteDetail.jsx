import React, { useState, useEffect } from "react";
import { regisOrder } from "../services/order";
import { useNavigate, Link, useParams } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { getOrder } from "../services/order";
import "./ordersview.css";
import { Card, Col, Row } from 'antd';


export default function SEEORDERDETAIL({ authenticate }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({});
  const { id} = useParams()
  
  const getALLORDERS = async () => {
     // console.log("soy el id",id)
    //  const { id } = props.match.params
   getOrder(id)
      .then((res) => {
          const data = res.data
        return setOrderData(data)
     //  console.log("data",data)
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getALLORDERS()
    //console.log("data",orderData)
  }, []);

        return(
<div className="site-card-wrapper">

{console.log("orderssss",orderData)}

{!orderData.client?
<div>cargando...</div> :
<div>
<h2>{orderData.orderNumber}</h2>
<h3>{orderData.client.custumername}</h3>
{orderData.product.map((product, indx)=>
<div key ={indx}>
  <h4>{product.claveProduct}</h4>
</div>
)}
<h5>{orderData.status}</h5>
</div>
}
</div>
                  )}  