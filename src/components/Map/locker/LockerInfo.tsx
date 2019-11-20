import React, {Component} from 'react';
import './LockerInfo.css'

type InfoProps = {
    lockerName:string,
    lockerAddress:string,
    hideInfo:boolean,
    lockerPrice:string
}

type State = {
    available: boolean
};


export default class LockerPin extends Component<InfoProps, State> {
    constructor({props}: { props: any }){
        super(props);
        this.state = {available: true};
    }

    render() {
        return (
          <div className={"locker-info info-main-column"} hidden={this.props.hideInfo}>
              <span className={"info-main-text"}>{this.props.lockerName}</span>
              <span className={"info-secondary-text"}>{this.props.lockerAddress}</span>
              {this.state.available ?
                  <div>
                      <div className={"info-availability-text info-available-text"}>Disponible</div>
                      <div className={"info-price-text"}>Precio: ${this.props.lockerPrice}</div>
                      <button className={"reservation-button clickable"}>Reservar</button>
                  </div>
                  :
                  <span className={"info-availability-text info-unavailable-text"}>No Disponible</span>
              }

          </div>
        );
    }
}
