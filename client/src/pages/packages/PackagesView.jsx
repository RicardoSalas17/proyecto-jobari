import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPackages } from "../../services/packages";
import "./packages.scss";
import { Card, Col, Row, Layout, Breadcrumb, Button } from "antd";
const { Content } = Layout;




export default function SEEALLPACKAGES() {
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
          <Content style={{ padding: "30px 50px 0 50px " }}>
          <div className="site-layout-content">
          <div className="fondo">
            <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>
            <Row gutter={16}>
                {packagesList === [] ? (
                  <div>CARGANDO</div>
                ) : (
                  packagesList.map((packagesU, indx) => {
                    const onClickBut=(e)=>{
                      e.preventDefault()
                      navigate(`/packages-detail/${packagesU._id}`)
                    }
                    return (
                      <Col key={indx} span={6}>
                        <Card
                      className="Cards"
                      style={{marginTop: 16 }}
                      key={indx}
                      title={packagesU.name}
                        >
                        <h4>Clave: {packagesU.clave}</h4>
                        <Button
                        type="primary"
                        onClick= {onClickBut}
                      > Detalle del empaque.</Button>
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