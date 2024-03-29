/* global window */
import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {IonIcon, IonTabButton, IonToast} from '@ionic/react';

import MapGL, {Source, Layer, Marker} from 'react-map-gl';

import './Map.css';

import Pin from './Pin';
import BikeIcon from "../Bike/BikeIcon";
import LockerPin from './locker/LockerPin';

import * as firebase from '../../services/firebase';
import Operation from "../../model/Operation";
import {alarm, bicycle} from "ionicons/icons";
import SavedItemsBuilder from "../../model/SavedItemsBuilder";
import Movement from "../../model/Movement";
import {Plugins} from "@capacitor/core";
const { PushNotifications } = Plugins;


const MAPBOX_TOKEN = 'pk.eyJ1IjoianVhbnphcmFnb3phZ2NiYSIsImEiOiJjanJqaG5hc2UwMGJ3M3lwODlmZTI4NjAwIn0.sTM1hm0HAjSmcg3FfSBsHA'; // Set your mapbox token here
const ICONS_SIZE = 48;

const pointLayer = {
    type: 'circle',
    paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf'
    }
};

class Map extends Component {
    /*bikeCoordinates = [
        [-58.370574133333335, -34.6206582],
        [-58.370546266666665, -34.6206574],
        [-58.370518399999995, -34.6206566],
        [-58.370490533333324, -34.620655799999994],
        [-58.370462666666654, -34.62065499999999],
        [-58.370434799999984, -34.62065419999999],
        [-58.370406933333314, -34.62065339999999],
        [-58.37037906666664, -34.620652599999985],
        [-58.37035119999997, -34.62065179999998],
        [-58.3703233333333, -34.62065099999998],
        [-58.37029546666663, -34.62065019999998],
        [-58.37026759999996, -34.62064939999998],
        [-58.37023973333329, -34.620648599999974],
        [-58.37021186666662, -34.62064779999997],
        [-58.37018399999995, -34.62064699999997],
        [-58.37015613333328, -34.62064619999997],
        [-58.37012826666661, -34.620645399999965],
        [-58.37010039999994, -34.62064459999996],
        [-58.37007253333327, -34.62064379999996],
        [-58.3700446666666, -34.62064299999996],
        [-58.37001679999993, -34.620642199999956],
        [-58.36998893333326, -34.620641399999954],
        [-58.36996106666659, -34.62064059999995],
        [-58.36993319999992, -34.62063979999995],
        [-58.36990533333325, -34.62063899999995],
        [-58.36987746666658, -34.620638199999945],
        [-58.36984959999991, -34.62063739999994],
        [-58.36982173333324, -34.62063659999994],
        [-58.36979386666657, -34.62063579999994],
        [-58.3697659999999, -34.620634999999936],
        [-58.36973273333333, -34.62063346666667],
        [-58.36969946666666, -34.620631933333335],
        [-58.36966619999999, -34.6206304],
        [-58.36963293333332, -34.62062886666667],
        [-58.36959966666665, -34.62062733333334],
        [-58.36956639999998, -34.620625800000006],
        [-58.36953313333331, -34.620624266666674],
        [-58.369499866666644, -34.62062273333334],
        [-58.369466599999974, -34.62062120000001],
        [-58.369433333333305, -34.62061966666668],
        [-58.369400066666635, -34.620618133333345],
        [-58.369366799999966, -34.62061660000001],
        [-58.3693335333333, -34.62061506666668],
        [-58.36930026666663, -34.62061353333335],
        [-58.36926699999996, -34.620612000000015],
        [-58.36923373333329, -34.62061046666668],
        [-58.36920046666662, -34.62060893333335],
        [-58.36916719999995, -34.62060740000002],
        [-58.36913393333328, -34.620605866666686],
        [-58.36910066666661, -34.620604333333354],
        [-58.36906739999994, -34.62060280000002],
        [-58.36903413333327, -34.62060126666669],
        [-58.3690008666666, -34.62059973333336],
        [-58.368967599999934, -34.620598200000025],
        [-58.368934333333264, -34.62059666666669],
        [-58.368901066666595, -34.62059513333336],
        [-58.368867799999926, -34.62059360000003],
        [-58.368834533333256, -34.620592066666696],
        [-58.36880126666659, -34.62059053333336],
        [-58.36876799999992, -34.62058900000003],
        [-58.36876056666667, -34.62057913333334],
        [-58.36875313333334, -34.62056926666667],
        [-58.36874570000001, -34.620559400000005],
        [-58.36873826666668, -34.62054953333334],
        [-58.36873083333335, -34.62053966666667],
        [-58.36872340000002, -34.62052980000001],
        [-58.36871596666669, -34.62051993333334],
        [-58.36870853333336, -34.620510066666675],
        [-58.36870110000003, -34.62050020000001],
        [-58.3686936666667, -34.62049033333334],
        [-58.36868623333337, -34.62048046666668],
        [-58.36867880000004, -34.62047060000001],
        [-58.36867136666671, -34.620460733333346],
        [-58.36866393333338, -34.62045086666668],
        [-58.36865650000005, -34.620441000000014],
        [-58.36864906666672, -34.62043113333335],
        [-58.36864163333339, -34.62042126666668],
        [-58.36863420000006, -34.620411400000016],
        [-58.36862676666673, -34.62040153333335],
        [-58.3686193333334, -34.620391666666684],
        [-58.36861190000007, -34.62038180000002],
        [-58.36860446666674, -34.62037193333335],
        [-58.36859703333341, -34.62036206666669],
        [-58.36858960000008, -34.62035220000002],
        [-58.36858216666675, -34.620342333333355],
        [-58.36857473333342, -34.62033246666669],
        [-58.36856730000009, -34.62032260000002],
        [-58.36855986666676, -34.62031273333336],
        [-58.36855243333343, -34.62030286666669],
        [-58.3685450000001, -34.620293000000025],
        [-58.3685458, -34.62027093333333],
        [-58.3685466, -34.620248866666664],
        [-58.368547400000004, -34.6202268],
        [-58.368548200000006, -34.62020473333333],
        [-58.36854900000001, -34.620182666666665],
        [-58.36854980000001, -34.6201606],
        [-58.36855060000001, -34.62013853333333],
        [-58.368551400000015, -34.620116466666666],
        [-58.36855220000002, -34.6200944],
        [-58.36855300000002, -34.62007233333333],
        [-58.36855380000002, -34.62005026666667],
        [-58.368554600000024, -34.6200282],
        [-58.36855540000003, -34.620006133333334],
        [-58.36855620000003, -34.61998406666667],
        [-58.36855700000003, -34.619962],
        [-58.36855780000003, -34.619939933333335],
        [-58.368558600000036, -34.61991786666667],
        [-58.36855940000004, -34.6198958],
        [-58.36856020000004, -34.619873733333336],
        [-58.36856100000004, -34.61985166666667],
        [-58.368561800000045, -34.6198296],
        [-58.36856260000005, -34.619807533333336],
        [-58.36856340000005, -34.61978546666667],
        [-58.36856420000005, -34.619763400000004],
        [-58.36856500000005, -34.61974133333334],
        [-58.368565800000056, -34.61971926666667],
        [-58.36856660000006, -34.619697200000004],
        [-58.36856740000006, -34.61967513333334],
        [-58.36856820000006, -34.61965306666667],
        [-58.368569000000065, -34.619631000000005],
        [-58.36856756666667, -34.61959686666666],
        [-58.36856613333334, -34.619562733333325],
        [-58.36856470000001, -34.61952859999999],
        [-58.368563266666676, -34.61949446666665],
        [-58.368561833333345, -34.619460333333315],
        [-58.368560400000014, -34.61942619999998],
        [-58.36855896666668, -34.61939206666664],
        [-58.36855753333335, -34.619357933333305],
        [-58.36855610000002, -34.61932379999997],
        [-58.36855466666669, -34.61928966666663],
        [-58.36855323333336, -34.619255533333295],
        [-58.36855180000003, -34.61922139999996],
        [-58.368550366666696, -34.61918726666662],
        [-58.368548933333365, -34.619153133333285],
        [-58.368547500000034, -34.61911899999995],
        [-58.3685460666667, -34.61908486666661],
        [-58.36854463333337, -34.619050733333275],
        [-58.36854320000004, -34.61901659999994],
        [-58.36854176666671, -34.6189824666666],
        [-58.36854033333338, -34.618948333333265],
        [-58.36853890000005, -34.61891419999993],
        [-58.368537466666716, -34.61888006666659],
        [-58.368536033333385, -34.618845933333255],
        [-58.368534600000054, -34.61881179999992],
        [-58.36853316666672, -34.61877766666658],
        [-58.36853173333339, -34.618743533333244],
        [-58.36853030000006, -34.61870939999991],
        [-58.36852886666673, -34.61867526666657],
        [-58.3685274333334, -34.618641133333234],
        [-58.36852600000007, -34.6186069999999],
        [-58.36852126666667, -34.61858933333333],
        [-58.368516533333334, -34.61857166666667],
        [-58.3685118, -34.618554],
        [-58.368507066666666, -34.61853633333334],
        [-58.36850233333333, -34.618518666666674],
        [-58.3684976, -34.61850100000001],
        [-58.368492866666664, -34.618483333333344],
        [-58.36848813333333, -34.61846566666668],
        [-58.368483399999995, -34.618448000000015],
        [-58.36847866666666, -34.61843033333335],
        [-58.36847393333333, -34.618412666666686],
        [-58.36846919999999, -34.61839500000002],
        [-58.36846446666666, -34.618377333333356],
        [-58.368459733333324, -34.61835966666669],
        [-58.36845499999999, -34.61834200000003],
        [-58.368450266666656, -34.61832433333336],
        [-58.36844553333332, -34.6183066666667],
        [-58.36844079999999, -34.61828900000003],
        [-58.36843606666665, -34.61827133333337],
        [-58.36843133333332, -34.6182536666667],
        [-58.368426599999985, -34.61823600000004],
        [-58.36842186666665, -34.618218333333374],
        [-58.36841713333332, -34.61820066666671],
        [-58.36841239999998, -34.618183000000045],
        [-58.36840766666665, -34.61816533333338],
        [-58.368402933333314, -34.618147666666715],
        [-58.36839819999998, -34.61813000000005],
        [-58.368393466666646, -34.618112333333386],
        [-58.36838873333331, -34.61809466666672],
        [-58.36838399999998, -34.618077000000056],
        [-58.368374333333335, -34.618062566666666],
        [-58.36836466666667, -34.61804813333333],
        [-58.36835500000001, -34.6180337],
        [-58.368345333333345, -34.618019266666664],
        [-58.36833566666668, -34.61800483333333],
        [-58.36832600000002, -34.6179904],
        [-58.368316333333354, -34.61797596666666],
        [-58.36830666666669, -34.61796153333333],
        [-58.36829700000003, -34.617947099999995],
        [-58.36828733333336, -34.61793266666666],
        [-58.3682776666667, -34.61791823333333],
        [-58.368268000000036, -34.61790379999999],
        [-58.36825833333337, -34.61788936666666],
        [-58.36824866666671, -34.617874933333326],
        [-58.368239000000045, -34.61786049999999],
        [-58.36822933333338, -34.61784606666666],
        [-58.36821966666672, -34.617831633333324],
        [-58.368210000000055, -34.61781719999999],
        [-58.36820033333339, -34.61780276666666],
        [-58.36819066666673, -34.61778833333332],
        [-58.368181000000064, -34.61777389999999],
        [-58.3681713333334, -34.617759466666655],
        [-58.36816166666674, -34.61774503333332],
        [-58.36815200000007, -34.61773059999999],
        [-58.36814233333341, -34.61771616666665],
        [-58.368132666666746, -34.61770173333332],
        [-58.36812300000008, -34.617687299999986],
        [-58.36811333333342, -34.61767286666665],
        [-58.368103666666755, -34.61765843333332],
        [-58.36809400000009, -34.617643999999984],
        [-58.368089266666665, -34.61765246666666],
        [-58.36808453333333, -34.617660933333326],
        [-58.3680798, -34.61766939999999],
        [-58.36807506666666, -34.617677866666654],
        [-58.36807033333333, -34.61768633333332],
        [-58.368065599999994, -34.61769479999998],
        [-58.36806086666666, -34.617703266666645],
        [-58.368056133333326, -34.61771173333331],
        [-58.36805139999999, -34.61772019999997],
        [-58.36804666666666, -34.617728666666636],
        [-58.36804193333332, -34.6177371333333],
        [-58.36803719999999, -34.617745599999964],
        [-58.368032466666655, -34.61775406666663],
        [-58.36802773333332, -34.61776253333329],
        [-58.36802299999999, -34.617770999999955],
        [-58.36801826666665, -34.61777946666662],
        [-58.36801353333332, -34.61778793333328],
        [-58.368008799999984, -34.617796399999946],
        [-58.36800406666665, -34.61780486666661],
        [-58.367999333333316, -34.617813333333274],
        [-58.36799459999998, -34.61782179999994],
        [-58.36798986666665, -34.6178302666666],
        [-58.36798513333331, -34.617838733333265],
        [-58.36798039999998, -34.61784719999993],
        [-58.367975666666645, -34.61785566666659],
        [-58.36797093333331, -34.617864133333256],
        [-58.36796619999998, -34.61787259999992],
        [-58.36796146666664, -34.617881066666584],
        [-58.36795673333331, -34.61788953333325],
        [-58.367951999999974, -34.61789799999991]
    ];*/
    state = {
        bikeCoordinates: [],
        currentBikeIndex: 0,
        nextBikeIteration: null,
        bikeMoving: false,
        fromTo: "",
        pointData: null,
        bikeData: null,
        viewport: {
            latitude: -34.618043,
            longitude: -58.367896,
            zoom: 15,
            bearing: 0,
            pitch: 0
        },
        currentLocation: {
            latitude: -34.617243,
            longitude: -58.367996
        },
        lockers: [],
        checkout: {
            lockerName: "",
            lockerLocation: "",
            show: false
        },
        showToast: false,
        savedItems: [],
        notifications: [{ id: 'id', title: "Test Push", body: "This is my first push notification" }]
    };

