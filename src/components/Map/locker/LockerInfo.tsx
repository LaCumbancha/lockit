import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './LockerInfo.css'
import * as firebase from "../../../services/firebase";
import SavedItem from "../../../model/SavedItem";
import SavedItemsBuilder from "../../../model/SavedItemsBuilder";
import Operation from "../../../model/Operation";
import {Trans} from "@lingui/react";

type InfoProps = {
    id: string,
    lockerName:string,
    lockerAddress:string,
    hideInfo:boolean,
    lockerPrice:string,
    onRequestBooking?:Function,
    defaultValue: boolean
}

type State = {
    available: boolean,
    savedItems: SavedItem[]
};


class LockerPin extends Component<RouteComponentProps & InfoProps, State> {
    constructor({props}: { props: any }){
        super(props);
        this.state = {available: true, savedItems: []};
    }

    componentDidMount() {
        firebase.getAllSavedItems().then(
            res => {
                SavedItemsBuilder.build(res).then(items => {
                    this.setState({
                        savedItems: items
                    });
                })
            },
            err => console.log(err));
    }

    onRequestBooking(event: any){
        if(this.props.onRequestBooking){
            this.props.onRequestBooking({
                lockerId: this.props.id,
                lockerName: this.props.lockerName,
                lockerAddress: this.props.lockerAddress,
                lockerPrice: this.props.lockerPrice
            })
        }
    }

    onRequestMoving(item: any, event: any){
        localStorage.operation = JSON.stringify(new Operation("MOVING_LOCKER", item.id, undefined, undefined, this.props.id));
        let locker = item.locker;
        locker.taken = true;
        firebase.setLocker(locker);
        this.props.history.push('lockers/move')
    }

    renderContent(){
        for (let i = 0; i < this.state.savedItems.length; i++) {
            const item = this.state.savedItems[i];

            //si el value es default es porque este locker no tiene nada guardado
            if(this.props.defaultValue){
                return (
                    <div>
                        <div className={"info-availability-text info-available-text"}>
                            <Trans id="LockerInfo.available">Disponible</Trans>
                        </div>
                        <div className={"info-price-text"}>
                            <Trans id="LockerInfo.price">Precio:</Trans> ${this.props.lockerPrice}
                        </div>
                        <button className={"reservation-button clickable"} onClick={this.onRequestBooking.bind(this)}>
                            <Trans id="LockerInfo.book">Reservar</Trans>
                        </button>
                    </div>
                )
            }

            switch (item.status) {
                case "STORED":
                    if(item.locker.id === this.props.id){
                        return (
                            <div>
                                <div className={"info-availability-text info-available-text"}>
                                    <Trans id="LockerInfo.available">Disponible</Trans>
                                </div>
                                <div className={"info-price-text"}>
                                    <Trans id="LockerInfo.price">Precio:</Trans> ${this.props.lockerPrice}
                                </div>
                                <button className={"reservation-button clickable"} onClick={this.onRequestMoving.bind(this,item)}>
                                    <Trans id="LockerInfo.move">Mover</Trans>
                                </button>
                            </div>
                        )
                    }
                    break;
                case "REQUEST_TO_MOVE":
                    if(item.locker.id === this.props.id) {
                        return (
                            <>
                                <span className={"info-availability-text info-unavailable-text"}>
                                    <Trans id="LockerInfo.searching">Buscando</Trans>
                                </span>
                                <span className={"info-availability-text info-unavailable-text"}>
                                    <Trans id="Bag.worker_fantasy_name">Lockitendero</Trans>
                                </span>
                            </>
                        )
                    }
                    break;
                case "ACCEPTED":
                    if(item.locker.id === this.props.id) {
                        return (
                            <>
                                <span className={"info-availability-text info-unavailable-text"}>
                                    <Trans id="Bag.worker_fantasy_name">Lockitendero</Trans>
                                </span>
                                <span className={"info-availability-text info-unavailable-text"}>
                                    <Trans id="LockerInfo.en_route">en camino</Trans>
                                </span>
                            </>
                        )
                    }
                    break;
                case "MOVING":
                default:
                    return (
                        <div>
                            <div className={"info-availability-text info-available-text"}>
                                <Trans id="LockerInfo.available">Disponible</Trans>
                            </div>
                            <div className={"info-price-text"}>
                                <Trans id="LockerInfo.price">Precio:</Trans> ${this.props.lockerPrice}
                            </div>
                            <button className={"reservation-button clickable"} onClick={this.onRequestBooking.bind(this)}>
                                <Trans id="LockerInfo.book">Reservar</Trans>
                            </button>
                        </div>
                    )
            }
        }
    }

    render() {
        return (
          <div className={"locker-info2 info-main-column"} hidden={this.props.hideInfo}>
              <span className={"info-main-text"}>{this.props.lockerName}</span>
              <span className={"info-secondary-text"}>{this.props.lockerAddress}</span>
              {this.renderContent()}
          </div>
        );
    }
}

// @ts-ignore
export default withRouter(LockerPin);
