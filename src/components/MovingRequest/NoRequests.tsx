import React, {Component} from "react";
import {Trans} from "@lingui/react";

export default class NoRequests extends Component {

    render() {
        const neutralFace = "/assets/neutral-face.png";
        return(
            <div className="no-requests-item">
                <img className="no-requests-image" src={neutralFace} alt={""}/>
                <div><span className="no-requests-title"><Trans id="NoRequests.title">¡Lo sentimos!</Trans></span></div>
                <div>
                    <span className="no-requests-text">
                        <Trans id="NoRequests.text">En estos momentos no hay ningún pedido de traslado en tu zona. ¡Inténtalo de nuevo más tarde!</Trans>
                    </span>
                </div>
            </div>
        )
    }
}
