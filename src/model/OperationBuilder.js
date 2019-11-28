import Operation from "./Operation";

export default class LockersBuilder {

    static build(rawData) {
        return JSON.parse(rawData).map(operation =>
            new Operation(operation.type, operation.price, operation.itemId, operation.lockerToId, operation.lockerFromId))
    }

}