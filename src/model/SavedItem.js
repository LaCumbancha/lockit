const LockerStatus = {
    STORED: "STORED",
    MOVING: "MOVING"
};

export default class SavedItem {

    constructor(id, name, locker, status, moveTo = undefined) {
        this.id = id;
        this.name = name;
        this.locker = locker;
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