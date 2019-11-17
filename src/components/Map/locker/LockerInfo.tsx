import React, {Component} from 'react';
import './LockerInfo.css'

type InfoProps = {
  lockerName:string,
  lockerAddress:string,
    showInfo:boolean
}



export default class LockerPin extends Component<InfoProps> {
  render() {

    return (
      <div className={"locker-info"} hidden={this.props.showInfo}>
        <span>{this.props.lockerName}</span>
        <span>{this.props.lockerAddress}</span>
      </div>
    );
  }
}
