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
        let rules = `
            <p>Вы вводите четырехзначное число, каждая цифра которого должна быть уникальной.</p>
            <p>Далее жмякаете "Отправить".</p>
            <p>Если вы угадаете правильное ПОЛОЖЕНИЕ какой-либо из цифр,
            то вам придет в ответ количество быков (например загадано 0123 - и ваш ответ 0178 - то вам придет ответ "2 быка")</p>
            <p>То есть точное положение вы не будете знать, но будете знать, что 2 какие-то цифры вы угадали и они стоят на нужных местах.</p>
            <p>Далее, если вы угадаете ЦИФРУ, но она будет стоять НЕ НА СВОЕМ МЕСТЕ, то вам придет в ответ количество коров 
            (например загадано 0123 - и ваш ответ 0137 - то вам придет ответ "2 быка 1 корова" 
            (0 и 1 угадали и цифру и положение - это быки, 3 угадали, такая цифра есть. но она не на своем месте - это корова)</p> 
        `
        return `
            <div class="field__title" id="title">
                <h3>БЫКИ И КОРОВЫ</h3>
                <p>Я загадал четырехзначное число.</p>
                <p>Попробуешь его угадать?</p>
                <button type="button" class="btn rules-btn" data-rules-btn>Показать правила</button>
                <div class="rules d-none" data-rules>${rules}</div>
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
                <button type="button" class="btn field__submit-btn" data-submit-btn>Отправить</button>
                <button type="button" class="btn field__submit-btn d-none" data-new-game-btn>Новая игра?</button>
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