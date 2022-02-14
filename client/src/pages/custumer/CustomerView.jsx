import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import { getAllClients } from "../../services/custumer";
import { Card, Col, Row, Layout, Breadcrumb } from "antd";
import "./custumer.scss";
const { Content } = Layout;
export default function SEEALLCUSTUMER() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [clientList, setClientList] = useState([]);

  const getAllClientsApp = async () => {
    getAllClients()
      .then((res) => {
        const custumer = res.data.Custumers;
        console.log(custumer)
        setClientList(custumer);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllClientsApp();
  }, []);

  return (
    <Content style={{ padding: "30px 50px 0 50px " }}>
      <div className="site-layout-content">
      <div className="fondo">
        <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>
        <Row gutter={16}>
            {clientList === [] ? (
              <div>CARGANDO</div>
            ) : (
              clientList.map((custumer, indx) => {
                console.log(custumer);
                return (
                  <Col span={6}>
                    <Card
                  className="Cards"
                  style={{marginTop: 16 }}
                  key={indx}
                  title={custumer.custumername}
                    >
                    <h4>Telefono: {custumer.phone}</h4>
                    <h4>E-mail: {custumer.email}</h4>
                    <Link className="event-button" exact to={`/custumer/${custumer._id}`} type="button" >Detalle de orden</Link>
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
