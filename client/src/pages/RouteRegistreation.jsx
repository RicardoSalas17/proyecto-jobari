import React, { useState, useEffect, useRef } from "react";
import { regisRoute } from "../services/routes";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { getAllOrders } from "../services/order";
import { Form, Input, Select, DatePicker} from "antd";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";


export function NEWROUTE(props) {
  const [form, setForm] = useState({
    locations: [{
      lat:19.47822,
      lng:-99.230599
    }],
    date: "",
    clients:[0],
    orderNumbers:[0]
  });
  const { locations, date, clients, orderNumbers} = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        event.preventDefault()
    const {authenticate} = props
    const credentials = {
      locations:locations,
      date:date,
      clients:clients,
      orders:orderNumbers
    };
   // console.log("credentials---", credentials);
  regisRoute(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.SEECALENDAR);
   });
  }


const addOrder =(event)=>{
  event.preventDefault()
 let oldForm = form.locations
 oldForm.push(0)
 return setForm({ ...form, locations: oldForm })
}
const [routeMap, setrouteMap] = useState([{
  lat:19.47822,
  lng:-99.230599
}]);

const onChangeSelectOrder=(ev, indx)=>{
let oldForm = form
let idx = indx
oldForm.locations[ indx++]={
  lat:ev.target.value[0],
   lng:ev.target.value[1]
}
 let oldArr =routeMap
 oldArr[indx++]={
  lat:ev.target.value[0],
   lng:ev.target.value[1]
}
oldForm.clients[idx] = ev.target.value[2]
oldForm.orderNumbers[idx]= ev.target.value[3]
//console.log("clients",oldForm.clients)
setForm(oldForm)
setrouteMap(oldArr)
}


function showRute(event){
  event.preventDefault()
  const map =  refMap.current.map;
  let max =[]
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
      // [
        //    { location: "Adelaide, SA" },
          //  { location: "Broken Hill, NSW" },
       //  {location:destination}
        //  ],
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

  const [mapDirection, setMapDirection] = useState({
    lat:19.47822,
    lng:-99.230599
  });


  const refMap = useRef();
  function onChanges(date, dateString) {
    return setForm({ ...form, date: dateString})
  }

  return (
    <div className="containers">
      <h1>Nueva Ruta</h1>
      <form className="signup__form" name="time_related_controls" >
              <br />
              <br />
              <DatePicker onChange={onChanges} />
            <br />
            <br />
        {form.locations.map((mp,index) =>{ 
        return(
          <div key={index}>
            <Input.Group compact>
           <label htmlFor="input-username">Orden:</label> 
              <Form.Item
                noStyle
                
              >
                <Select
                  placeholder="Selecciona Orden"
                  onChange={(e)=>onChangeSelectOrder({"target":{"name":"Direction","value":e}},index)}
                  name="Orden"
                >
                  {
                    orderLists.map((order,indx) =>{
                     // console.log("order",order)
                      return(
                      order.status === "open" &&
                      <Option key={indx} value={[order.client.direction.lat, order.client.direction.lng,order.client._id, order._id]}>
                        {order.client.custumername}
                      </Option>
                      )
                  }
                  )}
                </Select>
              </Form.Item>
            </Input.Group>
                <br />
              <br />
          </div>
        )})}
              <br />
              <br />
        <button type="danger" onClick={(e)=>addOrder(e)}>
          Agregar orden
        </button>


        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}
        <button className="button__submit" type="submit" onClick={(e)=>handleFormSubmission(e)}>
          Submit
        </button>
        <button className="button__submit" type="submit" onClick={(e)=>showRute(e)}>
          Mostrar Ruta
        </button>
      </form>

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
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY,
})(NEWROUTE);