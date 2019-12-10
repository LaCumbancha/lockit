import React, {Component} from 'react';
import {IonButton, IonContent, IonPage} from '@ionic/react';

import * as firebase from '../services/firebase';

import './main.css'
import SavedItemsBuilder from "../model/SavedItemsBuilder";
import SavedItem from "../model/SavedItem";
import Locker from "../model/Locker";
import LockersBuilder from "../model/LockersBuilder";
import LockerTag from "../components/Locker/LockerTag";
import LoadingBag from "../components/Bag/LoadingBag";

type MoveToState = {
    showCheckout: Boolean,
    nearestLockers: Locker[]
}

const MAX_LOCKERS = 4;

export default class MoveToPage extends Component<{}, MoveToState> {
    private item!: SavedItem;
    //private nearestLockers: Locker[] = [];

    constructor(props: PropertyDecorator) {
        super(props);
        this.state = {
            showCheckout: false,
            nearestLockers: []
        };
        firebase.getSavedItemsByUserId(localStorage.userID).then(
            savedItems => {
                SavedItemsBuilder.build(savedItems).then(
                    res => {
                        this.item = res.filter(function (item: SavedItem) {
                            return item.id === JSON.parse(localStorage.operation).itemId
                        })[0];

                        // TODO: Hardcode nearest lockers in list and calculate price.
                        firebase.getAvailableLockers().then(
                            availableLockers => {
                                //this.nearestLockers = LockersBuilder.build(availableLockers);
                                this.setState({
                                    nearestLockers: LockersBuilder.build(availableLockers).filter((locker: Locker) => !locker.taken)
                                })
                            },
                            err => console.log(err));
                        
                    },
                    err => console.log(err))
                
            },
            err => console.log(err));
    }

    render() {
        let lockers;
        if(this.item){
            lockers = this.state.nearestLockers.map(locker =>
                <LockerTag key={locker.id} item={this.item} lockerId={locker.id} lockerName={locker.name} lockerAddress={locker.address} price={locker.price}/>
            );
        } else {
            lockers = Array.from(Array(MAX_LOCKERS),(x,index) => <LoadingBag key={index}/>);
        }

        return (
            <IonPage>
                <IonContent>
                    <span className="main-title">Elegí un Locker</span>
                    {lockers}
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
