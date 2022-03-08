import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../services/order";
import "./orders.scss";
import { Card, Col, Row, Layout, Breadcrumb, Button } from "antd";

const { Content } = Layout;




export default function SEEALLORDERS( props) {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);

  const getALLORDERS = async () => {
    getAllOrders()
      .then((res) => {
        const order =res.data.ORDERS
       // console.log(order)
        setOrderList(order);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getALLORDERS()
  }, []);

        return(
          <Content style={{ padding: "30px 50px 0 50px " }}>
          <div className="site-layout-content-mp">
          <div className="fondo">
            <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>
            <Row gutter={16}>
            {orderList===[] ? <div>CARGANDO</div>:
orderList.map((order,indx) =>{
                    const onClickBut=(e)=>{
                      e.preventDefault()
                      navigate(`/order-detail/${order._id}`)
                    }
                    return (
                      <Col key={indx} span={6}>
                         <Card>
    <h2>{order.orderNumber}</h2>
    <h3>{order.client.custumername}</h3>
    {
    order.products.map((product, indx)=>

      product.claveProduct &&
      <div key ={indx}>
      <h4>{product.claveProduct.clave}</h4>
    </div>
    )}
    <h5>{order.status}</h5>
                        <Button
                        type="primary"
                        onClick= {onClickBut}
                      > Detalle de la orden.</Button>
                        </Card>
                     </Col>
                    );
                  })
                }
            </Row>
          </div>
        </div>
        </Content>    
                  )}  

