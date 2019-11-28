import React, {Component} from 'react';
import {IonButton, IonContent, IonPage, IonTabButton} from '@ionic/react';
import './main.css'
import SavedItemsBuilder from "../model/SavedItemsBuilder";
import SavedItem from "../model/SavedItem";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";
import Locker from "../model/Locker";
import LockersBuilder from "../model/LockersBuilder";
import LockerTag from "../components/Locker/LockerTag";

type MoveToState = {
    showCheckout: Boolean,
}

export default class MoveToPage extends Component<{}, MoveToState> {
    private readonly item: SavedItem;
    private readonly nearestLockers: Locker[];

    constructor(props: PropertyDecorator) {
        super(props);
        this.state = {showCheckout: false};
        this.item = SavedItemsBuilder.build(localStorage.savedItems)
            .filter(function (item: SavedItem) {
                return item.id === localStorage.itemToMove
            });

        // TODO: Hardcode nearest lockers in list and calculate price.
        this.nearestLockers = LockersBuilder.build(localStorage.availableLockers);
    }

    render() {
        let lockers = this.nearestLockers.map(locker =>
            <LockerTag id={locker.id} name={locker.name} address={locker.address} price={locker.price}/>
        );

        return (
            <IonPage>
                <IonContent>
                    {this.state.showCheckout
                        ? <div className="main-move-to-page"><CheckoutPage item={this.item}/></div>
                        : <div>
                            <span className="main-title">Elegí un Locker</span>
                            {lockers}
                        </div>
                    }
                    <div>
                    <IonButton className="main-button" href="/lockers">
                        <div className="main-button cancel-button">
                            <span className="main-button-text">Cancelar</span>
                        </div>
                    </IonButton>
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}
