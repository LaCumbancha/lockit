import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {bicycle} from 'ionicons/icons';
import './MovingRequest.css'
import {IonIcon, IonTabButton} from "@ionic/react";
import QRLockerModal from "../QR/QRLockerModal";
import Movement from "../../model/Movement";
import DataModal from "./Data/DataModal";

type BagProps = {
    movement: Movement
}

class MovingRequest extends Component<RouteComponentProps<{}> & BagProps> {
    modalQR: React.RefObject<QRLockerModal> = React.createRef();
    modalData: React.RefObject<DataModal> = React.createRef();

    _selectBagToMove() {
        // TODO. Take operation in Firebase and change states.
    }

    _showModalQR() {
        // @ts-ignore
        this.modalQR.current.showModal();
    }

    _showModalData() {
        // @ts-ignore
        this.modalData.current.showModal();
    }

    render() {
        return (
            <div className="request-info">
                <QRLockerModal show={false} ref={this.modalQR}/>
                <DataModal show={false} ref={this.modalData}/>
                <div className="request-info-main">
                    <span className="request-info-main-text">{this.props.movement.item.name}</span>
                    <span className="request-info-transport-text-2">GUARDADA</span>
                    <span className="request-info-secondary-text">{this.props.movement.lockerFrom.address}</span>
                </div>
                <div className="request-info-transport-2">
                    <div className="request-info-transport-move-to">
                        <div className="request-info-open" onClick={this._showModalData.bind(this)}>
                            <span className="request-info-open-text">MOVER</span>
                        </div>
                    </div>
                    <div className="request-info-open" onClick={this._showModalQR.bind(this)}>
                        <span className="request-info-open-text">ABRIR</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MovingRequest)
