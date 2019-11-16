import React, { Component } from 'react';
import {bicycle} from 'ionicons/icons';
import './Bag.css'
import {IonIcon} from "@ionic/react";

type BagProps = {
    name: string,
    location:string,
    transporting:boolean
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
                        <span className="bag-info-transport-text"><tr>transportando</tr></span>
                        <IonIcon className="bag-icon" icon={bicycle} />
                    </div>
                    : <div className="bag-info-transport-2">
                        <span className="bag-info-transport-text-2"><tr>guardada</tr></span>
                        <div className="bag-info-transport-move-to">
                            <span className="bag-info-transport-move-to-text">mover</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
