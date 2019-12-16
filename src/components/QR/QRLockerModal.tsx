import React, {Component} from "react";
import './QRLockerModal.css'
import {Trans} from "@lingui/react";

type ModalProps = {
    show: Boolean
};

type State = {
    show: Boolean,
    reload: Boolean
};


export default class QRLockerModal extends Component<ModalProps,State> {

    constructor({props}: { props: any }) {
        super(props);
        this.state = {show: false, reload: false};
    }

    render() {
        const QR = "/assets/QR.jpg";
        const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";

        return (
            <div className={showHideClassName} style={{zIndex:100}}>
                <section className="modal-main">
                    <button className="close-button" onClick={this.hideModal}>X</button>
                    <img className="QR-image" src={QR} alt={""}/>
                    <div className="QR-text"><Trans id="QRModal.text">¡Escanea este QR para abrir el locker!</Trans></div>
                </section>
            </div>
        );
    }

    hideModal = () => {
        this.setState({ show: false });
        if(this.state.reload){
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        }
    };

    showModal = (reload = false) => {
        this.setState({show: true, reload: reload});
    };

    reload = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }
};