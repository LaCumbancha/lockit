import * as firebase from '../services/firebase';
import Movement from "./Movement";

export default class MovementsBuilder {

    static async build(rawData) {

        let availableLockers = await firebase.getAvailableLockers();
        let savedItems = await firebase.getAllSavedItems();
        return rawData.map(field => {
            let item = savedItems.filter(item => { return item.id === field.itemId })[0];
            let lockerFrom = availableLockers.filter(locker => { return locker.id === field.lockerFromId })[0];
            let lockerTo = availableLockers.filter(locker => { return locker.id === field.lockerToId })[0];
            return new Movement(field.id, item, lockerFrom, lockerTo, field.price, field.status, field.clientId, localStorage.userID)
        })
    }

}
