import React, { useState, useEffect } from "react";
import { getAllMP } from "../services/mp";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { getAllOrders } from "../services/mp";
import "./ordersview.css";
import { Card, Col, Row } from 'antd';



export default function SEEALLMP({ authenticate }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [mpList, setMPList] = useState([]);

  const getALLMP = async () => {
    getAllMP()
      .then((res) => {
        setMPList(res.data.MP);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getALLMP()
  }, []);

        return(
<div className="site-card-wrapper">
<Row gutter={16}>
  <Col span={8}>
  {mpList.map((mp,indx) => 

   <Col span={30} key={indx}>                
                  <Card title={mp.clave} bordered={true}>
                      <p>Nombre:{mp.name}</p>               
                </Card>
                <br />
                  </Col>

                )
            }
  </Col>
</Row>
</div>            
                  )}  