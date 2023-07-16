// listeners

import View from "./view";
import Model from "./model";

export default class Controller {
    constructor({view, model, gameContainer, lengthOfSecretNumber}) {
        this.view = view;
        this.model = model;
        this.gameContainer = gameContainer;
        this._userNumbers = [];
        this.lengthOfSecretNumber = lengthOfSecretNumber;
        this.view.init();

        this.inputBlocks = this.gameContainer.querySelectorAll('[data-place]');
        if (!this.inputBlocks) throw new Error('Не найдены блоки для ввода чисел');

        this.submitBtn = this.gameContainer.querySelector('[data-submit-btn]');
        if (!this.submitBtn) throw new Error('Не найдена кнопка отправки данных');

        this.newGameBtn = this.gameContainer.querySelector('[data-new-game-btn]');
        if (!this.submitBtn) throw new Error('Не найдена кнопка начала новой игры');
    }

    addEventListeners() {
        this.inputBlocks.forEach(block => {
            block.addEventListener('click', (e) => {
                if (e.target.dataset.action === 'plus') {
                    this.model.increase(e);
                }
                if (e.target.dataset.action === 'minus') {
                    this.model.decrease(e);
                }
            })
        })

        this.submitBtn.addEventListener('click', (e) => this.handleSubmitUserNumbers())
        this.newGameBtn.addEventListener('click', (e) => this.handleStartNewGame())
    }

    handleSubmitUserNumbers() {
        this.inputBlocks.forEach(block => {
            this._userNumbers.push(+block.querySelector('input').value);
        })

        if (this.gameContainer.querySelector('#error')) {
            this.gameContainer.querySelector('#error').remove();
        }

        this.model.checkNumbers(this._userNumbers)
            .then((data) => {
                this.view.drawUserNumbersLine(data);
                if (data.winner) {
                    this.toggleButtons();
                }
                this._userNumbers = [];
            });
    }

    handleStartNewGame() {
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

    toggleButtons() {
        this.submitBtn.classList.toggle('d-none');
        this.newGameBtn .classList.toggle('d-none');
    }


    init() {
        this.addEventListeners();
        this.model.init();
    }
}