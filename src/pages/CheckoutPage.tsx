import React, {Component} from 'react';
import {IonContent, IonLoading, IonPage} from '@ionic/react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './main.css'
import SavedItem from "../model/SavedItem";
import Operation from "../model/Operation";
import OperationBuilder from "../model/OperationBuilder";
import SavedItemsBuilder from "../model/SavedItemsBuilder";
import LockersBuilder from "../model/LockersBuilder";
import Locker from "../model/Locker";

type CheckoutPageProps = {
    item: SavedItem
}

type CheckoutPageState = {
    loading: boolean,
}

class CheckoutPage extends Component<CheckoutPageProps & RouteComponentProps<{}>, CheckoutPageState> {
    private readonly operation: Operation;

    constructor({props}: any) {
        super(props);
        this.state = {
            loading: false,
        };
        this.operation = OperationBuilder.build(localStorage.operation);
    }

    moveTo = () => {
        this.setState({loading: true});
    };

    changeLocation() {
        let operation = this.operation;
        let items = SavedItemsBuilder.build(localStorage.savedItems);
        let lockers = LockersBuilder.build(localStorage.availableLockers);

        items.map(function (item: SavedItem) {
            if (item.id === operation.itemId) {
                item.locker = lockers.filter(function (locker: Locker) {
                    return locker.id === operation.lockerToId
                })[0]
            }
            return item
        });

        localStorage.savedItems = JSON.stringify(items);
        this.setState({loading: false});
        this.props.history.push('/map');
    }

    render() {
        return (
            <IonPage>
                <IonContent>
                    <div className="main-move-to-page">
                        <span className="main-title" onClick={this.moveTo}>Elegí un Método de Pago</span>
                        <div className="chk-info" onClick={this.moveTo}>
                            Tarjeta Visa terminada en 1234
                            <VisaCard/>
                        </div>
                        <div className="chk-info" onClick={this.moveTo}>
                            Efectivo
                            <Cash/>
                        </div>
                        <div className="chk-info" onClick={this.moveTo}>
                            Otra Tarjeta
                            <GenericCard/>
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
            </IonPage>
        )
    }
}

export default withRouter(CheckoutPage);

class VisaCard extends Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 141.732 141.732">
                <g fill="#2566af">
                    <path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735
                            77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976
                            10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569
                            89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881
                            89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877
                            13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83
                            0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075
                            4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439
                            16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z"/>
                </g>
                <path d="M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373
                        1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z" fill="#e6a540"/>
                <path fill="none" d="M0 0h141.732v141.732H0z"/>
            </svg>
        )
    }
}

class Cash extends Component {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 512 512">
                <g fill="#007800">
                    <path d="M466 355.9H46c-7.7 0-14 6.3-14 14s6.3 14 14 14h420c7.7 0 14-6.3
                    14-14s-6.3-14-14-14zM466 403.9H46c-7.7 0-14 6.3-14 14s6.3 14 14 14h420c7.7 0
                    14-6.3 14-14s-6.3-14-14-14zM444.9 80.1H67.1C47.8 80.1 32 95.9 32 115.2V293c0
                    19.3 15.8 35.1 35.1 35.1h377.8c19.3 0 35.1-15.8 35.1-35.1V115.2c0-19.3-15.8-35.1-35.1-35.1zM114
                    296.1H78c-7.7 0-14-6.3-14-14s6.3-14 14-14h36c7.7 0 14 6.3 14 14s-6.3 14-14 14zm0-156H78c-7.7
                    0-14-6.3-14-14s6.3-14 14-14h36c7.7 0 14 6.3 14 14s-6.3 14-14
                    14zm142 144c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80zm178
                    12h-36c-7.7 0-14-6.3-14-14s6.3-14 14-14h36c7.7 0 14 6.3 14 14s-6.3 14-14
                    14zm0-156h-36c-7.7 0-14-6.3-14-14s6.3-14 14-14h36c7.7 0 14 6.3 14 14s-6.3 14-14 14z"/>
                    <circle cx="256" cy="206" r="53"/>
                </g>
            </svg>
        )
    }
}

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
