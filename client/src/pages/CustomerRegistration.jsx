import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { regisCustumer } from "../services/custumer";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
//import * as USER_HELPERS from "../utils/userToken";

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
  //  event.preventDefault()
    const {authenticate} = props
    const credentials = {
      custumername:custumername,
      phone:phone,
      email:email,
      direction,direction
    };
    //console.log("credentials---", credentials);
    regisCustumer(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }    
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
      setForm ({
        custumername: "",
        phone: "",
        email:"",
        direction:""})
   });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
return   setForm({ ...form, [name]: value });
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
      document.getElementById("location").value =
        getAddressComp("street_number") + " " + getAddressComp("route");
      for (const component of componentForm) {
        // Location field is handled separately above as it has different logic.
        if (component !== "location") {
          document.getElementById(component).value = getAddressComp(component);
        }  
      }
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

  return (
    <div className="noup">
      <div className="containers">

          <div className="panel">
            <input
          id="input-username"
          type="string"
          name="custumername"
          placeholder="Nombre del cliete"
          value={custumername}
          onChange={handleInputChange}
          required/>
          <br />
              <input
          id="input-username"
          type="tel"
          name="phone"
          placeholder="Telefono"
          value={phone}
          onChange={handleInputChange}
          required/>
          <br />
              <input
          id="input-username"
          type="mail"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={handleInputChange}
          required/>
          <br />
            <input type="text"
             placeholder="Dirección" 
             id="location" />
          <br />
            <input type="text" 
            placeholder="(opcional)" 
            />
          <br />
            <input type="text"
            placeholder="Cidad"
            id="locality" />
          <br />
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
            <button className="button-cta"
            onClick={(e)=>handleFormSubmission(e)}>
              Checkout
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
