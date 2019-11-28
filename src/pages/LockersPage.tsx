import React, {Component} from 'react';
import {IonContent, IonPage} from '@ionic/react';
import Bag from "../components/Bag/Bag";
import './main.css'
import EmptyBag from "../components/Bag/EmptyBag";
import SavedItemsBuilder from "../model/SavedItemsBuilder.js";
import SavedItem from "../model/SavedItem";

const MAX_LOCKERS = 5;

type LockersState = {
    showMoveTo: Boolean,
}

export default class LockersPage extends Component<{}, LockersState> {
    private readonly savedItems: SavedItem[];

    constructor(props:PropertyDecorator) {
        super(props);
        this.savedItems = SavedItemsBuilder.build(localStorage.savedItems);
        this.state = { showMoveTo: false };
    }

    render() {
        let storedLockers = this.savedItems.slice(0, MAX_LOCKERS).map(item =>
            <Bag id={item.id} name={item.name} locker={item.locker} status={item.status} moveTo={item.moveTo}/>
        );
        let remainingFields = MAX_LOCKERS - this.savedItems.length;
        let emptyLockers = remainingFields > 0 ? Array(remainingFields).fill(<EmptyBag/>) : null;

        return(
            <IonPage>
                <IonContent>
                        <div>
                            <span className="main-title">Mis LockIts</span>
                            <span className="sub-title">Estos son los objetos que actualmente tenés guardados en LockIt,
                                tocá el que quieras para interactuar!</span>
                            {storedLockers}
                            {emptyLockers}
                        </div>
                </IonContent>
            </IonPage>
        )
    }
}
