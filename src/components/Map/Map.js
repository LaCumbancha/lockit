/* global window */
import React, {Component} from 'react';
import './Map.css';

import MapGL, {Source, Layer, Marker} from 'react-map-gl';

import Pin from './Pin';
import LockerPin from './locker/LockerPin';

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
        longitude: -58.381592,
        name: "Locker 1",
        address: "calle falsa 123"
      },
      {
        latitude: -34.603722,
        longitude: -58.391592,
        name: "Locker 2",
        address: "calle falsa"
      },
      {
        latitude: -34.593722,
        longitude: -58.391592,
        name: "Locker 3",
        address: "calle 123"
      },
    ]
  };

  componentDidMounts() {
    this._animatePoint();
    const map = this.reactMap.getMap();

    map.on('style.load', () => {
      //add the GeoJSON layer here
      map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [-58.381592, -34.613722],
              [-58.391592,-34.603722],
              [-58.391592,-34.593722],
            ]
          }
        }},
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#f3601a",
          "line-width": 4
        }
      })
    })
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animation);
  }

  animation = null;
  reactMap = null;

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
        <LockerPin size={20} lockerName={locker.name} lockerAddress={locker.address}/>
      </Marker>
    );
  }

  render() {
    const {viewport, 
      pointData, 
      lockers} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        ref={(reactMap) => this.reactMap = reactMap}
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
