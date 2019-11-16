import React from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Bag from "../components/Bag/Bag";
import './main.css'
import MainIcons from "../components/MainIcons/MainIcons";

const Tab2: React.FC = () => {
    return (
    <IonPage>
      <IonContent>
          <span className="main-title">Inicio</span>
          <Bag
              name="MOCHILA MAMÁ"
              location="From  Aimé Painé 132 To 33 Orientales 123"
              transporting={true}
          />
        <Bag
            name="Mochila de trabajo"
            location="Aimé Painé 132"
            transporting={false}
        />
        <MainIcons/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
