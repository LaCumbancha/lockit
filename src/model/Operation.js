export default class Operation {

    constructor(type, itemId, price = undefined, lockerToId = undefined, lockerFromId = undefined) {
        this.type = type;
        this.price = price;
        this.itemId = itemId;
        this.lockerToId = lockerToId;
        this.lockerFromId = lockerFromId;
    }

}