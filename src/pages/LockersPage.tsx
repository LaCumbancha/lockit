import React, {Component} from 'react';
import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonText} from '@ionic/react';
import Bag from "../components/Bag/Bag";
import './main.css'
import EmptyBag from "../components/Bag/EmptyBag";
import SavedItemsBuilder from "../model/SavedItemsBuilder.js";
import SavedItem from "../model/SavedItem";
import {settings} from "ionicons/icons";

import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications } = Plugins;

const MAX_LOCKERS = 5;

type LockersState = {
    showMoveTo: Boolean,
    notifications: [{ id: String, title: String, body: String }]
}

export default class LockersPage extends Component<{}, LockersState> {
    private readonly savedItems: SavedItem[];

    constructor(props:PropertyDecorator) {
        super(props);
        this.savedItems = SavedItemsBuilder.build(localStorage.savedItems);
        this.state = {
            showMoveTo: false,
            notifications: [{ id: 'id', title: "Test Push", body: "This is my first push notification" }]
        };
    }

    push = () => {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On succcess, we should be able to receive notifications
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
                notif.push({ id: notification.id, title: notification.title, body: notification.body })
                this.setState({
                    notifications: notif
                })
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                let notif = this.state.notifications;
                notif.push({
                    id: notification.notification.data.id,
                    title: notification.notification.data.title,
                    body: notification.notification.data.body
                })
                this.setState({
                    notifications: notif
                })
            }
        );
    }

    render() {
        let storedLockers = this.savedItems.slice(0, MAX_LOCKERS).map((item, key) =>
            <Bag key={key} id={item.id} name={item.name} locker={item.locker} status={item.status} moveTo={item.moveTo}/>
        );
        let remainingFields = MAX_LOCKERS - this.savedItems.length;
        let emptyLockers = remainingFields > 0 ? Array(remainingFields).fill(<EmptyBag/>) : null;

        return(
            <IonPage>
                <IonContent>
                        <div>
                            <div className="main-settings">
                                <span className="main-title">Mis LockIts</span>
                                <IonIcon onClick={this.push} className="settings-icon" icon={settings}/>
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
