import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './MovingRequest.css'
import QRLockerModal from "../QR/QRLockerModal";
import Movement from "../../model/Movement";
import * as firebase from "../../services/firebase";
import SavedItemsBuilder from "../../model/SavedItemsBuilder";
import LockersBuilder from "../../model/LockersBuilder";
import Locker from "../../model/Locker";
import {Trans} from "@lingui/react";

type BagProps = {
    movement: Movement
}

class AcceptedRequest extends Component<RouteComponentProps & BagProps> {
    modalQR: React.RefObject<QRLockerModal> = React.createRef();

    _withdrawItem() {
        let movement = this.props.movement;
        movement.move();
        console.log(movement);
        firebase.setMovingRequest(movement);
        firebase.movementWithdrawnNotification(movement);


        firebase.getSavedItemsById(movement.item.id).then(items => {
            firebase.getAvailableLockers().then(rawLockers => {
                let lockers = LockersBuilder.build(rawLockers);
                SavedItemsBuilder.build(items).then(items => {
                    let item = items[0];
                    const currentLocker = lockers
                        .filter((locker: Locker) => locker.id === movement.lockerTo.id)
                        .map((locker: Locker) => locker)[0];
                    item.locker = {id: currentLocker.id};
                    item.status = "MOVING";
                    item.moveTo = currentLocker.name;
                    firebase.setSavedItem(item);

                    let freeLocker = lockers.filter((locker: Locker) => locker.id === movement.lockerFrom.id)[0];
                    freeLocker.taken = false;
                    firebase.setLocker(freeLocker);

                });
            });
        });

        // @ts-ignore
        this.modalQR.current.showModal(true);
    }

    _saveItem() {
        let movement = this.props.movement;
        movement.store();
        firebase.setMovingRequest(movement);
        firebase.movementDoneNotification(movement);


        firebase.getSavedItemsById(movement.item.id).then(items => {
                SavedItemsBuilder.build(items).then(items => {
                    let item = items[0];
                    item.locker = movement.lockerTo;
                    item.status = "STORED";
                    delete item.moveTo;
                    firebase.setSavedItem(item);

                });
            }
        );

        // @ts-ignore
        this.modalQR.current.showModal(true);
    }

    render() {
        let moving = this.props.movement.status === "MOVING";

        return (
            <div className="accepted-request-info">
                <QRLockerModal show={false} ref={this.modalQR}/>
                <div className="request-info-main">
                    <span className="request-info-main-text"><Trans id="AcceptedRequest.info">Locker en</Trans> {this.props.movement.lockerFrom.name}</span>
                    <span className="request-info-secondary-text">{this.props.movement.lockerFrom.address}</span>
                </div>
                {!moving ?
                    <div className="request-info-transport">
                        <div className="accepted-request-info-open" onClick={this._withdrawItem.bind(this)}>
                            <span className="request-info-open-text"><Trans id="AcceptedRequest.withdraw_button">RETIRAR</Trans></span>
                        </div>
                    </div>
                    :
                    <div className="request-info-transport">
                        <div className="accepted-request-info-open" onClick={this._saveItem.bind(this)}>
                            <span className="request-info-open-text"><Trans id="AcceptedRequest.store_button">GUARDAR</Trans></span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(AcceptedRequest)
