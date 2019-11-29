import Operation from "./Operation";

export default class LockersBuilder {

    static build(rawData) {
        let operation = JSON.parse(rawData);
        return new Operation(operation.type, operation.itemId, operation.price, operation.lockerToId, operation.lockerFromId);
    }

}