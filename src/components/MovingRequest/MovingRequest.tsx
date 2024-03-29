import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './MovingRequest.css'
import Movement from "../../model/Movement";
import DataModal from "./Data/DataModal";
import {Trans} from "@lingui/react";

type BagProps = {
    movement: Movement
}

class MovingRequest extends Component<RouteComponentProps<{}> & BagProps> {
    modalData: React.RefObject<DataModal> = React.createRef();

    _showModalData() {
        // @ts-ignore
        this.modalData.current.showModal();
    }

    render() {
        return (
            <div className="request-info">
                <DataModal show={false} movement={this.props.movement} ref={this.modalData}/>
                <div className="request-info-main">
                    <span className="request-info-main-text"><Trans id="MovingRequest.request_info">Locker en</Trans> {this.props.movement.lockerFrom.name}</span>
                    <span className="request-info-secondary-text">{this.props.movement.lockerFrom.address}</span>
                </div>
                <div className="request-info-transport">
                    <div className="request-info-open" onClick={this._showModalData.bind(this)}>
                        <span className="request-info-open-text"><Trans id="MovingRequest.move_button">MOVER</Trans></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MovingRequest)
