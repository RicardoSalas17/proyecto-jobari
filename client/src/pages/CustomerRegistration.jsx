import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { Form, Input,InputNumber, Button, Checkbox } from 'antd';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { regisCustumer } from "../services/custumer";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";

export function MapContainer(props) {
  const [form, setForm] = useState({
    custumername: "",
    phone: "",
    email:"",
    direction:""

  });
  const { custumername, phone,email,direction} = form;
  var componentForm = [
    "location",
    "locality",
    "administrative_area_level_1",
    "country",
    "postal_code",
  ];

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  function handleFormSubmission(event) {
   event.preventDefault()
   // console.log(event)
   // const {authenticate} = props
    //console.log(authenticate)
    const formRegis = {
      custumername:custumername,
      phone:phone,
      email:email,
      direction,direction
    };
    //console.log("credentials---", credentials);

    if(custumername ===""||phone===""|| email===""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Por favor, llena todos los campos"
      })
    }
    else if(direction ==="" &&custumername != ""&& phone!= ""&& email!= ""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Asegurate de que en el map se muestre el marcador en el mapa llenando solo el campo direccion"
      })
    }
else{
    Swal.fire({
      title: `Se creara un cliente con nombre : ${custumername}, Quieres continuar?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        regisCustumer(formRegis).then((res) => {
          if (!res.status) {
          console.log("resss",res)
            res.errstatus === 400 &&
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${res.errorMessage}`,
            })
            res.errstatus === 500 &&
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Algo esta mal`
            })
          //  return setError({ message: "Invalid credentials" });
          }
          
          if (res.status){
            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Se creo cliente: ${res.data.custumer.custumername}`,
            showConfirmButton: false,
            timer: 1500
    })
            navigate(PATHS.SEEALLPRODUCTS);
          }
       });
      } else if (result.isDenied) {
        Swal.fire('No se hicieron cambios', '', 'info')
      }
    })
  }
  }

  function handleInputChange(event) {
 //console.log(form)
  //console.log(event)
  //console.log("target",event.target)
  const { name, value } = event.target;
  if (name === "phone"){
   let valuesNumber = Number(value)
  return setForm({ ...form, [name]: valuesNumber});  
  }
  else{
  return setForm({ ...form, [name]: value });
  }
  }

  const [mapDirection, setMapDirection] = useState({
    lat:19.47822,
    lng:-99.230599
  });

  useEffect(() => {
    initMap();
  }, [form]);
  const refMap = useRef();
  const refMark = useRef();


  const [addressNameFormat, setAddressNameFormat] = useState({
    location:"",
    locality: "long_name",
    administrative_area_level_1: "short_name",
    country: "long_name",
    postal_code: "short_name",
  }
);
const { street_number, route,locality,administrative_area_level_1,country,postal_code} = addressNameFormat;

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

//console.log("places",place.address_components)


      
      const addressNameFormatos ={
        street_number: "short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        country: "long_name",
        postal_code: "short_name",
      }
      const getAddressComp = function (type) {
        for (const component of place.address_components) {
          if (component.types[0] === type) {
            return component[addressNameFormatos[type]];
          }
        }
        return "";
      };
      document.getElementById("location").value =
        getAddressComp("street_number") + " " + getAddressComp("route");

          const street = getAddressComp("street_number")
          //console.log("st",street)
          const route= getAddressComp("route")
const formas={
    location:`${street} ${route}`,
    locality: getAddressComp("locality"),
    administrative_area_level_1: getAddressComp("administrative_area_level_1"),
    country:getAddressComp("country"),
    postal_code: getAddressComp("postal_code"),
  }
  return setAddressNameFormat(formas);
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
  

    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

  return (

    <div className="noup">
      <div className="containers">
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >


      <Form.Item
        label="Nombre del cliete"
        name="username"
        rules={[{ required: true, message:'Porfacor escribe el Nombre del cliete.' }]}
        >
        <Input 
          name="username"
          value={custumername}
          onChange={handleInputChange} />
      </Form.Item>


      <Form.Item
        label="Telefono"
        rules={[{ required: true, message:'Porfavor escribe un numero de telefono'}]}
        name="phone">
        <Input
          name="phone"
          value={custumername}
          onChange={handleInputChange} />
      </Form.Item>


      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input 
                  name="email"
                  value={email}
                  onChange={handleInputChange}/>
      </Form.Item>

      <Form.Item
        label="Dirección"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input id="location" />
      </Form.Item>



      <Form.Item
        label="Cidad">
        <Input id="locality"
        value={locality}
        disabled/>
      </Form.Item>





      <Form.Item label="Address">
        <Input.Group compact>
          <Form.Item
            name={['address', 'province']}
            noStyle
            rules={[{ required: true, message: 'Province is required' }]}
          >    
           <Input style={{ width: '50%' }} placeholder="Estado o provincia" disable />
          </Form.Item>


          <Form.Item
            name={['address', 'street']}
            noStyle
            rules={[{ required: true, message: 'Street is required' }]}
          >
            <Input style={{ width: '50%' }} placeholder="Codigo Postal" />
          </Form.Item>
        </Input.Group>
      </Form.Item>








      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>











<div>

            <div className="half-input-container">
              <input
                type="text"
                className="half-input"
                placeholder="Estado o provincia"
                id="administrative_area_level_1"
              />
          <br />              
              <input
                type="text"
                className="half-input"
                placeholder="C.P."
                id="postal_code"
              />
            </div>
          <br />
            <input type="text" placeholder="Pais" id="country" />
          <br />

        <button className="button__submit" type="submit" onClick={(e)=>handleFormSubmission(e)}>
          Submit
        </button>
          </div>

        <div className="map-container">
          <Map
            className="maps"
            google={props.google}
            ref={refMap}
            defaultCenter={mapDirection}
            zoom={14}
          >
            <Marker position={mapDirection}  name={"Current location"} ref={refMark}/>
            <InfoWindow
              onClose={props.onInfoWindowClose}
            >
              <div></div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY,
})(MapContainer);
