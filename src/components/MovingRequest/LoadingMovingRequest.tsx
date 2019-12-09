import React, {Component} from "react";
import {IonSpinner} from '@ionic/react';

export default class EmptyBag extends Component {

    render() {
        return(
            <div className={'bag-info-empty'}>
                <IonSpinner name="circles"/>
            </div>
        )
    }
}