import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {alarm, bicycle, clock} from 'ionicons/icons';
import './Bag.css'
import {IonIcon, IonTabButton} from "@ionic/react";
import QRLockerModal from "../QR/QRLockerModal";
import Locker from "../../model/Locker";

import * as firebase from '../../services/firebase';
import Operation from "../../model/Operation";

type BagProps = {
    id: Number,
    name: String,
    locker: Locker,
    status: String,
    moveTo: String
}

class Bag extends Component<RouteComponentProps & BagProps> {
    modalElement: React.RefObject<QRLockerModal> = React.createRef();
    stored = this.props.status === "STORED";
    transporting = this.props.status === "MOVING";

    _selectBagToMove() {
        localStorage.operation = JSON.stringify(new Operation("MOVING_LOCKER", this.props.id, undefined, undefined, this.props.locker.id));
        let locker = this.props.locker;
        locker.taken = true;
        firebase.setLocker(locker);
    }

    _goToMap() {
        if (this.transporting) {
            this.props.history.push('/map?ib=1422');
        }
    }

    _showModal() {
        // @ts-ignore
        this.modalElement.current.showModal();
    }

    render() {
        let lockerStatus;
        console.log("Va el locker:");
        console.log(this.props.locker);

        switch (this.props.status) {
            case "REQUEST_TO_MOVE":
                lockerStatus =
                    <div className="bag-info-transport">
                        <IonIcon className="bag-icon gold" icon={alarm}/>
                        <span className="bag-info-status bag-info-waiting-text">Esperando</span>
                        <span className="bag-info-waiting-text">Lockitendero</span>
                    </div>;
                break;
            case "ACCEPTED":
                lockerStatus =
                    <div className="bag-info-transport">
                        <IonIcon className="bag-icon green" icon={bicycle}/>
                        <span className="bag-info-status bag-info-accepted-text">Lockitendero</span>
                        <span className="bag-info-accepted-text">en camino</span>
                    </div>;
                break;
            case "MOVING":
                lockerStatus =
                    <div className="bag-info-transport">
                        <IonIcon className="bag-icon red" icon={bicycle}/>
                        <span className="bag-info-status bag-info-transport-text">Transportando a:</span>
                        <span className="bag-info-transport-text">{this.props.moveTo}</span>
                    </div>;
                break;
            default:
                lockerStatus =
                    <div className="bag-info-transport-2">
                        <div className="bag-info-transport-move-to">
                            <IonTabButton class="lockers-button" href="/lockers/move"
                                          onClick={this._selectBagToMove.bind(this)}>
                                <span className="bag-info-transport-move-to-text">
                                    MOVER
                                </span>
                            </IonTabButton>
                        </div>
                        <div className="bag-info-open" onClick={this._showModal.bind(this)}>
                            <span className="bag-info-open-text">ABRIR</span>
                        </div>
                    </div>;
        }
        return (
            <div className={!this.transporting ? 'bag-info' : 'bag-info clickable'} onClick={this._goToMap.bind(this)}>
                <QRLockerModal show={false} ref={this.modalElement}/>
                <div className="bag'-info-main">
                    <span className="bag-info-main-text">{this.props.name}</span>
                    {this.stored ?
                        <div>
                            <span className="bag-info-transport-text-2">GUARDADA</span>
                            <span className="bag-info-secondary-text">{this.props.locker.address}</span>
                        </div>
                        :
                        <div/>
                    }
                </div>
                {lockerStatus}
            </div>
        )
    }
}

export default withRouter(Bag)
