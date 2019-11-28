import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {bicycle} from 'ionicons/icons';
import './Bag.css'
import {IonButton, IonIcon, IonTabBar, IonTabButton} from "@ionic/react";
import QRLockerModal from "../QR/QRLockerModal";
import Locker from "../../model/Locker";

type BagProps = {
    name: String,
    locker: Locker,
    status: String,
    moveTo: String
}

class Bag extends Component<RouteComponentProps<{}> & BagProps> {
    modalElement: React.RefObject<QRLockerModal> = React.createRef();
    transporting = this.props.status === "MOVING";

    _goToMoveLocker() {
        this.props.history.push('/lockers/move');
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
        return (
            <div className={!this.transporting ? 'bag-info' : 'bag-info clickable'} onClick={this._goToMap.bind(this)}>
                <QRLockerModal show={false} ref={this.modalElement}/>
                <div className="bag'-info-main">
                    <span className="bag-info-main-text">{this.props.name}</span>
                    {!this.transporting ?
                        <span className="bag-info-transport-text-2">GUARDADA</span> : <div/>
                    }
                    <span className="bag-info-secondary-text">{this.props.locker.address}</span>
                </div>
                {this.transporting ?
                    <div className="bag-info-transport">
                        <IonIcon className="bag-icon" icon={bicycle}/>
                        <span className="bag-info-transport-text">Transportando a:</span>
                        <span className="bag-info-transport-text">{this.props.moveTo}</span>
                    </div>
                    : <div className="bag-info-transport-2">
                        <div className="bag-info-transport-move-to">
                            <IonButton class="lockers-button" href="/lockers/move">
                                <span className="bag-info-transport-move-to-text" onClick={this._goToMoveLocker.bind(this)}>
                                    MOVER
                                </span>
                            </IonButton>
                        </div>
                        <div className="bag-info-open" onClick={this._showModal.bind(this)}>
                            <span className="bag-info-open-text">ABRIR</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(Bag)