import React, {Component} from "react";
import './QRLockerModal.css'

type ModalProps = {
    show: Boolean
};

type State = {
    show: Boolean
};


export default class QRLockerModal extends Component<ModalProps,State> {

    constructor({props}: { props: any }) {
        super(props);
        this.state = {show: true};
    }

    render() {
        const QR = "/assets/QR.jpg";
        const showHideClassName = this.state.show ? "modal display-block" : "modal display-none";

        return (
            <div className={showHideClassName} style={{zIndex:100}}>
                <section className="modal-main">
                    <button className="close-button" onClick={this.hideModal}>X</button>
                    <img className="QR-image" src={QR} alt={""}/>
                    <div className="QR-text">¡Escanea este QR para abrir tu locker!</div>
                </section>
            </div>
        );
    }

    hideModal = () => {
        this.setState({ show: false });
    };

    showModal = () => {
        this.setState({show: true});
    }
};