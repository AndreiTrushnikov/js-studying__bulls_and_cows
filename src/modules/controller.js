// listeners

import Model from "./model";

export default class Controller {
    constructor() {
    }

    init() {
        new Model().init();
    }
}