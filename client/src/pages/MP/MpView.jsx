import React, { useState, useEffect } from "react";
import { getAllMP } from "../../services/mp";
import { useNavigate } from "react-router-dom";
import "./mp.scss";
import { Card, Col, Row, Layout, Breadcrumb, Button } from "antd";

const { Content } = Layout;


export default function SEEALLMP() {
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
<Content style={{ padding: "30px 50px 0 50px " }}>
      <div className="site-layout-content-mp">
      <div className="fondo">
        <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>
        <Row gutter={16}>
            {mpList === [] ? (
              <div>CARGANDO</div>
            ) : (
              mpList.map((mp, indx) => {
                const onClickBut=(e)=>{
                  e.preventDefault()
                  navigate(`/mp-detail/${mp._id}`)
                }
                return (
                  <Col key={indx} span={6}>
                    <Card
                  className="Cards"
                  style={{marginTop: 16 }}
                  key={indx}
                  title={mp.clave}
                    >
                    <h4>Nombre: {mp.name}</h4>
                    <Button
                    type="primary"
                    onClick= {onClickBut}
                  > Detalle de MP.</Button>
                    </Card>
                 </Col>
                );
              })
            )}
        </Row>
      </div>
    </div>
    </Content>          
                  )}  