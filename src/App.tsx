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
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";

localStorage.savedItems = JSON.stringify([
    {id: "1", name: "Mochila de Trabajo", locker: "1", status: "STORED", moveTo: undefined},
    {id: "2", name: "Comida", locker: "3", status: "STORED", moveTo: undefined}
]);

const App: React.FC = () => {
    const isLoggedIn = localStorage.userID? true:false;
    console.log(isLoggedIn)
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/" render={() => <Redirect to="/map"/>} exact={true}/>
                        <Route path="/map" component={MapPage} />
                        <Route path="/lockers" component={LockersPage} exact={true}/>
                        <Route path="/lockers/details" component={Details}/>
                        <Route path="/lockers/move" component={MoveToPage} exact={true}/>
                        <Route path="/checkout" component={CheckoutPage} exact={true}/>
                        {!isLoggedIn ?
                            <Redirect to="/login" from="*"/>
                            :
                            <div/>
                        }
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        {isLoggedIn?
                            (
                                <>
                                <IonTabButton tab="map" href="/map">
                                    <IonIcon icon={map}/>
                                    <IonLabel>Mapa</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="lockers" href="/lockers">
                                    <IonIcon icon={lock}/>
                                    <IonLabel>Mis LockIts</IonLabel>
                                </IonTabButton>
                                </>
                            ):<div/>}
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
}

export default App;
