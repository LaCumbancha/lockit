import SavedItem from "./SavedItem";
import * as firebase from '../services/firebase';

export default class SavedItemsBuilder {

    static async build(rawData) {

        let availableLockers = await firebase.getAvailableLockers();
        return rawData.map(field => {
            let locker = availableLockers.filter(locker => {
            	return locker.id === field.locker;
            })[0];
            return new SavedItem(field.id, field.name, locker, field.status, field.moveTo)
        })
    }

}