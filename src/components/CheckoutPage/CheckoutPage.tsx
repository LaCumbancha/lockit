import React, { Component } from 'react';
import {IonIcon} from "@ionic/react";
import {bicycle} from "ionicons/icons";

type CheckoutPageProps = {
    bagName: String,
    lockerName:String,
    lockerLocation:String,
    changeBagLocation: (bagName: String, lockerName: String) => void
}


export default class CheckoutPage extends Component<CheckoutPageProps> {

    moveTo = () => {
        this.props.changeBagLocation(this.props.bagName, this.props.lockerName);
    };

    render() {
        return(
            <div className="main-move-to-page">
                <span className="main-title" onClick={this.moveTo}>Elegí un Método de Pago</span>
                <div className="bag-info" onClick={this.moveTo}>Tarjeta Visa terminada en 1234</div>
                <div className="bag-info" onClick={this.moveTo}>Efectivo</div>
                <div className="bag-info" onClick={this.moveTo}>Otra Tarjeta</div>
                <span className="main-title" onClick={this.moveTo}>Total: $150</span>
                <div className="main-button" onClick={() => this.props.changeBagLocation("", "")}>
                    <span className="main-button-text">cancelar</span>
                </div>
            </div>
        )
    }
}
