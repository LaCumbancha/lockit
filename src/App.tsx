import React, {useState} from 'react';
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
import TransportPage from "./pages/TransportPage";
import SettingsPage from "./pages/SettingsPage";
import { setupI18n } from "@lingui/core";
import {I18nProvider, Trans} from '@lingui/react';
import catalogEn from './locale/en/messages';
import catalogEs from './locale/es/messages';

const App: React.FC = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.userID);
    const [isLockitender, setIsLockitender] = useState(localStorage.type === "LOCKITENDERO");
    let language = localStorage.getItem("language") || "es";
    let i18n = setupI18n({ language: language, catalogs: {en: catalogEn, es: catalogEs} });
    //let isLoggedIn = localStorage.userID? true:false;
    //loggedIn it's fired when the user log in in the app
    window.addEventListener('loggedIn', (_: any) => {
        setIsLoggedIn(!!localStorage.userID);
        setIsLockitender(localStorage.type === "LOCKITENDERO");
    });
    return (
        <I18nProvider language="en" i18n={i18n}>
            <IonApp>
                <IonReactRouter>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route path="/login" component={LoginPage}/>
                            <Route path="/" render={() => <Redirect to="/map"/>} exact={true}/>
                            <Route path="/map" component={MapPage}/>
                            <Route path="/lockers" component={LockersPage} exact={true}/>
                            <Route path="/transport" component={TransportPage} exact={true}/>
                            <Route path="/lockers/details" component={Details}/>
                            <Route path="/lockers/move" component={MoveToPage} exact={true}/>
                            <Route path="/checkout" component={CheckoutPage} exact={true}/>
                            <Route path="/settings" component={SettingsPage} exact={true}/>
                            {!isLoggedIn ?
                                <Redirect to="/login" from="*"/>
                                :
                                <div/>
                            }
                        </IonRouterOutlet>
                        {/* BUG: https://github.com/ionic-team/ionic/issues/18553 */}
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="map" href="/map" style={!isLoggedIn ? {visibility: "hidden"} : {}}>
                                <IonIcon icon={map}/>
                                <IonLabel><Trans id="App.map_tab">Mapa</Trans></IonLabel>
                            </IonTabButton>
                            {isLockitender ?
                                <IonTabButton tab="lockers" href="/transport"
                                              style={!isLoggedIn ? {visibility: "hidden"} : {}}>
                                    <IonIcon icon={lock}/>
                                    <IonLabel><Trans id="App.orders_tab">Pedidos</Trans></IonLabel>
                                </IonTabButton>
                                :
                                <IonTabButton tab="lockers" href="/lockers"
                                              style={!isLoggedIn ? {visibility: "hidden"} : {}}>
                                    <IonIcon icon={lock}/>
                                    <IonLabel><Trans id="App.lockit_tab">Mis LockIts</Trans></IonLabel>
                                </IonTabButton>
                            }
                        </IonTabBar>
                    </IonTabs>
                </IonReactRouter>
            </IonApp>
        </I18nProvider>
    );
};

export default App;
