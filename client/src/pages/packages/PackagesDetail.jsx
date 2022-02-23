import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { getPackage } from "../../services/packages";
import { Col, Row, Skeleton, Layout, Breadcrumb } from 'antd';
import "./packages.scss";
const { Content } = Layout;

export default function SEEPACKAGEDETAIL() {
  const [PackageData, setPackageData] = useState({});
  const {id} = useParams()

  const getOnePackage = async () => {
     getPackage(id)
      .then((res) => {
          const data = res.data
         return setPackageData(data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOnePackage()
  },[]);

        return(
        <Content style={{ padding: "30px 50px 0 50px " }}>
      <div className="site-layout-content">
      <Row>
      <Col span={24}>
            <h1>Empaque</h1>
          </Col>
          </Row>
      <Row className="for">
        <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>

        {!PackageData.clave ?
            <Col className="formAuth" span={24}>
          <Skeleton></Skeleton>
          </Col>
          :
          <Col className="formAuth" span={24}>
        <h2>Nombre: {PackageData.name}</h2>
        <h2>Clave: {PackageData.clave}</h2>
        <h2>Capacidad: {PackageData.capacity}</h2>
          </Col>}
        </Row>
      </div>
    </Content>
                 )}