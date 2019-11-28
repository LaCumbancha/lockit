import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {lock, map} from 'ionicons/icons';
import LockersPage from './pages/LockersPage';
import MapPage from "./pages/MapPage";
import Details from './pages/Details';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MoveToPage from "./pages/MoveToPage";

localStorage.availableLockers = JSON.stringify([
    {id: "1", latitude: -34.618043, longitude: -58.367896, name: "FIUBA", address: "Av. Paseo Colón 850", price: 150},
    {id: "2", latitude: -34.616489, longitude: -58.365291, name: "Starbucks (UCA)", address: "Av. Alicia Moreau de Justo 1604", price: 150},
    {id: "3", latitude: -34.615473, longitude: -58.369561, name: "Che Viejo", address: "Av. Paseo Colón 667", price: 150},
    {id: "4", latitude: -34.620704, longitude: -58.371348, name: "Starbucks (San Telmo)", address: "Defensa 1102", price: 150}
]);

localStorage.savedItems = JSON.stringify([
    {id: "1", name: "Mochila de Trabajo", locker: "1", status: "STORED", moveTo: undefined},
    {id: "2", name: "Comida", locker: "3", status: "STORED", moveTo: undefined}
]);

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/" render={() => <Redirect to="/map"/>} exact={true}/>
                    <Route path="/map" component={MapPage}/>
                    <Route path="/lockers" component={LockersPage} exact={true}/>
                    <Route path="/lockers/details" component={Details}/>
                    <Route path="/lockers/move" component={MoveToPage} exact={true}/>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="map" href="/map">
                        <IonIcon icon={map}/>
                        <IonLabel>Mapa</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="lockers" href="/lockers">
                        <IonIcon icon={lock}/>
                        <IonLabel>Mis LockIts</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
