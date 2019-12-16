import React, {Component} from "react";
import {IonContent, IonPage} from "@ionic/react";
import {Trans} from "@lingui/react";
import './SettingsPage.css'
import './main.css'

export default class SettingsPage extends Component {

    render() {
        return (
            <IonPage>
                <IonContent>
                    <div>
                        <div className="main-settings">
                            <span className="main-title">
                                <Trans id="Settings.language_title"/>
                            </span>
                        </div>
                        <div className="settings-buttons-holder">
                            <div className="settings-flag-holder" onClick={() => {
                                localStorage.language = "en";
                                window.location.reload();
                            }}>
                                <img src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-800.png"/>
                                EN
                            </div>
                            <div  className="settings-flag-holder" onClick={() => {
                                localStorage.language = "es";
                                window.location.reload();
                            }}>
                                <img src="https://cdn.countryflags.com/thumbs/spain/flag-800.png"/>
                                ES
                            </div>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        )
    }

}