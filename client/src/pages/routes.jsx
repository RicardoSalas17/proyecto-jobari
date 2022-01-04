import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export function MapContainer (props) {

    return (
      <Map google={props.google} zoom={14} initialCenter={{
        lat: 19.478270560890298,
        lng: -99.23066874058068
    }}>
 
        <Marker onClick={props.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={props.onInfoWindowClose}>
            <div>
              <h1>{{ lat:19.478270560890298, lng:-99.23066874058068}}</h1>
            </div>
        </InfoWindow>
      </Map>
    );

}
 
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_MAP_KEY)
})(MapContainer)