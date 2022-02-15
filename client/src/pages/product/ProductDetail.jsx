import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import { getProduct } from "../../services/product.js";
import "./product.scss";
import { Card, Col, Row } from 'antd';


export default function SEEPRODUCTDETAIL({ authenticate }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});
  const {id} = useParams()
  
  const getPRODUCT = async () => {
    getProduct(id)
      .then((res) => {
          const data = res.data
      return setProductData(data)
      })
      .catch((err) => console.log("err",err));
  };
  useEffect(() => {
    getPRODUCT()
  }, []);

        return(
<div className="site-card-wrapper">
{!productData.name?
<div>
<h1>
cargando...
</h1>
</div> :
<div>
<p>Nombre:{productData.name}</p>
<p>Materia Prima:</p>
  {!productData.MP ? <p>cargndo</p>: 
    productData.MP.map((mp,idex)=>
  <div 
  key={idex}>
  <p>Clave:{mp.claveMP}</p>
  <p>Porcentaje:{mp.porcentaje}</p>
  <br></br>
  </div>
  )
  }
</div>
}
</div>
                  )}  