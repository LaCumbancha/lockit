import { IonContent,
    IonText,
    IonRow,
    IonCol,
    IonPage,
    IonButton,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonToast} from '@ionic/react';

import React, { Component } from 'react';
import './LoginPage.css';
import * as firebase from '../services/firebase';
import { Plugins } from '@capacitor/core';
const { PushNotifications } = Plugins;

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    toast: {
        show: false,
        message: '',
        color: ''
    },
    notifications: [{ id: 'id', title: "Test Push", body: "This is my first push notification" }]
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
        localStorage.removeItem('type');
    }

    signIn() {
        const { history } = this.props;
        this.setState({loading: true});
        firebase.login(this.state.email,this.state.password).then(
            res => {
                this.setState({loading: false});
                console.info('result', res);
                if (res) {
                    localStorage.userID = res.user.uid;
                    localStorage.type = res.user.email === "usuario@lockitendero.com" ? "LOCKITENDERO" : "CLIENTE";
                    this.push();
                    this.event = new CustomEvent('loggedIn', { detail: res });
                    window.dispatchEvent(this.event);
                    if (localStorage.type === "LOCKITENDERO") {
                        history.push({pathname: '/transport', state: {}});
                    } else {
                        history.push({pathname: '/', state: {}});
                    }
                }
            },
            err => {
                this.setState({loading: false});
                this.setState({
                    toast: {
                        color: 'danger',
                        message: err.message,
                        show: true
                    }
                })
            }
        );

    }

    _onDidDismissToast() {
        this.setState({
            toast: {
                color: '',
                message: '',
                show: false
            }
        })
    }

    _onChange(key,event){
        this.setState({[key]:event});
    }

    push() {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On succcess, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token) => {
                firebase.saveToken(localStorage.type, token.value);
            }
        );

        // Some issue with your setup and push will not work
        PushNotifications.addListener('registrationError',
            (error) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification) => {
                let notif = this.state.notifications;
                // @ts-ignore
                notif.push({ id: notification.id, title: notification.title, body: notification.body });
                this.setState({
                    notifications: notif
                })
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification) => {
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
    };

    render() {
        return (
            <IonPage>
                <IonContent className="ion-padding">
                    <IonRow>
                        <IonCol className="text-center">
                            <IonImg className="title-img" src="assets/lockit-logo.jpeg" ></IonImg>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="text-center">
                            <IonText className="title">
                                Si es una carga, nos encargamos
                            </IonText>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="text-center">
                            <IonText className="text-center">
                                By FIUBA Team
                            </IonText>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol className="text-center">
                            <IonItem>
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput value={this.state.email} onIonChange={(e) => this._onChange('email',e.target.value)}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol className="text-center">
                            <IonItem>
                                <IonLabel position="floating">Password</IonLabel>
                                <IonInput value={this.state.password} type={"password"} onIonChange={(e) => this._onChange('password',e.target.value)}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonButton className="login-button" onClick={() => this.signIn()} expand="block" fill="solid" color="danger" disabled={this.state.loading}>
                        Entrar
                    </IonButton>
                </IonContent>
                <IonToast
                    isOpen={this.state.toast.show}
                    onDidDismiss={() => this._onDidDismissToast()}
                    message={this.state.toast.message}
                    position="bottom"
                    color={this.state.toast.color}
                    duration={5000}
                    buttons={[
                        {
                            text: 'Cerrar',
                            role: 'cancel'
                        }
                    ]}
                />
            </IonPage>
        )
    }
}

export default Login;
