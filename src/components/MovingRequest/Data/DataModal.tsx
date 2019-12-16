import React, {Component} from "react";

import * as firebase from '../../../services/firebase';

import './DataModal.css'
import Movement from "../../../model/Movement";
import SavedItemsBuilder from "../../../model/SavedItemsBuilder";
import {Trans} from "@lingui/react";

type ModalProps = {
    show: Boolean
    movement: Movement
};

type State = {
    show: Boolean
};

export default class DataModal extends Component<ModalProps, State> {

    constructor({props}: { props: any }) {
        super(props);
        this.state = {show: false};
    }

    hideModal = () => {
        this.setState({show: false});
    };

    showModal = () => {
        this.setState({show: true});
    };

    _acceptMovementRequest() {
        this.setState({show: false});
        let movement = this.props.movement;
        movement.accept();
        firebase.setMovingRequest(movement);
        firebase.getSavedItemsById(movement.item.id).then(items => {
                SavedItemsBuilder.build(items).then(items => {
                    let item = items[0];
                    item.status = "REQUEST_ACCEPTED";
                    firebase.setSavedItem(item);
                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                });
            }
        );
    };

    render() {
        const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";

        return (
            <div className={showHideClassName} style={{zIndex: 100}}>
                <section className="modal-main">
                    <button className="close-button" onClick={this.hideModal}>X</button>
                    <div className="lockitender-modal-main-title"><Trans id="DataModal.transport_request">Pedido de transporte</Trans></div>
                    <div className="lockitender-modal-title-1">Item:</div>
                    <div className="lockitender-modal-simple-text">{this.props.movement.item.name}</div>
                    <div className="lockitender-modal-title-1"><Trans id="DataModal.from">Desde:</Trans></div>
                    <div className="lockitender-modal-simple-text">{this.props.movement.lockerFrom.name}</div>
                    <div className="lockitender-modal-simple-text">{this.props.movement.lockerFrom.address}</div>
                    <div className="lockitender-modal-title-1"><Trans id="DataModal.to">Hasta:</Trans></div>
                    <div className="lockitender-modal-simple-text">{this.props.movement.lockerTo.name}</div>
                    <div className="lockitender-modal-simple-text">{this.props.movement.lockerTo.address}</div>
                    <div className="lockitender-modal-title-1"><Trans id="DataModal.price">Precio:</Trans></div>
                    <div className="lockitender-modal-simple-text">${this.props.movement.price}</div>

                    <div className="lockitender-modal-accept-button" onClick={this._acceptMovementRequest.bind(this)}>
                        <span className="lockitender-modal-accept-button-text"><Trans id="DataModal.accept_button">ACEPTAR</Trans></span>
                    </div>
                </section>
            </div>
        );
    }

};
