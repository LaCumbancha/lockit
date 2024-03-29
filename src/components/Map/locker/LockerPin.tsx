import React, {Component} from 'react';
import LockerInfo from "./LockerInfo";
import * as path from "path";

const ICON = `M376 192h-24v-46.7c0-52.7-42-96.5-94.7-97.3-53.4-.7-97.3 42.8-97.3 96v48h-24c-22 0-40 18-40 40v192c0 22 
18 40 40 40h240c22 0 40-18 40-40V232c0-22-18-40-40-40zM270 316.8v68.8c0 7.5-5.8 14-13.3 14.4-8 
.4-14.7-6-14.7-14v-69.2c-11.5-5.6-19.1-17.8-17.9-31.7 1.4-15.5 14.1-27.9 29.6-29 18.7-1.3 34.3 13.5 34.3 31.9 0 
12.7-7.3 23.6-18 28.8zM324 192H188v-48c0-18.1 7.1-35.1 20-48s29.9-20 48-20 35.1 7.1 48 20 20 29.9 20 48v48z`;

const pinStyle = {
  fill: '#000cff',
  stroke: 'none'
};

const pinStyleTaken = {
  fill: '#000cff',
  stroke: 'none'
};

type PinProps = {
    id: string,
    size?: number,
    lockerName:string,
    lockerAddress:string,
    lockerPrice: string,
    onRequestBooking?:Function,
    taken: boolean,
    defaultValue: boolean
}

type State = {
    hideInfo: boolean
};


export default class LockerPin extends Component<PinProps, State> {
    constructor({props}: { props: any }){
        super(props);
        this.state = {hideInfo: true};
        this.changeInfoState = this.changeInfoState.bind(this);
    }

    changeInfoState() {
        this.setState(state => ({
            hideInfo: !state.hideInfo
        }));
    }

    onRequestBooking(info: any){
        if(this.props.onRequestBooking){
            this.props.onRequestBooking(info);
        }
        this.changeInfoState();
    }


  render() {
    const size = this.props.size;
    return (
        <div>
            <svg height={size} style={this.props.taken? pinStyleTaken:pinStyle}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={()=> this.changeInfoState() }>
                <path d={ICON}/>
            </svg>
            <LockerInfo id={this.props.id} lockerName={this.props.lockerName}
                        lockerAddress={this.props.lockerAddress} lockerPrice={this.props.lockerPrice}
                        hideInfo={this.state.hideInfo} onRequestBooking={this.onRequestBooking.bind(this)}
                        defaultValue={this.props.defaultValue}
            />
        </div>
    );
  }
}

