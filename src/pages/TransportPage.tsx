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

import {Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed} from '@capacitor/core';
import Movement from "../model/Movement";
import MovementsBuilder from "../model/MovementsBuilder";
import MovingRequest from "../components/MovingRequest/MovingRequest";

const {PushNotifications} = Plugins;

const MAX_MOVEMENTS = 5;

type LockersState = {
    loading: Boolean,
    showMoveTo: Boolean,
    notifications: [{ id: String, title: String, body: String }]
}

export default class LockersPage extends Component<{}, LockersState> {
    private movingRequests: Movement[] = [];

    constructor(props: PropertyDecorator) {
        super(props);
        this.state = {
            loading: true,
            showMoveTo: false,
            notifications: [{id: 'id', title: "Test Push", body: "This is my first push notification"}]
        };

        firebase.getMovingRequests().then(
            movingRequests => {
                console.log(movingRequests);
                MovementsBuilder.build(movingRequests).then(
                    res => this.movingRequests = res,
                    err => console.log(err)
                );
            },
            err => console.log(err));

    }

    push = () => {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On success, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token: PushNotificationToken) => {
                alert('Push registration success, token: ' + token.value);
            }
        );

        // Some issue with your setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotification) => {
                let notif = this.state.notifications;
                // @ts-ignore
                notif.push({id: notification.id, title: notification.title, body: notification.body})
                this.setState({
                    notifications: notif
                })
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                let notifications = this.state.notifications;
                notifications.push({
                    id: notification.notification.data.id,
                    title: notification.notification.data.title,
                    body: notification.notification.data.body
                });
                this.setState({
                    notifications: notifications
                })
            }
        );
    };

    render() {
        const loading = this.state && this.state.loading;
        let requests, remainingFields = MAX_MOVEMENTS, emptyRequests = null;

        if (loading) {
            emptyRequests = remainingFields > 0 ? Array.from(Array(remainingFields), (x, index) =>
                <LoadingBag key={index}/>) : null;
        } else if (this.state && this.movingRequests) {
            requests = this.movingRequests.slice(0, MAX_MOVEMENTS).map((movement, key) =>
                <MovingRequest movement={movement}/>
            );
            remainingFields = MAX_MOVEMENTS - this.movingRequests.length;
            emptyRequests = remainingFields > 0 ? Array.from(Array(remainingFields), (x, index) =>
                <EmptyBag key={index}/>) : null;
        }

        return (
            <IonPage>
                <IonContent>
                    <div>
                        <div className="main-settings">
                            <span className="main-title">Pedidos</span>
                            <IonIcon onClick={this.push} className="settings-icon" icon={settings}/>
                        </div>
                        <span className="sub-title">¡Estos son los pedidos actuales de movimientos en tu zona!</span>
                        {requests}
                        {emptyRequests}
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}
