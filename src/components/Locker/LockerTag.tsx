import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './LockerTag.css'
import {IonTabButton} from "@ionic/react";
import Operation from "../../model/Operation";
import SavedItem from "../../model/SavedItem";

type LockerProps = {
    item: SavedItem,
    lockerId: String,
    lockerName: String,
    lockerAddress: String,
    price: String
}

class LockerTag extends Component<RouteComponentProps<{}> & LockerProps> {

    _selectLockerToMove() {
        localStorage.operation = JSON.stringify(new Operation("MOVING_LOCKER", this.props.item.id, this.props.price, this.props.lockerId, this.props.item.id));
        this.props.history.push("/checkout")
    }

    render() {
        return (
            <div className='locker-info'>
                <div className="locker-info-main">
                    <span className="locker-info-main-text">{this.props.lockerName}</span>
                    <span className="locker-info-secondary-text">{this.props.lockerAddress}</span>
                </div>
                <div className="locker-info-transport">
                    <div className="locker-info-transport-move-to">
                        <IonTabButton class="lockers-button" onClick={this._selectLockerToMove.bind(this)}>
                            <span className="locker-info-transport-move-to-text">MOVER</span>
                        </IonTabButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LockerTag)
