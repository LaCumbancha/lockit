import React from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Bag from "../components/Bag/Bag";
import './main.css'

const Tab2: React.FC = () => {
    return (
    <IonPage>
      <IonContent>
          <span className="main-title">Inicio</span>
          <Bag name="MOCHILA MAMÁ" location="From  Aimé Painé 132 To 33 Orientales 123"/>
        <Bag name="Mochila de trabajo" location="Aimé Painé 132"/>
        <IonList>
          <IonItem routerLink="/tab2/details">
            <IonLabel>
              <h2>Go to detail</h2>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
