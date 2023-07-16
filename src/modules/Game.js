import View from "./view";
import Controller from "./controller";
import Model from "./model";

export default class Game {
	constructor(options) {
		this.gameContainer = options.gameContainer;
		this.lengthOfSecretNumber = 4;
	}

	init() {
		const controller = new Controller({
			view: new View({
				gameContainer: this.gameContainer,
				lengthOfSecretNumber: this.lengthOfSecretNumber
			}),
			model: new Model({
				gameContainer: this.gameContainer,
				lengthOfSecretNumber: this.lengthOfSecretNumber
			}),
			gameContainer: this.gameContainer,
			lengthOfSecretNumber: this.lengthOfSecretNumber
		});
		controller.init();
	}
}
