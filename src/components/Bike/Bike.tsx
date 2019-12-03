import React, {Component} from "react";
import BikeIcon from "./BikeIcon";
import {Marker} from "react-map-gl";

type BikeProps = {
    pathId: string
}

export default class Bike extends Component<BikeProps> {

    constructor({props}: { props: any }) {
        super(props);
        this.setState({
            coordinates: this.generateCoordinates(this.props.pathId)
        })
    }
    animation = null;

    state = {
        currentIndex: 0,
        nextIteration: null,
        coordinates: [],
        longitude: 0,
        latitude: 0
    };

    generateCoordinates(pathId: string) {
        // Generate full coordinates for the given street corners
        let coordinates = [];
        // @ts-ignore
        let pairs = this.coordinatesMap[pathId];
        let intervals = 30;
        for (let i = 0; i < pairs.length; i++) {
            let pair = pairs[i];
            // Coordinates
            let x1 = pair[0][0];
            let y1 = pair[0][1];
            let x2 = pair[1][0];
            let y2 = pair[1][1];
            // Deltas
            let dx = x2 - x1;
            let dy = y2 - y1;
            // Current position
            let cx = x1;
            let cy = y1;
            // Generate intervals
            for (let j = 0; j < intervals; j++) {
                cx = cx + dx / intervals;
                cy = cy + dy / intervals;
                coordinates.push([cx, cy])
            }
        }
        return coordinates;
    };

    componentDidMount() {
        this._animate();
    }
    componentWillUnmount() {
        // @ts-ignore
        window.cancelAnimationFrame(this.animation);
    }

    _animate = () => {
        // @ts-ignore
        this.animation = window.requestAnimationFrame(this._animate);
        if (this.state.currentIndex >= this.state.coordinates.length) return;
        let longitude = this.state.coordinates[this.state.currentIndex][0];
        let latitude = this.state.coordinates[this.state.currentIndex][1];
        // @ts-ignore
        if (this.state.nextIteration == null || this.state.nextIteration.getTime() < Date.now()) {
            if (this.state.nextIteration != null) {
                let newDate = new Date();
                // @ts-ignore
                let sumValue = Math.ceil(Math.abs(newDate.getTime() - this.state.nextIteration.getTime()) / 1000);
                this.setState({
                    currentBikeIndex: this.state.currentIndex + sumValue
                })
            }
            let currentDate = new Date();
            currentDate.setSeconds(currentDate.getSeconds() + 1);
            this.setState({
                nextBikeIteration: currentDate
            });
        }
        this.setState({
            longitude: longitude,
            latitude: latitude
        });
    };

    render() {
        return (<>
            <Marker longitude={this.state.longitude} latitude={this.state.latitude}>
                <BikeIcon/>
            </Marker>
        </>)
    }

    coordinatesMap = {
        "0-1": [
            [[-58.370602, -34.620659], [-58.369766, -34.620635]],
            [[-58.369766, -34.620635], [-58.368768, -34.620589]],
            [[-58.368768, -34.620589], [-58.368545, -34.620293]],
            [[-58.368545, -34.620293], [-58.368569, -34.619631]],
            [[-58.368569, -34.619631], [-58.368526, -34.618607]],
            [[-58.368526, -34.618607], [-58.368384, -34.618077]],
            [[-58.368384, -34.618077], [-58.368094, -34.617644]],
            [[-58.368094, -34.617644], [-58.367952, -34.617898]]
        ],
        "1-0": [],
        "1-2": [],
        "1-3": []
    }
}