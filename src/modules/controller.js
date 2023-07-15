// listeners

export default class Controller {
    constructor({view, model, gameContainer}) {
        this.view = view;
        this.model = model;
        this.gameContainer = gameContainer;
        this._userNumbers = [];

        this.view.init();

        this.inputBlocks = this.gameContainer.querySelectorAll('[data-place]');
        if (!this.inputBlocks) throw new Error('Не найдены блоки для ввода чисел');

        this.submitBtn = this.gameContainer.querySelector('[data-submit-btn]');
        if (!this.submitBtn) throw new Error('Не найдена кнопка отправки данных');
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

        this.submitBtn.addEventListener('click', (e) => {
            this.inputBlocks.forEach(block => {
                this._userNumbers.push(+block.querySelector('input').value);
            })

            if (this.gameContainer.querySelector('#error')) {
                this.gameContainer.querySelector('#error').remove();
            }

            this.model.checkNumbers(this._userNumbers)
                .then((data) => {
                    this.view.drawUserNumbersLine(data);

                    this._userNumbers = [];
                });
        })
    }

    init() {
        this.addEventListeners();
        this.model.init();
    }
}