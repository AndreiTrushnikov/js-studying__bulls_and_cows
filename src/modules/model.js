// logic

export default class Model {
    constructor(props) {
        this.minNumber = 1000;
        this.maxNumber = 9999;
    }
    getRandomNumber() {
        return Math.floor(Math.random() * (this.maxNumber - this.minNumber)) + this.minNumber;
    }

    init() {

    }

}