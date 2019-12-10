import React, {Component} from 'react';
import {IonContent, IonLoading, IonPage} from '@ionic/react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import * as firebase from '../services/firebase';

import './main.css'
import SavedItem from "../model/SavedItem";
import Operation from "../model/Operation";
import OperationBuilder from "../model/OperationBuilder";
import SavedItemsBuilder from "../model/SavedItemsBuilder";
import Movement from "../model/Movement";
import MovementsBuilder from "../model/MovementsBuilder";
import NewCreditCard from "../components/NewCreditCard/NewCreditCard";

type CheckoutPageProps = {
    item: SavedItem
}

type CheckoutPageState = {
    loading: boolean,
    newCreditCard: boolean,
    card: String
}

class CheckoutPage extends Component<CheckoutPageProps & RouteComponentProps<{}>, CheckoutPageState> {
    private readonly operation: Operation;

    constructor({props}: any) {
        super(props);
        this.state = {
            loading: false,
            newCreditCard: false,
            card: ""
        };
        this.operation = OperationBuilder.build(localStorage.operation);
    }

    moveTo = () => {
        this.setState({loading: true});
    };

    changeLocation() {
        let operation = this.operation;
        firebase.getSavedItemsByUserId(localStorage.userID).then(
            savedItems => {
                SavedItemsBuilder.build(savedItems).then(
                    items => {
                        items.map(function (item: SavedItem) {
                            if (item.id === operation.itemId) {
                                item.waitForMovement();
                            }
                            firebase.setSavedItem(item);
                            return item;
                        });

                        firebase.getMovingRequests().then(movingRequests => {
                                MovementsBuilder.build(movingRequests).then(requests => {
                                    let nextId = requests
                                        .map((movement: Movement) => movement.id)
                                        .reduce((maxId: number, id: number) => maxId > id ? maxId : id) + 1;

                                    let item = { id: operation.itemId };
                                    let lockerFrom = { id: operation.lockerFromId };
                                    let lockerTo = { id: operation.lockerToId };

                                    firebase.setMovingRequest(new Movement(
                                        nextId, item, lockerFrom, lockerTo, "150", "REQUEST_TO_MOVE"
                                    ));
                                })
                            }
                        );

                        this.setState({loading: false});
                        this.props.history.push('/map');
                    },
                    err => console.log(err));
            },
            err => console.log(err));
    }

    newCreditCard = () => {
        this.setState({newCreditCard: true});
    };

    setCard = (number:String) => {
        this.setState({
            newCreditCard: false,
            card: number
        });
    };

    render() {
        return (
            <IonPage>

                {this.state.newCreditCard
                    ?
                    <NewCreditCard setCard={(number:String) => this.setCard(number)}/>
                    :
                    <IonContent>
                        <div className="main-move-to-page">
                            <span className="main-title" onClick={this.moveTo}>Elegí un Método de Pago</span>
                            {this.state.card.length > 0
                                ?
                                <div className="chk-info" onClick={this.moveTo}>
                                    Tarjeta terminada en {this.state.card}
                                    <GenericCard/>
                                </div>
                                : null
                            }
                            <div className="chk-info" onClick={this.newCreditCard}>
                                Agregar una nueva tarjeta
                            </div>
                            <span className="main-title" onClick={this.moveTo}>Total: ${this.operation.price}</span>
                            <div className="main-button" onClick={() => this.props.history.push('/map')}>
                                <span className="main-button-text">cancelar</span>
                            </div>
                            <IonLoading
                                isOpen={this.state.loading}
                                onDidDismiss={() => this.changeLocation()}
                                message={'Procesando el pago...'}
                                duration={2000}
                            />
                        </div>
                    </IonContent>
                }

            </IonPage>
        )
    }
}

export default withRouter(CheckoutPage);

class GenericCard extends Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 512 512">
                <g fill="#2566af">
                    <path d="M480 128c0-17.6-14.4-32-32-32H64c-17.6 0-32 14.4-32 32v48h448v-48zM32 384c0
                    17.6 14.4 32 32 32h384c17.6 0 32-14.4 32-32V224H32v160zm142-48h164c7.7 0 14 6.3 14 14s-6.3
                    14-14 14H174c-7.7 0-14-6.3-14-14s6.3-14 14-14zm-72 0h12c7.7 0 14 6.3 14 14s-6.3 14-14
                    14h-12c-7.7 0-14-6.3-14-14s6.3-14 14-14z"/>
                </g>
            </svg>
        )
    }
}
