import React, { Component } from 'react';
import {bicycle} from 'ionicons/icons';
import './Bag.css'
import {IonIcon} from "@ionic/react";

type BagProps = {
    name: String,
    location: String,
    transporting: Boolean,
    moveTo: (name: String, location: String) => void,
    bagMovingTo: String,
    showSaved: Boolean
}


export default class Bag extends Component<BagProps> {

    render() {
        return(
            <div className="bag-info">
                <div className="bag-info-main">
                    <span className="bag-info-main-text">{ this.props.name }</span>
                    <span className="bag-info-secondary-text">{ this.props.location }</span>
                </div>
                {this.props.transporting ?
                    <div className="bag-info-transport">
                        <IonIcon className="bag-icon" icon={bicycle} />
                        <span className="bag-info-transport-text"><tr>transportando a:</tr></span>
                        <span className="bag-info-transport-text">{ this.props.bagMovingTo }</span>
                    </div>
                    : <div className="bag-info-transport-2">
                        {this.props.showSaved ?
                            <span className="bag-info-transport-text-2"><tr>guardada</tr></span>
                            : <div></div>
                        }
                        <div className="bag-info-transport-move-to" onClick={() => this.props.moveTo(this.props.name, this.props.location)}>
                            <span className="bag-info-transport-move-to-text">mover</span>
                        </div>
                        {!this.props.showSaved ?
                            <span className="bag-info-price-text"><tr>Precio: $150</tr></span>
                            : <div></div>
                        }
                    </div>
                }
            </div>
        )
    }
}
