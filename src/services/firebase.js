import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBDAVUdsWScuRa20pAA7cSYXk-K8Zp_kLs",
    authDomain: "lockit-tdp1.firebaseapp.com",
    databaseURL: "https://lockit-tdp1.firebaseio.com",
    projectId: "lockit-tdp1",
    storageBucket: "lockit-tdp1.appspot.com",
    messagingSenderId: "351929988099",
    appId: "1:351929988099:web:db76b9c5c95b7d2fc48a36",
    measurementId: "G-2R1B6QTBRV"
};

firebase.initializeApp(config);

export async function getBikeCoordinates(objectId) {
    const snapshot = await firebase.firestore().doc("bikeCoordinates/" + objectId).get();
    return JSON.parse(snapshot.data().coord);
}

/*localStorage.availableLockers = JSON.stringify([
    {id: "1", latitude: -34.618043, longitude: -58.367896, name: "FIUBA", address: "Av. Paseo Colón 850", price: 150},
    {id: "2", latitude: -34.616489, longitude: -58.365291, name: "Starbucks (UCA)", address: "Av. Alicia Moreau de Justo 1604", price: 150},
    {id: "3", latitude: -34.615473, longitude: -58.369561, name: "Che Viejo", address: "Av. Paseo Colón 667", price: 150},
    {id: "4", latitude: -34.620704, longitude: -58.371348, name: "Starbucks", address: "Defensa 1102", price: 150}
]);*/
export async function getAvailableLockers() {
    const snapshot = await firebase.firestore().collection('availableLockers').get();
    return snapshot.docs.map(doc => doc.data());
}

export function setLocker(locker) {
    let saveItem = Object.assign({}, locker);
    firebase.firestore().doc('availableLockers/' + locker.id).set(saveItem);
}

/*localStorage.savedItems = JSON.stringify([
    {id: "1", name: "Mochila de Trabajo", locker: "1", status: "STORED", moveTo: undefined},
    {id: "2", name: "Comida", locker: "3", status: "STORED", moveTo: undefined}
]);*/
export async function getSavedItemsByUserId(userID) {
    const snapshot = await firebase.firestore()
        .collection('savedItems')
        .where("userId", "==", userID).get();
    return snapshot.docs.map(doc => doc.data());
}

export async function getSavedItemsById(id) {
    const snapshot = await firebase.firestore()
        .collection('savedItems')
        .where("id", "==", id).get();
    return snapshot.docs.map(doc => doc.data());
}

export async function getAllSavedItems() {
    const snapshot = await firebase.firestore()
        .collection('savedItems').get();
    return snapshot.docs.map(doc => doc.data());
}

export function setSavedItem(item) {
    let saveItem = Object.assign({}, item);
    console.log(item)
    saveItem.locker = item.locker.id;
    console.log(saveItem)
    firebase.firestore().doc('savedItems/' + saveItem.id).set(saveItem);
}

export async function getMovingRequests() {
    const snapshot = await firebase.firestore()
        .collection('movingRequests').get();
    return snapshot.docs.map(doc => doc.data());
}

export function setMovingRequest(movingRequest, userKey) {
    if (userKey) {
        let request = createMovingRequest(movingRequest, {clientId: localStorage.userID});
        firebase.firestore().doc('movingRequests/' + movingRequest.id).set(request);

    } else {
        let request = createMovingRequest(movingRequest, {lockitenderoId: localStorage.userID});
        firebase.firestore().doc('movingRequests/' + movingRequest.id).update(request);
    }
}

const createMovingRequest = (movingRequest, request) => {
    return Object.assign({
        id: movingRequest.id,
        itemId: movingRequest.item.id,
        lockerFromId: movingRequest.lockerFrom.id,
        lockerToId: movingRequest.lockerTo.id,
        price: movingRequest.price,
        status: movingRequest.status,
    }, request);
};

export function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function saveToken(userId, token) {
    //firebase.database().ref('tokens/client').set({token: token});
    firebase.firestore().doc('tokens/' + userId).set({token: token, type: localStorage.type});
}

export function readyToMoveNotification() {
    let saveItem = JSON.parse(localStorage.readyToMoveInfo);
    firebase.database().ref('readyToMoveNotification/'+saveItem.id).set(saveItem);
}

export function movementAcceptNotification(movement) {
    let suffix = `${movement.lockitenderoId}/${movement.clientId}`;
    firebase.database().ref('movementAcceptedNotification/'+suffix).set(movement);
}

export function movementWithdrawnNotification(movement) {
    firebase.database().ref('movementWithdrawnNotification/'+movement.id).set(movement);
}

export function movementDoneNotification(movement) {
    firebase.database().ref('movementDoneNotification/'+movement.id).set(movement);
}
