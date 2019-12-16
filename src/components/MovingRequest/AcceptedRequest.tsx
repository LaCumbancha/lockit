import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './MovingRequest.css'
import QRLockerModal from "../QR/QRLockerModal";
import Movement from "../../model/Movement";
import * as firebase from "../../services/firebase";
import SavedItemsBuilder from "../../model/SavedItemsBuilder";
import LockersBuilder from "../../model/LockersBuilder";
import Locker from "../../model/Locker";

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
                    item.locker = {id: ""};
                    item.status = "MOVING";
                    item.moveTo = lockers
                        .filter((locker: Locker) => locker.id === movement.lockerTo.id)
                        .map((locker: Locker) => locker.name)[0];
                    firebase.setSavedItem(item);

                    let freeLocker = lockers.filter((locker: Locker) => locker.id === movement.lockerFrom.id)[0];
                    freeLocker.taken = false;
                    firebase.setLocker(freeLocker);

                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                });
            });
        });

        // @ts-ignore
        this.modalQR.current.showModal();
    }

    _saveItem() {
        let movement = this.props.movement;
        movement.store();
        firebase.setMovingRequest(movement);
        firebase.movementWithdrawnNotification(movement);


        firebase.getSavedItemsById(movement.item.id).then(items => {
                SavedItemsBuilder.build(items).then(items => {
                    let item = items[0];
                    item.locker = movement.lockerTo;
                    item.status = "STORED";
                    delete item.moveTo;
                    firebase.setSavedItem(item);

                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                });
            }
        );

        // @ts-ignore
        this.modalQR.current.showModal();
    }

    render() {
        let moving = this.props.movement.status === "MOVING";

        return (
            <div className="accepted-request-info">
                <QRLockerModal show={false} ref={this.modalQR}/>
                <div className="request-info-main">
                    <span className="request-info-main-text">Locker en {this.props.movement.lockerFrom.name}</span>
                    <span className="request-info-secondary-text">{this.props.movement.lockerFrom.address}</span>
                </div>
                {!moving ?
                    <div className="request-info-transport">
                        <div className="accepted-request-info-open" onClick={this._withdrawItem.bind(this)}>
                            <span className="request-info-open-text">RETIRAR</span>
                        </div>
                    </div>
                    :
                    <div className="request-info-transport">
                        <div className="accepted-request-info-open" onClick={this._saveItem.bind(this)}>
                            <span className="request-info-open-text">GUARDAR</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(AcceptedRequest)
