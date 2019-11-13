/* global window */
import React, {Component} from 'react';
import './Map.css';

import MapGL, {Source, Layer, Marker} from 'react-map-gl';

import Pin from './Pin';
import LockerPin from './LockerPin';

import {pointOnCircle} from './utils';

const MAPBOX_TOKEN = 'pk.eyJ1IjoianVhbnphcmFnb3phZ2NiYSIsImEiOiJjanJqaG5hc2UwMGJ3M3lwODlmZTI4NjAwIn0.sTM1hm0HAjSmcg3FfSBsHA'; // Set your mapbox token here

const pointLayer = {
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

export default class Map extends Component {
  state = {
    pointData: null,
    viewport: {
      latitude: -34.603722,
      longitude: -58.381592,
      zoom: 12,
      bearing: 0,
      pitch: 0
    },
    currentLocation:{
      latitude: -34.603722,
      longitude: -58.381592
    },
    lockers: [
      {
        latitude: -34.613722,
        longitude: -58.381592
      },
      {
        latitude: -34.603722,
        longitude: -58.391592
      },
      {
        latitude: -34.593722,
        longitude: -58.391592
      },
    ]
  };

  componentDidMount() {
    this._animatePoint();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animation);
  }

  animation = null;

  _animatePoint = () => {
    this.setState({
      pointData: pointOnCircle({center: [ -58.381592, -34.603722], angle: Date.now() / 1000, radius: 0.01})
    });
    this.animation = window.requestAnimationFrame(this._animatePoint);
  };

  _onViewportChange = viewport => this.setState({viewport});

  _renderMyPositionMarker = () => {
    const {currentLocation} = this.state;
    return (
      <Marker
          longitude={currentLocation.longitude}
          latitude={currentLocation.latitude}
          offsetTop={-20}
          offsetLeft={-10}
        >
          <Pin size={20} />
      </Marker>
    );
  };

  _renderLockerMarket = (locker, index) => {
    return (
      <Marker key={`marker-${index}`} longitude={locker.longitude} latitude={locker.latitude}>
        <LockerPin size={20} onClick={() => this.setState({popupInfo: locker})} />
      </Marker>
    );
  }

  render() {
    const {viewport, 
      pointData, 
      currentLocation,
      lockers} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {pointData && (
          <Source type="geojson" data={pointData}>
            <Layer {...pointLayer} />
          </Source>
        )}
        
        {this._renderMyPositionMarker()}

        {lockers.map(this._renderLockerMarket)}

      </MapGL>
    );
  }
}
