import View from "./view";
import Controller from "./controller";
import Model from "./model";

export default class Game {
	constructor(options) {
		this.gameContainer = options.gameContainer;
	}

	init() {
		const controller = new Controller({
			view: new View({gameContainer: this.gameContainer}),
			model: new Model,
			gameContainer: this.gameContainer
		});
		controller.init();
	}
}
