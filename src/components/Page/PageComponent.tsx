import React, {Component} from 'react';
import {IonContent} from "@ionic/react";
import LockitMap from "../Map/LockitMap";
import './PageComponent.css'

type State = {
    showList: boolean
};

export default class PageComponent extends Component<{}, State> {
    constructor({props}: { props: any }) {
        super(props);
        this.state = {showList: true};
        this.changeListState = this.changeListState.bind(this);
    }

    changeListState() {
        this.setState(state => ({
            showList: !state.showList
        }));
    }

    render() {
        return (
            <div className={"principal-component"}>
                <IonContent>
                    <LockitMap/>
                </IonContent>
            </div>
        );
    }
}
