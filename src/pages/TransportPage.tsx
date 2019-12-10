import React, {Component} from 'react';
import {IonContent, IonIcon, IonPage} from '@ionic/react';

import * as firebase from '../services/firebase';

import './main.css'
import LoadingBag from "../components/Bag/LoadingBag";
import {settings} from "ionicons/icons";

import Movement from "../model/Movement";
import MovementsBuilder from "../model/MovementsBuilder";
import MovingRequest from "../components/MovingRequest/MovingRequest";
import AcceptedRequest from "../components/MovingRequest/AcceptedRequest";
import NoRequests from "../components/MovingRequest/NoRequests";

const MAX_MOVEMENTS = 5;

type TransportState = {
    loading: Boolean
}

export default class LockersPage extends Component<{}, TransportState> {
    private movingRequests: Movement[] = [];

    constructor(props: PropertyDecorator) {
        super(props);
        this.state = {
            loading: true,
        };

        firebase.getMovingRequests().then(
            movingRequests => {
                console.log(movingRequests);
                MovementsBuilder.build(movingRequests).then(
                    res => {
                        this.movingRequests = res.filter((movement: Movement) => movement.status !== "COMPLETED");
                        this.setState({
                            loading: false,
                        })
                    },
                    err => console.log(err)
                );
            },
            err => console.log(err));

    }

    render() {
        const loading = this.state && this.state.loading;
        let activeRequest = null, possibleRequests = null, remainingFields = MAX_MOVEMENTS, emptyRequests = null, noRequests = null;

        if (loading) {
            emptyRequests = remainingFields > 0 ? Array.from(Array(remainingFields), (x, index) =>
                <LoadingBag key={index}/>) : null;
        } else if (this.state && this.movingRequests) {
            let acceptedRequests = this.movingRequests.filter((movement) =>
                movement.status === "ACCEPTED" || movement.status === "MOVING"
            ).map((movement) => <AcceptedRequest movement={movement}/>);

            if (acceptedRequests.length > 0) {
                activeRequest = acceptedRequests[0]
            } else {
                possibleRequests = this.movingRequests.slice(0, MAX_MOVEMENTS).map((movement, key) =>
                    <MovingRequest movement={movement}/>
                );

                if (possibleRequests.length === 0) { noRequests = <NoRequests/> }
            }
        }

        let hasActiveRequest = activeRequest !== null;

        return (
            <IonPage>
                <IonContent>
                    <div>
                        <div className="main-settings">
                            <span className="main-title">Pedidos</span>
                            <IonIcon className="settings-icon" icon={settings}/>
                        </div>
                        {hasActiveRequest ?
                            <span className="sub-title">¡Completa tu pedido actual para poder tomar nuevos!</span>
                            :
                            <span className="sub-title">¡Estos son los pedidos de transporte actuales en tu zona!</span>
                        }
                        {activeRequest}
                        {possibleRequests}
                        {emptyRequests}
                        {noRequests}
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}
