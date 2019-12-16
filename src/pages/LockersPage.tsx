import React, {Component} from 'react';
import {IonContent, IonIcon, IonPage} from '@ionic/react';

import * as firebase from '../services/firebase';


import Bag from "../components/Bag/Bag";
import './main.css'
import EmptyBag from "../components/Bag/EmptyBag";
import LoadingBag from "../components/Bag/LoadingBag";
import SavedItemsBuilder from "../model/SavedItemsBuilder.js";
import SavedItem from "../model/SavedItem";
import {settings} from "ionicons/icons";
import {Trans} from "@lingui/react";
import {Redirect} from "react-router-dom";

const MAX_LOCKERS = 5;

type LockersState = {
    loading: Boolean,
    showMoveTo: Boolean,
    savedItems: SavedItem[],
    settingsOpen: Boolean,
}

export default class LockersPage extends Component<{}, LockersState> {
    private savedItems: SavedItem[] = [];

    constructor(props: PropertyDecorator) {
        super(props);
        this.state = {
            loading: true,
            showMoveTo: false,
            savedItems: [],
            settingsOpen: false
        };
        firebase.getSavedItemsByUserId(localStorage.userID).then(
            savedItems => {
                console.log(savedItems);
                SavedItemsBuilder.build(savedItems).then(
                    res => {
                        this.setState({
                            loading: false,
                            showMoveTo: false,
                            savedItems: res.map(function (item: SavedItem) {
                                return new SavedItem(item.id, item.name, item.locker, item.status, item.moveTo);
                            })
                        });
                    },
                    err => console.log(err));
            },
            err => console.log(err));
    }

    render() {
        const loading = this.state && this.state.loading;
        let storedLockers, remainingFields = MAX_LOCKERS, emptyLockers = null;
        if (loading) {
            emptyLockers = remainingFields > 0 ? Array.from(Array(remainingFields), (x, index) => <LoadingBag
                key={index}/>) : null;
        } else if (this.state && this.state.savedItems) {
            storedLockers = this.state.savedItems.slice(0, MAX_LOCKERS).map((item, key) =>
                <Bag key={key} id={item.id} name={item.name} locker={item.locker} status={item.status}
                     moveTo={item.moveTo}/>
            );
            remainingFields = MAX_LOCKERS - this.state.savedItems.length;
            emptyLockers = remainingFields > 0 ? Array.from(Array(remainingFields), (x, index) => <EmptyBag
                key={index}/>) : null;
        }
        if (this.state.settingsOpen && localStorage.settingsOpen) return (<Redirect to={'/settings'}/>);

        return (
            <IonPage>
                <IonContent>
                    <div>
                        <div className="main-settings">
                            <span className="main-title">
                                <Trans id="LockersPage.title">Mis LockIts</Trans>
                            </span>
                            <IonIcon className="settings-icon" icon={settings} onClick={() => {
                                localStorage.settingsOpen = true;
                                this.setState({settingsOpen: localStorage.settingsOpen})
                            }}/>
                        </div>
                        <span className="sub-title">
                            <Trans id="LockersPage.header_message">
                                Estos son los objetos que actualmente tenés guardados en LockIt, tocá el que quieras para interactuar!
                            </Trans>
                        </span>
                        {storedLockers}
                        {emptyLockers}
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}
