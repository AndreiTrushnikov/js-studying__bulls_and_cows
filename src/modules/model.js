// logic
import 'core-js/stable'
import 'regenerator-runtime/runtime'

export default class Model {
    constructor(props) {
        this.minNumber = 0;
        this.maxNumber = 9;

        this._secretNumbers = {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        };

        this._userNumbers = {};
        this.userNumberHTML = '';
    }
    getRandomNumber() {
        return Math.floor(Math.random() * (this.maxNumber - this.minNumber)) + this.minNumber;
    }

    _setSecretNumbers() {
        let key;
        for (key in this._secretNumbers) {
            this._secretNumbers[key] = this.getRandomNumber();
        }
        console.log('this._secretNumbers',this._secretNumbers)
    }

    increase(e) {
        let cur = e.target.closest('div').querySelector('input').value;
        cur++;
        cur = this.checkMinMax(cur);
        e.target.closest('div').querySelector('input').value = cur;
    }

    decrease(e) {
        let cur = e.target.closest('div').querySelector('input').value;
        cur--;
        cur = this.checkMinMax(cur);
        e.target.closest('div').querySelector('input').value = cur;
    }

    checkMinMax(cur) {
        if (cur > 9) {
            return 9;
        }
        if (cur < 0) {
            return 0
        }
        return cur;
    }

    async checkNumbers(userNumbers) {
        try {
            this._userNumbers = userNumbers;
            // debugger
            this.userNumberHTML = await this._createUserNumbersHTML();
        } catch (err) {
            console.log('err = ',err); // todo err не определена и падает с ошибкой. Почему?
        }
        return this.userNumberHTML;
    }

    async _createUserNumbersHTML() {
        let response = this._checkEveryNumber();
        console.log('response _createUserNumbersHTML',response)
        let key;
        let result = `<span>`;
        for (key in response) {
             result += `<span class="${response[key]['type']}">
                            ${response[key]['value']}
                        </span>`
        }
        result += `</span>`

        return result
    }

    _checkEveryNumber() {
        let key;
        let response = {
            1: {},
            2: {},
            3: {},
            4: {}
        };
        for (key in this._userNumbers) {
            if (this._userNumbers[key] === this._secretNumbers[key]) {
                response[key]['type'] = 'bull'
            } else if (response[key]['type'] !== 'bull' && this._checkOnCow(this._userNumbers[key])) {
                response[key]['type'] = 'cow'
            } else {
                response[key]['type'] = 'err'
            }

            response[key]['value'] = this._userNumbers[key];
        }
        return response;
    }

    _checkOnCow(userNUmber) {
        let key;
        let inc = 0;
        for (key in this._secretNumbers) {
            if (userNUmber === this._secretNumbers[key]) {
                inc++;
            }
        }
        return inc > 0;
    }


    init() {
        this._setSecretNumbers();
    }



}