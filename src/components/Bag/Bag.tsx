import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import {bicycle} from 'ionicons/icons';
import './Bag.css'
import {IonIcon} from "@ionic/react";

type BagProps = {
    name: String,
    locationName: String,
    transporting: Boolean,
    moveTo: (name: String, location: String) => void,
    bagMovingTo: String,
    showSaved: Boolean
}


class Bag extends Component<RouteComponentProps<{}> & BagProps> {

    _goToMap(){
        if(this.props.transporting){
            this.props.history.push('/map?ib=1422');
        }
    }

    render() {
        return(
            <div className={!this.props.transporting? 'bag-info':'bag-info bag-info-clickable'} onClick={this._goToMap.bind(this)}>
                <div className="bag'-info-main">
                    <span className="bag-info-main-text">{ this.props.name }</span>
                    <span className="bag-info-secondary-text">{ this.props.locationName }</span>
                </div>
                {this.props.transporting ?
                    <div className="bag-info-transport">
                        <IonIcon className="bag-icon" icon={bicycle} />
                        <span className="bag-info-transport-text">transportando a:</span>
                        <span className="bag-info-transport-text">{ this.props.bagMovingTo }</span>
                    </div>
                    : <div className="bag-info-transport-2">
                        {this.props.showSaved ?
                            <span className="bag-info-transport-text-2">GUARDADA</span>
                            : <div></div>
                        }
                        <div className="bag-info-transport-move-to" onClick={() => this.props.moveTo(this.props.name, this.props.locationName)}>
                            <span className="bag-info-transport-move-to-text">mover</span>
                        </div>
                        {!this.props.showSaved ?
                            <span className="bag-info-price-text">Precio: $150</span>
                            : <div></div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(Bag)