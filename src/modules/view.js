// template
import Controller from "./controller";

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
                    <div class="field__input-block" id="place1">
                        <button data-action="plus">+</button>
                        <input type="text" name="place1" readonly value="0">
                        <button data-action="minus">-</button>
                    </div>
                    <div class="field__input-block" id="place2">
                        <button data-action="plus">+</button>
                        <input type="text" name="place1" readonly value="0">
                        <button data-action="minus">-</button>
                    </div>
                    <div class="field__input-block" id="place3">
                        <button data-action="plus">+</button>
                        <input type="text" name="place1" readonly value="0">
                        <button data-action="minus">-</button>
                    </div>
                    <div class="field__input-block" id="place4">
                        <button data-action="plus">+</button>
                        <input type="text" name="place1" readonly value="0">
                        <button data-action="minus">-</button>
                    </div>
                </div>
                <div class="field__answers" id="answers">
                    <span>
                        <span class="cow">1</span>
                        <span class="error">1</span>
                        <span class="bull">1</span>
                        <span class="error">1</span>
                    </span>
                    <span>
                        <span class="cow">1</span>
                        <span class="error">1</span>
                        <span class="bull">1</span>
                        <span class="error">1</span>
                    </span>
                </div>
            </div>
        `
    }

    insertField() {
        this.gameContainer.innerHTML = this.drawField();
    }

    init() {
        this.insertField();
        setTimeout(() => {
            new Controller().init();
        }, 100);
    }
}