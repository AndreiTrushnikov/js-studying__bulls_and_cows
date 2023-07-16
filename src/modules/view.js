export default class View {
    constructor(props) {
        this.lengthOfSecretNumber = props.lengthOfSecretNumber;

        this.gameContainer = props.gameContainer;
        if (!this.gameContainer) throw new Error('На странице не найден главный блок');

        this.error = `<span class="error" id="error">Все числа должны быть уникальными!</span>`;
    }

    drawField() {
        return `
               <div class="field">
                ${this.createFieldTitle()}
                ${this.createFieldInputs()}
                ${this.createSubmitButtons()}
                <div class="field__answers" id="answers"></div>
            </div>
        `
    }

    createFieldTitle() {
        return `
            <div class="field__title" id="title">
                <div>Я загадал четырехзначное число. Попробуешь его угадать?</div>
                <div>Ваш ответ?</div>
            </div>
        `
    }

    createFieldInputs() {
        let i;
        let inputs = `<div class="field__inputs">`;
        for (i = 0; i < this.lengthOfSecretNumber; i++) {
            inputs += this.createFieldInput(i);
        }
        inputs += `</div>`;
        return inputs;
    }

    createSubmitButtons() {
        return `
            <div>
                <button type="button" class="field__submit-btn" data-submit-btn>Отправить</button>
                <button type="button" class="field__submit-btn d-none" data-new-game-btn>Новая игра?</button>
            </div>
        `
    }

    createFieldInput(id) {
        return `
            <div class="field__input-block" data-place="${id}" id="place${id}">
                <button data-action="plus">+</button>
                <input type="text" name="place${id}" readonly value="0">
                <button data-action="minus">-</button>
            </div>
        `
    }

    insertField() {
        this.gameContainer.innerHTML = this.drawField();
    }

    drawUserNumbersLine(data) {
        if (data.error) {
            this.gameContainer.querySelector('#answers').insertAdjacentHTML('beforeend', this.error);
            this.clearError();
        } else {
            this.gameContainer.querySelector('#answers').insertAdjacentHTML('beforeend', data['innerHTML']);

        }
    }

    clearError() {
        setTimeout(() => {
            if (this.gameContainer.querySelector('#error')) {
                this.gameContainer.querySelector('#error').remove();
            }
        }, 3000)
    }

    init() {
        this.insertField();
    }
}