    componentDidMount() {
        this._animateBike();

        firebase.getAllSavedItems().then(
            res => {
                SavedItemsBuilder.build(res).then(items => {
                    this.setState({
                        savedItems: items
                    });
                })
            },
            err => console.log(err));
        /*
        Esto no lo borro porque me sirve de ejemplo para otras cosas,
        pero no se esta utilizando
        */
        /*const map = this.reactMap.getMap();

        map.on('style.load', () => {
            //add the GeoJSON layer here
            map.addLayer({
                "id": "route",
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": this.bikeCoordinates
                        }
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "#f3601a",
                    "line-width": 4
                }
            })
        })*/

        // TODO: borrar pero es un ejemplo para traer datos de firebase
        firebase.getAvailableLockers().then(
            res => {
                this.setState({lockers: res})
            },
            err => console.log(err));

        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();

        // On succcess, we should be able to receive notifications
        PushNotifications.addListener('registration',
            (token) => {
                firebase.saveToken(localStorage.type, token.value);
            }
        );

        // Some issue with your setup and push will not work
        PushNotifications.addListener('registrationError',
            (error) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification) => {
                alert(`${notification.title}`);
                // @ts-ignore
                let notif = this.state.notifications;
                // @ts-ignore
                notif.push({ id: notification.id, title: notification.title, body: notification.body });
                // @ts-ignore
                this.setState({
                    notifications: notif
                });
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification) => {
                // @ts-ignore
                let notif = this.state.notifications;
                notif.push({
                    id: notification.notification.data.id,
                    title: notification.notification.data.title,
                    body: notification.notification.data.body
                });
                // @ts-ignore
                this.setState({
                    notifications: notif
                })
            }
        );

    }


    componentWillUnmount() {
        window.cancelAnimationFrame(this.animation);
        localStorage.removeItem('moving');
    }

    componentWillReceiveProps() {
        /* Si le pasamos cualquier query param => se tiene que mover la bici*/
        /*TODO: esto es el unico modo de reemplazar redux central. Cambiar!!*/
        this.setState({
            bikeMoving: this.props.location.search || localStorage.moving ? true : false
        });

        if(localStorage.moving){
            firebase.getBikeCoordinates(localStorage.moving).then(
                res => {
                    this.setState({bikeCoordinates: res});
                },
                err => console.log(err));
        }
        else if(this.props.location.search){
            const query = new URLSearchParams(this.props.location.search);
            const moving = query.get('moving');
            firebase.getBikeCoordinates(moving).then(
                res => {
                    this.setState({bikeCoordinates: res});
                },
                err => console.log(err));
        }
    }

    animation = null;
    reactMap = null;

    _animateBike = () => {
        this.animation = window.requestAnimationFrame(this._animateBike);
        if (!this.state.bikeMoving) return;
        if (this.state.currentBikeIndex >= this.state.bikeCoordinates.length) return;
        let longitude = this.state.bikeCoordinates[this.state.currentBikeIndex][0];
        let latitude = this.state.bikeCoordinates[this.state.currentBikeIndex][1];
        if (this.state.nextBikeIteration == null || this.state.nextBikeIteration.getTime() < Date.now()) {
            if (this.state.nextBikeIteration != null) {
                let newDate = new Date();
                let sumValue = Math.ceil(Math.abs(newDate.getTime() - this.state.nextBikeIteration.getTime()) / 1000);
                this.setState({
                    currentBikeIndex: this.state.currentBikeIndex + sumValue
                })
            }
            let currentDate = new Date();
            currentDate.setSeconds(currentDate.getSeconds() + 1);
            this.setState({
                nextBikeIteration: currentDate
            });
        }
        this.setState({
            bikeData: {
                longitude: longitude,
                latitude: latitude
            }
        });
    }

    _onViewportChange = viewport => this.setState({viewport});

    _renderMyPositionMarker = () => {
        const {currentLocation} = this.state;
        return (
            <Marker
                longitude={currentLocation.longitude}
                latitude={currentLocation.latitude}
                offsetTop={-20}
                offsetLeft={-10}
            >
                <Pin size={ICONS_SIZE}/>
            </Marker>
        );
    };

    _renderLockerMarker = (locker, index) => {
        const defaultValue = !this.state.savedItems.some(item => item.locker !== undefined && item.locker.id === locker.id);
        return (
            <Marker key={`marker-${index}`} longitude={locker.longitude} latitude={locker.latitude}>
                <LockerPin id={locker.id} size={ICONS_SIZE} lockerName={locker.name} lockerAddress={locker.address}
                           lockerPrice={locker.price} onRequestBooking={this._onRequestBooking.bind(this)}
                           taken={locker.taken} defaultValue={defaultValue}/>
            </Marker>
        );
    };

    _onRequestBooking(info) {
        //TODO: refactor
        localStorage.operation = JSON.stringify(new Operation("STORED", "id que no me importa", info.lockerPrice, "", info.lockerId));
        this.state.lockers.filter((value,index)=>{
            if(value.id === info.lockerId){
                value.taken = true;
                localStorage.readyToMoveInfo = JSON.stringify(value);
            }
        });
        this.setState({
            checkout: {
                lockerName: info.lockerName,
                lockerLocation: info.lockerLocation,
                show: true
            }
        })
    }

    _changeBagLocation = (bagName, lockerName) => {
        this.setState({
            checkout: {
                lockerName: "",
                lockerLocation: "",
                show: false
            },
            showToast: true
        })
    };

    render() {
        const {
            viewport,
            pointData,
            lockers,
            bikeData,
            checkout,
            showToast
        } = this.state;

        return (
            <>
                {checkout.show ?
                    <Redirect to="/checkout"/>
                    :
                    <MapGL
                        {...viewport}
                        width="100%"
                        height="100%"
                        mapStyle="mapbox://styles/mapbox/light-v9"
                        onViewportChange={this._onViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                        ref={(reactMap) => this.reactMap = reactMap}
                    >
                        {pointData && (
                            <Source type="geojson" data={pointData}>
                                <Layer {...pointLayer} />
                            </Source>
                        )}
                        {/* Bike position when it's moving */}
                        {bikeData && (
                            <Marker longitude={bikeData.longitude} latitude={bikeData.latitude}> <BikeIcon
                                size={ICONS_SIZE}/>
                            </Marker>
                        )}
                        {/* My position */}
                        {this._renderMyPositionMarker()}
                        {/* Lockits position */}
                        {lockers.map(this._renderLockerMarker)}
                    </MapGL>
                }
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => this.setState({showToast: false})}
                    message={localStorage.language === "en" ? "You will see your order in your LockIt list in a moment." :"En momentos verá pedido en su lista de lockits."}
                    position="bottom"
                    buttons={[
                        {
                            text: 'OK',
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                            }
                        }
                    ]}
                    duration={5000}
                    color={"success"}
                />
            </>
        );
    }
}

export default withRouter(Map);
