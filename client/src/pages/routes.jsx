import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
  render() {
    console.log(this.props)
    return (
      <Map google={this.props.google} zoom={14} initialCenter={{
        lat: 19.478270560890298,
        lng: -99.23066874058068
    }}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{{ lat:19.478270560890298, lng:-99.23066874058068}}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_MAP_KEY)
})(MapContainer)