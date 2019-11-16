import React, { Component } from 'react';
import {bicycle, pin, wifi} from 'ionicons/icons';
import './MainIcons.css'
import {IonIcon} from "@ionic/react";

type MainIconsProps = {
}

export default class MainIcons extends Component<MainIconsProps> {

    render() {
        return(
            <div className="main-icon">
                <div className="main-icon-container">
                    <IonIcon className="main-icon" icon={wifi} />
                    <span className="main-icon-text">Buscá un</span>
                    <span className="main-icon-text">LockIt</span>
                </div>
                <div className="main-icon-container">
                    <IonIcon className="main-icon" icon={pin} />
                    <span className="main-icon-text">Mis</span>
                    <span className="main-icon-text">LockIts</span>
                </div>
                <div className="main-icon-container">
                    <IonIcon className="main-icon" icon={bicycle} />
                    <span className="main-icon-text">Transportá un</span>
                    <span className="main-icon-text">LockIt</span>
                </div>
            </div>
        )
    }
}
