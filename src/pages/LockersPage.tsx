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

const MAX_LOCKERS = 5;

type LockersState = {
    loading: Boolean,
    showMoveTo: Boolean,
    savedItems: SavedItem[]
}

export default class LockersPage extends Component<{}, LockersState> {
    private savedItems: SavedItem[] = [];

    constructor(props:PropertyDecorator) {
        super(props);
        this.state = {
          loading: true,
          showMoveTo: false,
          savedItems: []
        };
        firebase.getSavedItemsByUserId(localStorage.userID).then(
            savedItems => {
                console.log(savedItems);
                SavedItemsBuilder.build(savedItems).then(
                    res => {
                        this.setState({
                            loading: false,
                            showMoveTo: false,
                            savedItems: res.map(function(item: SavedItem){
                              return new SavedItem(item.id,item.name,item.locker,item.status,item.moveTo);
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
        if(loading){
          emptyLockers = remainingFields > 0 ? Array.from(Array(remainingFields),(x,index) => <LoadingBag key={index}/>) : null;
        }
        else if(this.state && this.state.savedItems){
            storedLockers = this.state.savedItems.slice(0, MAX_LOCKERS).map((item, key) =>
                <Bag key={key} id={item.id} name={item.name} locker={item.locker} status={item.status} moveTo={item.moveTo}/>
            );
            remainingFields = MAX_LOCKERS - this.state.savedItems.length;
            emptyLockers = remainingFields > 0 ? Array.from(Array(remainingFields),(x,index) => <EmptyBag key={index}/>) : null;
        }

        return(
            <IonPage>
                <IonContent>
                        <div>
                            <div className="main-settings">
                                <span className="main-title">Mis LockIts</span>
                                <IonIcon className="settings-icon" icon={settings}/>
                            </div>
                            <span className="sub-title">Estos son los objetos que actualmente tenés guardados en LockIt,
                                tocá el que quieras para interactuar!</span>
                            {storedLockers}
                            {emptyLockers}
                        </div>
                    {/*<IonList>*/}
                        {/*<IonListHeader>*/}
                            {/*<IonLabel>Notifications</IonLabel>*/}
                        {/*</IonListHeader>*/}
                        {/*{this.state.notifications && this.state.notifications.map((notif: any) =>*/}
                            {/*<IonItem key={notif.id}>*/}
                                {/*<IonLabel>*/}
                                    {/*<IonText>*/}
                                        {/*<h3>{notif.title}</h3>*/}
                                    {/*</IonText>*/}
                                    {/*<p>{notif.body}</p>*/}
                                {/*</IonLabel>*/}
                            {/*</IonItem>*/}
                        {/*)}*/}
                    {/*</IonList>*/}
                </IonContent>
            </IonPage>
        )
    }
}
