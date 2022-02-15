import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { getCustumer } from "../../services/custumer";
import { Col, Row, Skeleton, Layout, Breadcrumb} from 'antd';
import "./custumer.scss";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const { Content } = Layout;

export function SEECUSTUMERDETAIL(props) {
  const [CustumerData, setCustumerData] = useState({});
  const {id} = useParams()
  const getOneCustumer = async () => {
     getCustumer(id)
      .then((res) => {
          const data = res.data
         return setCustumerData(data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOneCustumer()
  }, []);

  const refMap = useRef();
  const refMark = useRef();

        return(
        <Content style={{ padding: "30px 50px 0 50px " }}>
      <div className="site-layout-content">
      <Row>
      <Col span={24}>
            <h1>Detalle de Cliente</h1>
          </Col>
          </Row>
      <Row className="for">
        <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>

        {!CustumerData.cordinates ?
            <Col className="formAuth" span={12}>
          <Skeleton></Skeleton>
          </Col>
          :
          <Col className="formAuth" span={12}>

        <h2>Nombre: {CustumerData.custumername}</h2>
        <h2>Telefono: {CustumerData.phone}</h2>
        <h2>E-mail: {CustumerData.email}</h2>
        
          </Col>}
          {!CustumerData.cordinates ?
            <Col className="maps" span={12}>
          <Skeleton></Skeleton>
          </Col>
          :
        <Col className="maps" span={12}>
        <div>
        <Map
        className="maps"
        google={props.google}
        ref={refMap}
        initialCenter={CustumerData.cordinates}
        zoom={18}
      >
      <Marker position={CustumerData.cordinates}  name={"Current location"} ref={refMark}/>
      </Map>
        </div>
        </Col>
    }
        </Row>
      </div>
    </Content>
                 )}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY,
})(SEECUSTUMERDETAIL);