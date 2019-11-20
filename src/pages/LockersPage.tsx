import React, {Component} from 'react';
import {IonContent, IonPage} from '@ionic/react';
import Bag from "../components/Bag/Bag";
import './main.css'
import MoveToPage from "../components/MoveToPage/MoveToPage";
import EmptyBag from "../components/Bag/EmptyBag";

type LockersState = {
    name: String,
    location: String,
    showMoveTo: Boolean,
    bag1Moving: Boolean,
    bag1MovingTo: String
}

export default class LockersPage extends Component<{}, LockersState> {

    constructor(props:PropertyDecorator) {
        super(props);
        this.state = {
            name: "",
            location: "",
            showMoveTo: false,
            bag1Moving: false,
            bag1MovingTo: ""
        };
    }

    moveTo = (name:String, location:String) => {
        this.setState({
            name: name,
            location: location,
            showMoveTo: true,
        });
    };

    changeBagLocation = (bagName: String, lockerName: String) => {
        this.setState({
            name: bagName,
            showMoveTo: false,
            bag1Moving: bagName === "Mochila de trabajo",
            bag1MovingTo: bagName === "Mochila de trabajo" ? lockerName : ""
        });
    };

    render() {
        return(
            <IonPage>
                <IonContent>

                    {this.state.showMoveTo
                        ?
                        <MoveToPage
                            bagName={this.state.name}
                            changeBagLocation={this.changeBagLocation}
                        />
                        :
                        <div>
                            <span className="main-title">Mis LockIts</span>
                            <span className="sub-title">Estos son los objetos que actualmente tenés guardados en LockIt,
                                tocá el que quieras para interactuar!</span>
                            < Bag
                                name="Mochila de trabajo"
                                locationName="Starbucks (San Telmo) - Defensa 1102"
                                moveTo={this.moveTo}
                                showSaved={true}
                                transporting={this.state.bag1Moving}
                                bagMovingTo={this.state.bag1MovingTo}
                            />
                            <EmptyBag/>
                            <EmptyBag/>
                            <EmptyBag/>
                            <EmptyBag/>
                            <EmptyBag/>
                        </div>
                    }

                </IonContent>
            </IonPage>
        )
    }
}
