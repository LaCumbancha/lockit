import React from 'react';
import { IonContent, 
  IonPage, 
  IonToolbar, 
  IonSearchbar } from '@ionic/react';

import LockitMap from "../components/Map/LockitMap";

const Tab3Page: React.FC = () => {
  return (
    <IonPage>
      <IonToolbar color="dark">
        <IonSearchbar placeholder="Quiero buscar mi locker en..."></IonSearchbar>
      </IonToolbar>
      <IonContent>
        <LockitMap></LockitMap>
      </IonContent>
    </IonPage>
  );
};

export default Tab3Page;
