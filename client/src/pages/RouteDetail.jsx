import React, { useState, useEffect, useRef } from "react";
import { regisOrder } from "../services/order";
import { useNavigate, Link, useParams } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { getRoute } from "../services/routes";

import { Card, Col, Row, Skeleton } from 'antd';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export function SEEORDERDETAIL(props) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [routeData, setRouteData] = useState({});
  const {id} = useParams()
  const [loading, setLoading] = useState(false);
  
  const getOneRoute = async () => {
     getRoute(id)
      .then((res) => {
          const data = res.data
         return setRouteData(data)
      })
      .catch((err) => console.log(err));
  };
  const trueLoading =()=>{
    routeData.locations && showRute()
 }

 useEffect(() => {
    trueLoading()
  }, [routeData]);

  useEffect(() => {
    getOneRoute()
  }, []);


  const [mapDirection, setMapDirection] = useState({
    lat:19.47822,
    lng:-99.230599
  });

  const refMap = useRef();


  function showRute(){
   // event.preventDefault()
    const map =  refMap.current.map;
    let max =[]
    const locations = routeData.locations
    locations.map((order,indx) =>{
    let dir = new props.google.maps.LatLng(order.lat,order.lng)
    return(
      max.push({location:dir})
    )
  }
  )
    var first = new props.google.maps.LatLng(19.47822, -99.230599);
    var second = new props.google.maps.LatLng(19.29976169999999,-99.1136997);
    //console.log("firt",first)
    const directionsService = new props.google.maps.DirectionsService();
    const directionsRenderer = new props.google.maps.DirectionsRenderer({
      //draggable: true,
      map,
     // panel: document.getElementById("panel"),
    });
  
    directionsRenderer.addListener("directions_changed", () => {
      const directions = directionsRenderer.getDirections();
  
      if (directions) {
        computeTotalDistance(directions);
      }
    });
    displayRoute(
      first,
      second,
      directionsService,
      directionsRenderer,
      max
    );

  }
  
  function displayRoute(origin, destination, service, display,mad) {
    service
      .route({
        origin: origin,
        destination: origin,
        waypoints:mad,
        travelMode: props.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        avoidTolls: true,
        drivingOptions: {
          departureTime: new Date(/* now, or future date */),
          trafficModel: 'pessimistic'
        },
      })
      .then((result) => {
        display.setDirections(result);
      })
      .catch((e) => {
        alert("Could not display directions due to: " + e);
      });
  }
  
  function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];
  
    if (!myroute) {
      return;
    }
  
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
  
    total = total / 1000;
    console.log(total)
   // document.getElementById("total").innerHTML = total + " km";
  }


        return(
<div className="site-card-wrapper" >
{console.table("route",routeData)}
<Row gutter={16}>
{   
    !routeData.clients &&
    <Col span={8}> 
    <Card
    style={{ width: 300, marginTop: 16 }}
    >
    <Skeleton loading={loading} avatar active>
    </Skeleton>
  </Card>
    </Col>
}
{routeData.clients &&
          routeData.clients.map((item, indx)=> {
//console.log("item", item)
return(  <Col span={8}>       
        <Card key ={indx}
          style={{ width: 300, marginTop: 16 }} >
                  <Skeleton loading={loading} avatar active>
                  <h2>Cliente : {item.custumername}</h2>
                  <br />
                  <h3>Numero de orden : {routeData.orders[indx].orderNumber}</h3>
                  <br />
                            <ul className="events">
                                Productos:
            {routeData.orders[indx].product.map((item, indx) => {
             console.log("sasa",item)
              return(
              <li key={indx}>
                <h4>{item.claveProduct} : {item.amount} Kg</h4>
              </li>
            )
            })}
          </ul>
                </Skeleton>
              </Card>
              </Col>
          )
          })
}


<div className="map-container">
        <Map
          className="maps"
          google={props.google}
          ref={refMap}
          center={mapDirection}
          defaultCenter={mapDirection}
          zoom={3}
        >
          <InfoWindow
            onClose={props.onInfoWindowClose}
          >
            <div></div>
          </InfoWindow>
        </Map>
      </div>
</Row>

</div>
                  )}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY,
})(SEEORDERDETAIL);