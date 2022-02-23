import React, { useState, useEffect } from "react";
import { getAllMP } from "../services/mp";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { getAllPackages } from "../services/packages";

import { Card, Col, Row } from 'antd';



export default function SEEALLPACKAGES({ authenticate }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [packagesList, setPackagesList] = useState([]);

  const getALLPACKAGES = async () => {
    getAllPackages()
      .then((res) => {
        setPackagesList(res.data.Packages);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getALLPACKAGES()
  }, []);

        return(
<div className="site-card-wrapper">
<Row gutter={16}>
  <Col span={8}>
  {packagesList.map((pack,indx) => 
   <Col span={30} key={indx}>                
                  <Card title={pack.clave} bordered={true}>
                      <p>Nombre:{pack.name}</p>               
                </Card>
                <br />
                  </Col>

                )
            }
  </Col>
</Row>
</div>            
                  )}  