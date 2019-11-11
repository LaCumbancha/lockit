import React, { Component } from 'react';
import './Bag.css'

type BagProps = {
    name: string,
    location:string
}

export default class Bag extends Component<BagProps> {

    render() {
        return(
            <div className="bag-info">
                <span className="bag-info-main-text">{ this.props.name }</span>
                <span className="bag-info-secondary-text">{ this.props.location }</span>
            </div>
        )
    }
}
