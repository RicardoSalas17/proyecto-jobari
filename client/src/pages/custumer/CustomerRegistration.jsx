import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Layout,
  Breadcrumb,
  Form,
  Col,
  Row,
  Input,
  Button,
} from "antd";
import "./custumer.scss";
import { 
  Map,
  Marker,
  GoogleApiWrapper
} from "google-maps-react";
import { regisCustumer } from "../../services/custumer";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import * as PATHS from "../../utils/paths";
const { Content } = Layout;

export function NEWCUSTMER(props) {
  const [form, setForm] = useState({
    custumername: "",
    phone: "",
    email:"",
    direction:{
      location:"",
      locality: "",
      administrative_area_level_1: "",
      country: "",
      postal_code: "",
    },
    cordinates:""
  });

  const { 
    custumername, 
    phone,
    email,
    direction,
    cordinates} = form;

  const { location,
    locality,
    administrative_area_level_1,
    country,
    postal_code} = form.direction;

  const navigate = useNavigate();

  const handleFormSubmission=()=> {
   const {user}=props

    const formRegis = {
      custumername:custumername,
      phone:phone,
      email:email,
      direction,
      cordinates,
      author:user._id
    };
    if(custumername ===""||phone===""|| email===""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Por favor, llena todos los campos"
      })
    }
    else if(!phone){
      Swal.fire({
        icon: 'error',
        title: 'Error al ingresar telefono',
        text: "Por favor, llena el campo solon con numeros y sin espacios"
      })
    }
    else if(direction ==="" &&custumername !== ""&& phone!== ""&& email!== ""){
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
          }
          
          if (res.status){
            Swal.fire({
            icon: 'success',
            title: `Se creo cliente: ${res.data.custumer.custumername}`,
            showConfirmButton: false,
            timer: 1500
    })
            navigate(`${PATHS.SEEALLPRODUCTS}/${res.data.custumer._id}`);
          }
       });
      } else if (result.isDenied) {
        Swal.fire('No se hicieron cambios', '', 'info')
      }
    })
  }
  }


  const handleInputChange =(event)=>{
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

  const initMap =()=>{
    const autocompleteInput = document.getElementById("location");
    const autocomplete = new props.google.maps.places.Autocomplete(
      autocompleteInput,
      {
        fields: ["address_components", "geometry", "name"],
        componentRestrictions:{country: "mx"},
        types: [],
      }
    );
    autocomplete.addListener("place_changed", function () {
      const place = autocomplete.getPlace();
      console.log("place", place)
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("Por favor da click en las opciones o trata con otra dirección");
        return;
      }
      renderAddress(place);
      fillInAddress(place);
      setForm({ ...form, cordinates: place.geometry.location })
    });

    const fillInAddress=(place)=>{
      const addressNameFormatos ={
        street_number: "short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        country: "long_name",
        postal_code: "short_name",
      }
      const getAddressComp = (type)=> {
        for (const component of place.address_components) {
          if (component.types[0] === type) {
            return component[addressNameFormatos[type]];
          }
        }
        return "";
      };
          const street = getAddressComp("street_number")
          const route= getAddressComp("route")
          const locality = getAddressComp("locality")
          const administrative_area_level_1 = getAddressComp("administrative_area_level_1")
          const country = getAddressComp("country")
          const postal_code = getAddressComp("postal_code")
          const formas={
            locality:`${locality}`,
            location:`${street} ${route}`,
            country:`${country}`,
            administrative_area_level_1:`${administrative_area_level_1}`,
            postal_code:`${postal_code}`,
          }
          let oldForm = form
          oldForm.direction=formas
          return setForm(oldForm);
        }
    const renderAddress=(place)=> {
      const maps = refMap.current.map;
      const lntg = place.geometry.location;
      maps.setCenter(lntg);
      renderMarker()
    }
   const renderMarker=()=>{
    const mapCenter = refMap.current.map.getCenter()
    setMapDirection(mapCenter)
    }
  }
  useEffect(() => {
    initMap();
  });
  const refMap = useRef();
  const refMark = useRef();

  return (
<Content style={{ padding: "30px 50px 0 50px " }}>
      <div className="site-layout-content">
      <Row>
      <Col span={24}>
            <h1>Registro de cliente</h1>
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
        label="Nombre del cliete"
        name="custumername"
        rules={[{ required: true, message:'Porfacor escribe el Nombre del cliete.' }]}
        >
        <Input 
          name="custumername"
          value={custumername}
          onChange={handleInputChange} />
      </Form.Item>
      <Form.Item
        label="Telefono"
        rules={[{ required: true, message:'Porfavor escribe un numero de telefono'}]}
        name="phone">
        <Input
          id="pone"
          name="phone"
          value={phone}
          onChange={handleInputChange}
          />
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
        label="Buscador de dirección"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input id="location" />
      </Form.Item>
      <Form.Item
      label="Dirección">
      <Input
      placeholder="Direction"
      value={location}
      disabled/>
    </Form.Item>
      <Form.Item
        label="Cuidad">
        <Input id="locality"
        placeholder="Ciudad"
        value={locality}
        disabled/>
      </Form.Item>
      <Form.Item label="Address">
        <Input.Group compact>
          <Form.Item
            noStyle
            >    
            <Input style={{ width: '55%' }}
            placeholder="Estado o provincia"
            id="administrative_area_level_1"
            value={administrative_area_level_1}
           disabled />
          </Form.Item>
          <Form.Item
            noStyle
            >
            <Input style={{ width: '45%' }} 
            value={postal_code}
            placeholder="Codigo Postal"
            id="postal_code"
            disabled/>
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item
      label="Cuidad">
      <Input id="country"
      placeholder="Pais"
      value={country}
      disabled/>
    </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
    </Form>
          </Col>
        <Col className="maps" span={12}>
        <div>
          <Map
            google={props.google}
            ref={refMap}
            initialCenter={mapDirection}
            zoom={14}
          >
            <Marker position={mapDirection}  name={"Current location"} ref={refMark}/>
          </Map>
        </div>
        </Col>

        </Row>
      </div>
    </Content>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY,
})(NEWCUSTMER);
