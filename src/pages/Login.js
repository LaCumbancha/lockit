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

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    toast: {
        show: false,
        message: '',
        color: ''
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
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