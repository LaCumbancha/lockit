import Locker from "./Locker";

export default class LockersBuilder {

    static build(rawData) {
        return rawData.map(field =>
            new Locker(field.id, field.latitude, field.longitude, field.name, field.address, field.price)
        )
    }

}