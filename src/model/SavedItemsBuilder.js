import SavedItem from "./SavedItem";

export default class SavedItemsBuilder {

    static build(rawData) {
        return JSON.parse(rawData).map(field => {
            let locker = JSON.parse(localStorage.availableLockers).filter(locker => locker.id === field.locker)[0];
            return new SavedItem(field.id, field.name, locker, field.status, field.moveTo)
        })
    }

}