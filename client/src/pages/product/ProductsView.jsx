import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../services/product";
import { useNavigate } from "react-router-dom";
import "./product.scss";
import { Card, Col, Row, Layout, Breadcrumb, Button } from "antd";

const { Content } = Layout;

export default function SEEALLPRODUCTS() {
  const navigate = useNavigate();
  const [producList, setProductList] = useState([]);

  const getALLProducts = async () => {
    getAllProducts()
      .then((res) => {
        setProductList(res.data.AllProducts);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getALLProducts();
  }, []);

  return (
    <Content style={{ padding: "30px 50px 0 50px " }}>
      <div className="site-layout-content-mp">
        <div className="fondo">
          <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>
          <Row gutter={16}>
            {producList === [] ? (
              <div>CARGANDO</div>
            ) : (
              producList.map((product, indx) => {
                const onClickBut = (e) => {
                  e.preventDefault();
                  navigate(`/product-detail/${product._id}`);
                };
                return (
                  <Col key={indx} span={6}>
                    <Card
                      className="Cards"
                      style={{ marginTop: 16 }}
                      key={indx}
                      title={product.clave}
                    >
                      <h4>Nombre: {product.name}</h4>
                      <Button type="primary" onClick={onClickBut}>
                        {" "}
                        Detalle del producto.
                      </Button>
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
