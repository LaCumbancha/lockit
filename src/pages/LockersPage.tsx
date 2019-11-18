import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Bag from "../components/Bag/Bag";
import './main.css'
import MainIcons from "../components/MainIcons/MainIcons";

const LockersPage: React.FC = () => {
    return (
    <IonPage>
      <IonContent>
        <Bag
            name="Mochila de trabajo"
            location="Starbucks (San Telmo) - Defensa 1102"
            transporting={false}
        />
        <MainIcons/>
      </IonContent>
    </IonPage>
  );
};

export default LockersPage;
