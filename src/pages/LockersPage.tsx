import React, {Component} from 'react';
import {IonContent, IonPage} from '@ionic/react';
import Bag from "../components/Bag/Bag";
import './main.css'
import MainIcons from "../components/MainIcons/MainIcons";
import MoveToPage from "../components/MoveToPage/MoveToPage";

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
                            < Bag
                                name="Mochila de trabajo"
                                location="Starbucks (San Telmo) - Defensa 1102"
                                moveTo={this.moveTo}
                                showSaved={true}
                                transporting={this.state.bag1Moving}
                                bagMovingTo={this.state.bag1MovingTo}
                            />
                            <MainIcons/>
                        </div>
                    }

                </IonContent>
            </IonPage>
        )
    }
}
