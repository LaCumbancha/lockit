import React, {Component} from "react";

import * as firebase from '../../../services/firebase';

import './DataModal.css'
import Movement from "../../../model/Movement";
import SavedItemsBuilder from "../../../model/SavedItemsBuilder";

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
                    <div className="lockitender-modal-main-title">Pedido de transporte</div>
                    <div className="lockitender-modal-title-1">Item:</div>
                    <div className="lockitender-modal-simple-text">{this.props.movement.item.name}</div>
                    <div className="lockitender-modal-title-1">Desde:</div>
                    <div className="lockitender-modal-simple-text">{this.props.movement.lockerFrom.name}</div>
                    <div className="lockitender-modal-simple-text">{this.props.movement.lockerFrom.address}</div>
                    <div className="lockitender-modal-title-1">Hasta:</div>
                    <div className="lockitender-modal-simple-text">{this.props.movement.lockerTo.name}</div>
                    <div className="lockitender-modal-simple-text">{this.props.movement.lockerTo.address}</div>
                    <div className="lockitender-modal-title-1">Precio:</div>
                    <div className="lockitender-modal-simple-text">${this.props.movement.price}</div>

                    <div className="lockitender-modal-accept-button" onClick={this._acceptMovementRequest.bind(this)}>
                        <span className="lockitender-modal-accept-button-text">ACEPTAR</span>
                    </div>
                </section>
            </div>
        );
    }

};