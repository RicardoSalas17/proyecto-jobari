import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { getProduct } from "../../services/product";
import { Col, Row, Skeleton, Layout, Breadcrumb } from 'antd';
import "./product.scss";
const { Content } = Layout;

export default function SEEPRODCTDETAIL(props) {
  const [ProductData, setMPData] = useState({});
  const {id} = useParams()

  const getOneProduct = async () => {
     getProduct(id)
      .then((res) => {
          const data = res.data

         return setMPData(data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOneProduct()
  },[]);

        return(
        <Content style={{ padding: "30px 50px 0 50px " }}>
      <div className="site-layout-content">
      <Row>
      <Col span={24}>
            <h1>Producto</h1>
          </Col>
          </Row>
      <Row className="for">
        <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>

        {!ProductData.clave ?
            <Col className="formAuth" span={24}>
          <Skeleton></Skeleton>
          </Col>
          :
          <Col className="formAuth" span={24}>
        <h2>Nombre: {ProductData.name}</h2>
        <h2>Clave: {ProductData.clave}</h2>
          </Col>}
        </Row>
      </div>
    </Content>
                 )}

