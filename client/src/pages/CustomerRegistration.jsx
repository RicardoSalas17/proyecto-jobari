import React, { useState, useEffect } from "react";
import { regisCustumer } from "../services/custumer";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Helmet } from 'react-helmet';

export default function Custumer({ authenticate }) {

  const [form, setForm] = useState({
    custumername: "",
    direction: "",
  });
  const { custumername, direction } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    //event.preventDefault();

    const credentials = {
      custumername,
      direction,
    };
    regisCustumer(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.NEWCUSTUMER);
    });
  }


  useEffect(() => {
   initMap()
  }, []);


  function initMap() {

  const googleMapScript = document.createElement('script');
  googleMapScript.src=`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}&libraries=places&callback=initMap`;
  googleMapScript.async = true;
  window.document.body.appendChild(googleMapScript);

    const componentForm = [
      'location',
      'locality',
      'administrative_area_level_1',
      'country',
      'postal_code',
    ];

   const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: { lat: 37.4221, lng: -122.0841 },
      mapTypeControl: false,
      fullscreenControl: true,
      zoomControl: true,
      streetViewControl: true
    });
    const marker = new window.google.maps.Marker({map: map, draggable: false});
    const autocompleteInput = document.getElementById('location');
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput, {
      fields: ["address_components", "geometry", "name"],
      types: ["address"],
    });
    autocomplete.addListener('place_changed', function () {
      marker.setVisible(false);
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No details available for input: \'' + place.name + '\'');
        return;
      }
      renderAddress(place);
      fillInAddress(place);
    });
  
    function fillInAddress(place) {  // optional parameter
      const addressNameFormat = {
        'street_number': 'short_name',
        'route': 'long_name',
        'locality': 'long_name',
        'administrative_area_level_1': 'short_name',
        'country': 'long_name',
        'postal_code': 'short_name',
      };
      const getAddressComp = function (type) {
        for (const component of place.address_components) {
          if (component.types[0] === type) {
            return component[addressNameFormat[type]];
          }
        }
        return '';
      };
      document.getElementById('location').value = getAddressComp('street_number') + ' '
                + getAddressComp('route');
      for (const component of componentForm) {
        // Location field is handled separately above as it has different logic.
        if (component !== 'location') {
          document.getElementById(component).value = getAddressComp(component);
        }
      }
    }
  
    function renderAddress(place) {
      map.setCenter(place.geometry.location);
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    }
  }




  
  return (

      
    <div id="divs">
      
      <h1>Nuevo Cliente</h1>
      <form onSubmit={handleFormSubmission} className="signup__form">
        <label htmlFor="input-username">Nombre del cliente</label>
        <input
          id="input-username"
          type="text"
          name="custumername"
          placeholder="Nombre del cliente"
          value={custumername}
          onChange={handleInputChange}
          required
        />


<>
    <div className="card-container">
      <div className="panel">
        <div>
          <img className="sb-title-icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg" alt=""/>
          <span className="sb-title">Address Selection</span>
        </div>
        <input type="text" placeholder="Address" id="location"/>
        <input type="text" placeholder="Apt, Suite, etc (optional)"/>
        <input type="text" placeholder="City" id="locality"/>
        <div className="half-input-container">
          <input type="text" className="half-input" placeholder="State/Province" id="administrative_area_level_1"/>
          <input type="text" className="half-input" placeholder="Zip/Postal code" id="postal_code"/>
        </div>
        <input type="text" placeholder="Country" id="country"/>
        <button className="button-cta">Checkout</button>
      </div>
    </div>
   

      <div className="map" id="map"></div>


</>




        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}

        <button className="button__submit" type="submit">
          Submit
        </button>
      </form>
     
    </div>


  );
}
