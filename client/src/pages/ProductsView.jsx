import React, { useState, useEffect } from "react";
import { getAllProducts } from "../services/product";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { getAllOrders } from "../services/mp";
import "./ordersview.css";
import { Card, Col, Row } from 'antd';



export default function SEEALLPRODUCTS({ authenticate }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);

  const getALLgetAllProduct = async () => {
    getAllProducts()
      .then((res) => { 
          //console.log(res.data.AllProducts[0].MP)
        setProductsList(res.data.AllProducts);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getALLgetAllProduct()
  }, []);

        return(
<div className="site-card-wrapper">
<Row gutter={16}>
  <Col span={8}>
  {productsList.map((product,indx) => 

   <Col span={30} key={indx}>                
                  <Card title={product.clave} bordered={true}>
                      <p>Nombre:{product.name}</p>
                      <p>Materia Prima:</p>
                        {!product.MP ? <p>cargndo</p>: 
                        product.MP.map((mp,idex)=>
                        <p key={idex}>{mp.claveMP}</p>
                        )
                        }
                </Card>
                <br />
                  </Col>

                )
            }
  </Col>
</Row>
</div>            
                  )}  