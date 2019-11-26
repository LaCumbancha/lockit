const MAX_LOCKERS = 5;

const LockerStatus = {
    STORED: "STORED",
    MOVING: "MOVING"
};

export default class Locker {

    constructor(name, location, status, moveTo = undefined) {
        this.name = name;
        this.location = location;
        this.status = status;
        this.moveTo = moveTo;
    }

    move(moveTo) {
        this.status = LockerStatus.MOVING;
        this.moveTo = moveTo;
    }

    isMoving() {
        return this.status === LockerStatus.MOVING;
    }

    moveFinished() {
        this.status = LockerStatus.STORED;
        delete this.moveTo;
    }

}