export default class Movement {

    constructor(id, item, lockerFrom, lockerTo, price, status) {
        this.id = id;
        this.item = item;
        this.lockerFrom = lockerFrom;
        this.lockerTo = lockerTo;
        this.price = price;
        this.status = status;
    }

    accept() {
        this.status = "ACCEPTED";
    }

    move() {
        this.status = "MOVING";
    }

    store() {
        this.status = "COMPLETED";
    }

}