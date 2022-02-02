import React, { useState, useEffect, useRef } from "react";
import { regisOrder } from "../services/order";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import { getAllOrders } from "../services/order";
import { Form, Input, Select, DatePicker} from "antd";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";


export function NEWROUTE(props) {
  
  const [form, setForm] = useState({
    orderNumber: [0],
    date: "",
    dates:""
  });
  const { orderNumber, date,dates} = form;
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
    //event.preventDefault();
    console.log(form)
    const {authenticate} = props
    /*const credentials = {
      orderNumber:orderNumber,
      date:date,
      dates:dates,
    };
    console.log("credentials---", credentials);
    regisOrder(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.NEWORDER);
   });*/
  }

  function onChangeSelectPorc(event,index){

    /*
      let name =event.target.name
      let value =""
      let oldArray=form.product
      let newArray=form.product
      if(name == "claveProduct" || name ==  "package" ){
       value = event.target.value
      }
      else{
        value =parseFloat(event.target.value)
      }

    name === "claveProduct" ? newArray[index].claveProduct=value:

    name === "package" ? newArray[index].package=value:


    name === "monto" ? newArray[index].monto=value:
    
    name === "amount" ? newArray[index].amount=value:
    console.log("hola")

    console.log("newwwwsasasaaswarrarrrr",newArray)

    return setForm({ ...form,product:newArray });*/
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

const addOrder =(event)=>{
  event.preventDefault()
 let oldForm = form.orderNumber

 //console.log(form.orderNumber)
 oldForm.push(0)

 //console.log("old",oldForm)
 
 return setForm({ ...form, orderNumber: oldForm })
    
 //console.log("new",form)
}

const onChangeSelectOrder=(ev, indx)=>{
  //console.log("ev",ev.target.value)
  //console.log("indx",indx)
let oldForm = form
oldForm.orderNumber[indx]={
  lat:ev.target.value[0],
   lng:ev.target.value[1]
}
 
 setForm(oldForm)
 //console.log(form)
}

  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue['range-picker'];
    const rangeTimeValue = fieldsValue['range-time-picker'];
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
      'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
      'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      'range-time-picker': [
        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
      ],
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    };
    console.log('Received values of form: ', values);
  };


  function initMap() {
 

    const autocompleteInput = document.getElementById("location");
    const autocomplete = new props.google.maps.places.Autocomplete(
      autocompleteInput,
      {
        fields: ["address_components", "geometry", "name"],
        types: ["address"],
      }
    );

    autocomplete.addListener("place_changed", function () {
      //preventDefault();
      //marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
  
      renderAddress(place);
      fillInAddress(place);

     setForm({ ...form, direction: place.geometry.location })

    });

    function fillInAddress(place) {
      // optional parameter
      const addressNameFormat = {
        street_number: "short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        country: "long_name",
        postal_code: "short_name",
      };
      const getAddressComp = function (type) {
        for (const component of place.address_components) {
          if (component.types[0] === type) {
            return component[addressNameFormat[type]];
          }
        }
        return "";
      };
      /*document.getElementById("location").value =
        getAddressComp("street_number") + " " + getAddressComp("route");
      for (const component of componentForm) {
        // Location field is handled separately above as it has different logic.
        if (component !== "location") {
          document.getElementById(component).value = getAddressComp(component);
        }  
      }*/
    }

    function renderAddress(place) {
      const maps = refMap.current.map;
      const lntg = place.geometry.location;
      maps.setCenter(lntg);
      renderMarker()
    }
   function renderMarker(){
    const mapCenter = refMap.current.map.getCenter()
    setMapDirection(mapCenter)
    }
  }
  const [mapDirection, setMapDirection] = useState({
    lat:19.478270560890298,
     lng:-99.23066874058068

});
  useEffect(() => {
    initMap();
  }, [form]);
  const refMap = useRef();
  const refMark = useRef();

  return (
    <div>
      <h1>Nueva Ruta</h1>
      <form className="signup__form" name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
              <br />
              <br />
              <Form.Item name="date-picker" label="DatePicker" >
              <DatePicker />
            </Form.Item>
            <br />
            <br />
        {form.orderNumber.map((mp,index) =>{ 
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
                      return(
                      order.status === "open" &&
                      <Option key={indx} value={[order.client.direction.lat, order.client.direction.lng]}>
                        {order.orderNumber}
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
          Add Product
        </button>


        <div className="map-container">
        <Map
          className="maps"
          google={props.google}
          ref={refMap}
          defaultCenter={mapDirection}
          zoom={13}
        >

         
          

          
          <InfoWindow
            onClose={props.onInfoWindowClose}
          >
            <div></div>
          </InfoWindow>
        </Map>
      </div>


 {//console.log(form.orderNumber[0]!== 0)
   form.orderNumber[0]!== 0 &&
   //<h1>hola</h1>
  form.orderNumber.map((order,indx) =>{
// console.log("ord",order)
                       return(
                         <Marker position={order}  name={"Current location"} />
                       )
                   }
                   )
}


        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}
        <button className="button__submit" type="submit" onClick={(e)=>handleFormSubmission(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY,
})(NEWROUTE);