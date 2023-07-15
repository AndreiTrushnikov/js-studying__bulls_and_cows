// listeners

export default class Controller {
    constructor({view, model, gameContainer}) {
        this.view = view;
        this.model = model;
        this.gameContainer = gameContainer;
        this._userNumbers = {
            1: '',
            2: '',
            3: '',
            4: '',
        };

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
                this._userNumbers[block.dataset.place] = +block.querySelector('input').value;
            })

            // let key1 = 1;
            // let key2 = 2;
            //
            // let inc = 0;
            // for (key1 in this._userNumbers) {
            //     let cur = this._userNumbers[key1];
            //     for (key2 in this._userNumbers) {
            //         if (this._userNumbers[key2] === cur) {
            //             inc++
            //         }
            //     }
            // }

            // console.log('inc', inc)

            this.model.checkNumbers(this._userNumbers)
                .then((data) => {
                    this.view.drawUserNumbersLine(data);
                });
            // this.
        })
    }

    init() {
        this.addEventListeners();
        this.model.init();
    }
}