import View from "./view";

export default class Game {
	constructor(options) {
		this.options = options;
	}

	init() {
		new View({gameContainer: this.options.gameContainer}).init();
	}
}
