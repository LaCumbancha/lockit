import React, {Component} from 'react';
import {IonContent, IonHeader, IonPage, IonRouterOutlet, IonTitle, IonToolbar} from '@ionic/react';
import './main.css'
import EmptyBag from "../components/Bag/EmptyBag";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";

type LockersState = {
    showMoveTo: Boolean,
}

export default class MoveToPage extends Component<{}, LockersState> {

    constructor(props: PropertyDecorator) {
        super(props);
        this.state = {showMoveTo: false};
    }

    changeBagLocation = (bagName: String, lockerName: String) => {
        console.log("Changing bag location")
    };

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Ionic Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    The world is your oyster.
                    <p>
                        If you get lost, the{' '}
                        <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/">
                            docs
                        </a>{' '}
                        will be your guide.
                    </p>
                </IonContent>
            </IonPage>
        )
    }
}
