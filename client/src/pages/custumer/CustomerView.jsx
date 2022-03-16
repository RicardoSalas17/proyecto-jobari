import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { getAllClients } from "../../services/custumer";
import { Card, Col, Row, Layout, Breadcrumb, Button } from "antd";
import "./custumer.scss";
const { Content } = Layout;
export default function SEEALLCUSTUMER() {
  const navigate = useNavigate();
  const [clientList, setClientList] = useState([]);

  const getAllClientsApp = async () => {
    getAllClients()
      .then((res) => {
        const custumer = res.data.Custumers;
        setClientList(custumer);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllClientsApp();
  }, []);

  return (
    <Content style={{ padding: "30px 50px 0 50px " }}>
      <div className="site-layout-contents">
      <div className="fondo">
        <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>
        <Row gutter={16}>
            {clientList === [] ? (
              <div>CARGANDO</div>
            ) : (
              clientList.map((custumer, indx) => {
                const onClickBut=(e)=>{
                  e.preventDefault()
                  navigate(`/custumer-detail/${custumer._id}`)
                }
                return (
                  <Col key={indx} span={6}>
                    <Card
                  className="Cards"
                  style={{marginTop: 16 }}
                  key={indx}
                  title={custumer.custumername}
                    >
                    <h4>Telefono: {custumer.phone}</h4>
                    <h4>E-mail: {custumer.email}</h4>
                    <Button
                    type="primary"
                    onClick= {onClickBut}
                  > Detalle del cliente.</Button>
                    </Card>
                 </Col>
                );
              })
            )}
        </Row>
      </div>
    </div>
    </Content>
  );
}
