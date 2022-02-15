import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { getMP } from "../../services/mp";
import { Col, Row, Skeleton, Layout, Breadcrumb } from 'antd';
import "./mp.scss";
const { Content } = Layout;

export default function SEEMPDETAIL(props) {
  const [MPData, setMPData] = useState({});
  const {id} = useParams()

  const getOneMp = async () => {
     getMP(id)
      .then((res) => {
          const data = res.data
         /* console.log(data.orders)
          console.log(data.products)
          console.log(data.rutes)*/
         return setMPData(data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOneMp()
  },[]);

        return(
        <Content style={{ padding: "30px 50px 0 50px " }}>
      <div className="site-layout-content">
      <Row>
      <Col span={24}>
            <h1>Detalle de Materia Prima</h1>
          </Col>
          </Row>
      <Row className="for">
        <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>

        {!MPData.clave ?
            <Col className="formAuth" span={24}>
          <Skeleton></Skeleton>
          </Col>
          :
          <Col className="formAuth" span={24}>
        <h2>Nombre: {MPData.name}</h2>
        <h2>Clave: {MPData.clave}</h2>
          </Col>}
        </Row>
      </div>
    </Content>
                 )}

