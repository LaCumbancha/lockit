import Locker from "./Locker";

export default class StoredLockersBuilder {

    static build(rawData) {
        return JSON.parse(rawData).map(field => new Locker(field.name, field.location, field.status, field.moveTo))
    }

}