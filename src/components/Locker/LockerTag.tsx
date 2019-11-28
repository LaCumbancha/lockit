import React, {Component} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './LockerTag.css'

type LockerProps = {
    id: String,
    name: String,
    address: String,
    price: String
}

class LockerTag extends Component<RouteComponentProps<{}> & LockerProps> {

    render() {
        return (
            <div className='locker-info'>
                <div className="locker-info-main">
                    <span className="locker-info-main-text">{this.props.name}</span>
                    <span className="locker-info-secondary-text">{this.props.address}</span>
                </div>
                <div className="locker-info-transport">
                    <div className="locker-info-transport-move-to">
                        <span className="locker-info-transport-move-to-text">MOVER</span>
                    </div>
                    <span className="bag-info-price-text">Precio: {this.props.price}</span>
                </div>
            </div>
        )
    }
}

export default withRouter(LockerTag)