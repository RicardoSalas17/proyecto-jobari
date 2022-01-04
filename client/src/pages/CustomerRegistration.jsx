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

export function Custumer(props, { authenticate }) {

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
    const componentForm = [
      'location',
      'locality',
      'administrative_area_level_1',
      'country',
      'postal_code',
    ];

   const map = new window.google.maps.Map(document.getElementsByClassName("maps"), {
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
      <div className="containers">
      <div className="form-container">
      <form onSubmit={handleFormSubmission} className="signup__form">
<>
    <div className="card-container">
      <div className="panel">
        <input
          id="input-username"
          type="text"
          name="custumername"
          placeholder="Nombre del cliente"
          value={custumername}
          onChange={handleInputChange}
          required
        />
        <input className="signup__form" type="text" placeholder="Address" id="location"/>
        <input className="signup__form" type="text" placeholder="Apt, Suite, etc (optional)"/>
        <input className="signup__form" type="text" placeholder="City" id="locality"/>
        <div className="half-input-container">
          <input className="signup__form" type="text" className="half-input" placeholder="State/Province" id="administrative_area_level_1"/>
          <input className="signup__form" type="text" className="half-input" placeholder="Zip/Postal code" id="postal_code"/>
        </div>
        <input className="signup__form" type="text" placeholder="Country" id="country"/>
      </div>
    </div>
      <div className="map" id="map"></div>
</>
        <button className="button__submit" type="submit">
          Submit
        </button>
        {error && (
          <div className="error-block">
            <p>There was an error submiting the form:</p>
            <p>{error.message}</p>
          </div>
        )}
      </form>
      </div>
      <div className="maps-conainter">
      <Map id="maps"className="mapform" google={props.google} zoom={14} initialCenter={{
        lat: 19.478270560890298,
        lng: -99.23066874058068
      }}>
        <Marker className="markes" onClick={props.onMarkerClick}
                name={'Current location'} />
        <InfoWindow onClose={props.onInfoWindowClose}>
            <div>
              <h1>{{ lat:19.478270560890298, lng:-99.23066874058068}}</h1>
            </div>
        </InfoWindow>
      </Map>
      </div>
      </div>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_MAP_KEY)
})(Custumer)