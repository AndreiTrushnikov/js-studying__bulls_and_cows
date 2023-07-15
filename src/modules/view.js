// template
import Controller from "./controller";
import Model from "./model";

export default class View {
    constructor(props) {
        this.gameContainer = props.gameContainer;
        if (!this.gameContainer) throw new Error('На странице не найден главный блок');
    }

    drawField() {
        return `
               <div class="field">
                <div class="field__title" id="title">
                    Начнём игру? / Я загадал четырехзначное число
                    Ваш ответ?
                </div>
                <div class="field__inputs">
                    <div class="field__input-block" data-place="1" id="place1">
                        <button data-action="plus">+</button>
                        <input type="text" name="place1" readonly value="0">
                        <button data-action="minus">-</button>
                    </div>
                    <div class="field__input-block" data-place="2" id="place2">
                        <button data-action="plus">+</button>
                        <input type="text" name="place1" readonly value="0">
                        <button data-action="minus">-</button>
                    </div>
                    <div class="field__input-block" data-place="3" id="place3">
                        <button data-action="plus">+</button>
                        <input type="text" name="place1" readonly value="0">
                        <button data-action="minus">-</button>
                    </div>
                    <div class="field__input-block" data-place="4" id="place4">
                        <button data-action="plus">+</button>
                        <input type="text" name="place1" readonly value="0">
                        <button data-action="minus">-</button>
                    </div>
                </div>
                <button type="button" class="field__submit-btn" data-submit-btn>Отправить</button>
                <div class="field__answers" id="answers">
                </div>
            </div>
        `
    }

    insertField() {
        this.gameContainer.innerHTML = this.drawField();
    }

    drawUserNumbersLine(data) {
        this.gameContainer.querySelector('#answers').insertAdjacentHTML('beforeend', data);
    }

    init() {
        this.insertField();
    }
}