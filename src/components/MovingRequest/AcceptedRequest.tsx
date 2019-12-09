import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './MovingRequest.css'
import QRLockerModal from "../QR/QRLockerModal";
import Movement from "../../model/Movement";
import DataModal from "./Data/DataModal";
import * as firebase from "../../services/firebase";
import SavedItemsBuilder from "../../model/SavedItemsBuilder";

type BagProps = {
    movement: Movement
}

class MovingRequest extends Component<RouteComponentProps & BagProps> {
    modalQR: React.RefObject<QRLockerModal> = React.createRef();

    _withdrawItem() {
        let movement = this.props.movement;
        movement.move();
        firebase.setMovingRequest(movement);

        firebase.getSavedItemsById(movement.item.id).then(items => {
                SavedItemsBuilder.build(items).then(items => {
                    let item = items[0];
                    item.status = "MOVING";
                    firebase.setSavedItem(item)
                });
            }
        );

        // @ts-ignore
        this.modalQR.current.showModal();
    }

    _saveItem() {
        let movement = this.props.movement;
        movement.store();
        firebase.setMovingRequest(movement);

        firebase.getSavedItemsById(movement.item.id).then(items => {
                SavedItemsBuilder.build(items).then(items => {
                    let item = items[0];
                    item.status = "STORED";
                    firebase.setSavedItem(item)
                });
            }
        );

        // @ts-ignore
        this.modalQR.current.showModal();
    }

    render() {
        let moving = this.props.movement.status === "MOVING";

        return (
            <div className="request-info">
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

export default withRouter(MovingRequest)
