import React, {Component} from 'react';
import {IonContent, IonPage} from '@ionic/react';
import './main.css'

type MoveToState = {
    showCheckout: Boolean,
}

export default class CheckoutPage extends Component<{}, MoveToState> {

    constructor(props: PropertyDecorator) {
        super(props);
    }

    render() {


        return (
            <IonPage>
                <IonContent>
                </IonContent>
            </IonPage>
        )
    }
}
