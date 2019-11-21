import React, { Component } from 'react';
import Bag from "../Bag/Bag";
import CheckoutPage from "../CheckoutPage/CheckoutPage";

type MoveToPageProps = {
    bagName: String,
    changeBagLocation: (bagName: String, lockerName: String) => void
}

type MoveToPageState = {
    lockerName:String,
    lockerLocation:String,
    showCheckout: Boolean
}


export default class MoveToPage extends Component<MoveToPageProps, MoveToPageState> {

    constructor(props:MoveToPageProps) {
        super(props);
        this.state = {
            lockerName:"",
            lockerLocation:"",
            showCheckout: false
        };
    }

    showCheckOut = (lockerName:String, lockerLocation:String) => {
        this.setState({
            lockerName:lockerName,
            lockerLocation:lockerLocation,
            showCheckout: true
        });
    };

    render() {
        return(
            <div className="main-move-to-page">
                {this.state.showCheckout
                    ? <CheckoutPage
                        bagName={this.props.bagName}
                        lockerName={this.state.lockerName}
                        lockerLocation={this.state.lockerLocation}
                        changeBagLocation={this.props.changeBagLocation}
                    />
                    : <div>
                        <span className="main-title">Elegí un Locker</span>
                        < Bag
                            name="FIUBA"
                            locationName="Av. Paseo Colón 850"
                            moveTo={this.showCheckOut}
                            transporting={false}
                            showSaved={false}
                            showModal={false}
                            bagMovingTo=""
                        />
                        < Bag
                            name="Starbucks (UCA)"
                            locationName="Av. Alicia Moreau de Justo 1604"
                            moveTo={this.showCheckOut}
                            transporting={false}
                            showModal={false}
                            showSaved={false}
                            bagMovingTo=""
                        />
                        < Bag
                            name="Che Viejo"
                            locationName="Av. Paseo Colón 667"
                            moveTo={this.showCheckOut}
                            transporting={false}
                            showModal={false}
                            showSaved={false}
                            bagMovingTo=""
                        />
                        < Bag
                            name="Starbucks (San Telmo)"
                            locationName="Defensa 1102"
                            moveTo={this.showCheckOut}
                            transporting={false}
                            showModal={false}
                            showSaved={false}
                            bagMovingTo=""
                        />
                        <div className="main-button" onClick={() => this.props.changeBagLocation("", "")}>
                            <span className="main-button-text">cancelar</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
