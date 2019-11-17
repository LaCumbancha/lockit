import React, {Component} from 'react';
import {IonContent, IonItem, IonLabel, IonList, IonSearchbar, IonToolbar} from "@ionic/react";
import LockitMap from "../Map/LockitMap";
import './PageComponent.css'

type State = {
    showList: boolean
};

export default class PageComponent extends Component<{}, State> {
    constructor({props}: { props: any }){
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
              <IonToolbar>
                  <IonSearchbar placeholder="Quiero buscar mi locker en..."
                                onClick={() => this.changeListState()}/>
                      <IonList className={"list-padding"} hidden={this.state.showList}>
                          <IonItem>
                              <IonLabel>
                                  Hola
                              </IonLabel>
                          </IonItem>
                          <IonItem>
                              <IonLabel>
                                  Hola
                              </IonLabel>
                          </IonItem>
                          <IonItem>
                              <IonLabel>
                                  Hola
                              </IonLabel>
                          </IonItem>
                      </IonList>
              </IonToolbar>
              <IonContent>
                  <LockitMap/>
              </IonContent>

          </div>
        );
    }
}
