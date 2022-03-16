import React, { useState, useEffect, useRef } from "react";
import { regisRoute } from "../../services/routes";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../utils/paths";

import { getAllOrders } from "../../services/order";
import {
  Select,
  DatePicker,
  Layout,
  Breadcrumb,
  Form,
  Col,
  Row,
  Input,
  Button,
} from "antd";
import { Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import { ConsoleSqlOutlined } from "@ant-design/icons/lib/icons";
import { convertLegacyProps } from "antd/lib/button/button";
const { Content } = Layout;

export function NEWROUTE(props) {
  const [form, setForm] = useState({
    locations: [
      {
        lat: 19.47822,
        lng: -99.230599,
      },
    ],
    date: "",
    clients: [0],
    orderNumbers: [0],
  });
  const { locations, date, clients, orderNumbers } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [mapDirection, setMapDirection] = useState({
    lat: 19.47822,
    lng: -99.230599,
  });

  const [orderLists, setOrderList] = useState([]);
  const obtainRoutes = async () => {
    getAllOrders()
      .then((res) => {
        // console.log(res.data.ORDERS)
        return setOrderList(res.data.ORDERS);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    obtainRoutes();
  }, [form]);

  const { Option } = Select;
  function handleFormSubmission(event) {
    const credentials = {
      locations: locations,
      date: date,
      clients: clients,
      orders: orderNumbers,
    };
    console.log("credentials---", credentials);
    /*regisRoute(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }

      navigate(PATHS.SEECALENDAR);
   });*/
  }

  const addOrder = (event) => {
    event.preventDefault();
    let oldForm = form.locations;
    oldForm.push(0);
    return setForm({ ...form, locations: oldForm });
  };
  const [routeMap, setrouteMap] = useState([]);

  const onChangeSelectOrder = (ev, indx) => {
    let oldForm = form;
    let idx = indx;
    oldForm.locations[indx++] = {
      lat: ev.target.value[0],
      lng: ev.target.value[1],
    };
    let oldArr = routeMap;
    oldArr[indx++] = {
      lat: ev.target.value[0],
      lng: ev.target.value[1],
    };
    oldForm.clients[idx] = ev.target.value[2];
    oldForm.orderNumbers[idx] = ev.target.value[3];
    setForm(oldForm);
    setrouteMap(oldArr);
  };



    //poner en  el objeto location y crear array max
  const maxCreate =()=>{
  let max = [];
    locations.map((order, indx) => {
      let dir = new props.google.maps.LatLng(order.lat, order.lng);
      return max.push({ location: dir });
    });
  return createAllLocations(max)
  }

  const [allLocations, setAllLocations] = useState([]);

  // creacion de array all locations
  const createAllLocations= (max)=>{  
    let allLocationsOne= allLocations
    max.map((dirLalLng, indx) => {
    var obj ={}
    var client=form.clients[indx]
    var location=locations[indx]
    var dirLatLng=dirLalLng
        obj["client"]=client
        obj["locations"]= location
        obj["dirLalLng"]=dirLatLng
           return allLocationsOne.push(obj)
      });
       setAllLocations(allLocationsOne)
     return distanceToJob()

    }
    // poner distncia a JOBARI para cada elemento
    const  distanceToJob= ()=>{


      const jobari = new props.google.maps.LatLng(19.47822, -99.230599);
      let allLocationsTwo= allLocations
      var service = new props.google.maps.DistanceMatrixService();
Promise.all(allLocationsTwo.map( async(location, indx) => {
          const prom = await service.getDistanceMatrix(
              {
                  origins: [jobari],
                  destinations: [location.locations],
                  travelMode: props.google.maps.TravelMode.DRIVING,
                  avoidHighways: false,
                  avoidTolls: true,
                  drivingOptions: {
                    departureTime: new Date(),
                    trafficModel: "pessimistic",
                  },
              }
              ,
                  (response,status) =>{
                if(status === "OK"){
                    let distanceStr = response.rows[0].elements[0].distance.text;
                    let distances = parseFloat(distanceStr.match(/\d+/g))
                   allLocationsTwo[indx].distanceToJob={distances}
                 
               } else {
                    alert("Error: " + status);
                }
              }
              )
              return prom
            })).then(()=>{
              setAllLocations(allLocationsTwo)
              arrCompar()
            }
            )
        }

  //se obtiene combinacines entre los puntos
  const arrCompar =()=> {
    let arrComp=[]
    allLocations.flatMap((v,i)=>{
    allLocations.slice(i+1).map((w,h)=>{ 
    return(arrComp.push([allLocations.indexOf(v),allLocations.indexOf(w)]))
  })
  })
  return mapArray(arrComp)
}

// se genera comparacion por cada elemento
const mapArray=async (arrComp)=>{

  let allLocationsThre= allLocations

  var services = new props.google.maps.DistanceMatrixService();
  Promise.all(arrComp.map(async(location) => {
    
    //compare(allLocations[location[0]],allLocations[location[1]], location,allLocations)
    if(!allLocationsThre[location[0]].distanceTo){
      allLocationsThre[location[0]].distanceTo =[]
   }
   if(!allLocationsThre[location[1]].distanceTo){
    allLocationsThre[location[1]].distanceTo =[]
   }
 
  const promi= await services.getDistanceMatrix(
       {
           origins: [allLocationsThre[location[0]].dirLalLng],
           destinations: [allLocationsThre[location[1]].dirLalLng],
           travelMode: props.google.maps.TravelMode.DRIVING,
           avoidHighways: false,
           avoidTolls: true,
           drivingOptions: {
             departureTime: new Date(),
             trafficModel: "pessimistic",
           },
       }, 
       (response, status) =>{
         if(status === "OK"){
             let distanceStr = response.rows[0].elements[0].distance.text;
             let distances = parseFloat(distanceStr.match(/\d+/g))
             let objOne ={}
             objOne[`${location[0]}`]=distances
             let objTwo ={}
             objTwo[`${location[1]}`]=distances
             allLocationsThre[location[0]].distanceTo.push(objTwo)
             allLocationsThre[location[1]].distanceTo.push(objOne)

            // console.log(allLocations)

         } else {
             alert("Error: " + status);
         }
       }
     )
   //  return(allLocationsThre)
    })).then(()=>{
      setAllLocations(allLocationsThre)
      return  compares()

    }
    )
  //  console.log()

 
 }

function compares(){
  allLocations.map((l,ind)=>{
    console.log(ind,"toJob",l.distanceToJob.distances)
    console.log(ind,"toOthers",l.distanceTo)
  })
}


 /* function showRute(event) {
    event.preventDefault();
    const map = refMap.current.map;
    let max = [];

    locations.map((order, indx) => {
      let dir = new props.google.maps.LatLng(order.lat, order.lng);
      return max.push({ location: dir });

    });
    var jobari = new props.google.maps.LatLng(19.47822, -99.230599);
    var jobariEnd = new props.google.maps.LatLng(19.47822, -99.230599);
    const directionsService = new props.google.maps.DirectionsService();
    var polylineOptionsActual = {
      strokeColor: '#BABFC4',
      strokeOpacity: .8,
      strokeWeight: 5
      };
      var pinColor = "#FFFFFF";
      var pinLabel = "A";
  
      // Pick your pin (hole allLocations[location[0]] no hole)
      var pinSVGHole = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
      var labelOriginHole = new props.google.maps.Point(12,15);
      var pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";
      var labelOriginFilled =  new props.google.maps.Point(12,9);
  

      var markerImage = {  // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
        path: pinSVGFilled,
        anchor: new props.google.maps.Point(12,17),
        fillOpacity: 1,
        fillColor: pinColor,
        strokeWeight: 2,
        strokeColor: "white",
        scale: 2,
        labelOrigin: labelOriginFilled
    };
    const directionsRenderer = new props.google.maps.DirectionsRenderer({
      //draggable: true,
      map,
      polylineOptions: polylineOptionsActual,
      marker:{icon: markerImage},
    });

    console.log("directionsService",directionsService)
    directionsRenderer.addListener("directions_changed", () => {
      const directions = directionsRenderer.getDirections();
console.log("directions",directions)
      if (directions) {
         computeTotalDistance(directions);
      }

    });


    displayRoute(jobari,jobariEnd, directionsService, directionsRenderer, max);
  //  displayRoute(first, second, directionsService, directionsRenderer, max);

  }*/

  function displayRoute(origin, destination, service, display, mad) {
    service
      .route({
        origin: origin,
        destination: destination,
        waypoints: mad,
        // [
        //    { location: "Adelaide, SA" },
        //  { location: "Broken Hill, NSW" },
        //  {location:destination}
        //  ],
        provideRouteAlternatives : true,
        travelMode: props.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        avoidTolls: true,
        drivingOptions: {
          departureTime: new Date(/* now, or future date */),
          trafficModel: "pessimistic",
        },
      })
      .then((result) => {
        console.log("res",result)
        display.setDirections(result);
      })
      .catch((e) => {
        alert("Could not display directions due to: " + e);
      });
  }

  function computeTotalDistance(result) {
    console.log("results", result)
    let total = 0;
    const myroute = result.routes[0];

    if (!myroute) {
      return;
    }
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    console.log(total);
    // document.getElementById("total").innerHTML = total + " km";
  }

  const refMap = useRef();
  function onChanges(date, dateString) {
    return setForm({ ...form, date: dateString });
  }

  return (
    <div className="containers">
      <Content style={{ padding: "30px 50px 0 50px " }}>
        <div className="site-layout-content">
          <Row>
            <Col span={24}>
              <h1>Registro de Ruta</h1>
            </Col>
          </Row>
          <Row className="for">
            <Breadcrumb style={{ margin: "6vh 0" }}></Breadcrumb>
            <Col className="formAuth" span={12}>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={handleFormSubmission}
              >
                <Form.Item
                  label="Fecha"
                  name="custumername"
                  rules={[
                    { required: true, message: "Porfavor selecciona fecha." },
                  ]}
                >
                  <DatePicker onChange={onChanges} />
                </Form.Item>
                {form.locations.map((mp, index) => {
                  return (
                    <div key={index}>
                      <Input.Group compact>
                        <label htmlFor="input-username">Orden:</label>
                        <Form.Item>
                          <Select
                            placeholder="Selecciona Orden"
                            onChange={(e) =>
                              onChangeSelectOrder(
                                { target: { name: "Direction", value: e } },
                                index
                              )
                            }
                            name="Orden"
                          >
                            {orderLists.length === 0 ? (
                              <Option>cargando</Option>
                            ) : (
                              orderLists.map((order, indx) => {
                                // console.log("order",order.client)
                                return (
                                  order.status === "Open" && (
                                    <Option
                                      key={indx}
                                      value={[
                                        order.client.cordinates.lat,
                                        order.client.cordinates.lng,
                                        order.client._id,
                                        order._id,
                                      ]}
                                    >
                                      {`${order.client.custumername},${order.orderNumber}`}
                                    </Option>
                                  )
                                );
                              })
                            )}
                          </Select>
                        </Form.Item>
                      </Input.Group>
                      <br />
                      <br />
                    </div>
                  );
                })}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={(e) => addOrder(e)}
                  >
                    Agregar orden
                  </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={(e) => maxCreate(e)}
                  >
                    Mostrar Ruta
                  </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col className="maps" span={10}>
              <div>
                <Map
                  google={props.google}
                  ref={refMap}
                  initialCenter={mapDirection}
                  zoom={10}
                >
                  <InfoWindow onClose={props.onInfoWindowClose}>
                    <div></div>
                  </InfoWindow>
                </Map>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY,
})(NEWROUTE);
