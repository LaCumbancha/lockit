import React, {Component} from 'react';
import Map from './Map';

type MapProps = {
  name?: string,
  location?:string
}

export default class LockitMap extends Component<MapProps> {

	render() {

    return (
      <Map></Map>
    );
  }

}