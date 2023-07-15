// logic
import 'core-js/stable'
import 'regenerator-runtime/runtime'

export default class Model {
    constructor(props) {
        this.minNumber = 0;
        this.maxNumber = 10;

        this._secretNumbers = [];

        this._userNumbers = {};
        this.response = {
            innerHTML: '',
            error: false
        };
        this.lengthOfSecretNumber = 4;
    }
    getRandomUniqueNumber() {
        let curNumber = this.getRandomNumber();
        if (this._secretNumbers.includes(curNumber)) {
            curNumber = this.getRandomUniqueNumber();
        }
        return curNumber;
    }
    getRandomNumber() {
        return Math.floor(Math.random() * (this.maxNumber - this.minNumber)) + this.minNumber;
    }

    _setSecretNumbers() {
        let i = 0;
        for (i; i < this.lengthOfSecretNumber; i++) {
            this._secretNumbers.push(this.getRandomUniqueNumber());
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
            return 0;
        }
        return cur;
    }

    async checkNumbers(userNumbers) {
        this._userNumbers = userNumbers;

        try {
            if (!this.checkUniqueNumbers()) {
                this.response['error'] = true;
            } else {
                this.response['innerHTML'] = await this._createUserNumbersHTML();
                this.response['error'] = false;
            }
        } catch (err) {
            console.log('err = ',err);
        }

        return this.response;
    }

    checkUniqueNumbers() {
        let result = [];

        for (let num of this._userNumbers) {
            if (!result.includes(num)) {
                result.push(num);
            }
        }

        return result.length === this._userNumbers.length;
    }

    async _createUserNumbersHTML() {
        let response = this._checkEveryNumber();
        let result = `
            <span>
                <span>${this._userNumbers.join('')} </span>
                <span class="bull"> ${response['bullCount']} ${this.numWord(+response['bullCount'], ['бык', 'быка', 'быков'])}</span>
                <span class="cow"> ${response['cowCount']} ${this.numWord(+response['cowCount'], ['корова', 'коровы', 'коров'])}</span>
            </span>
        `;

        return result;
    }


    numWord(value, words) {
        if (value === 1) return words[0];
        if (value > 1 && value < 5) return words[1];
        if ((value > 4) || value === 0) return words[2];
        return words[2];
    }


    _checkEveryNumber() {
        let response = {
            bullCount: 0,
            cowCount: 0
        };
        this._userNumbers.forEach((number, key) => {
            if (+number === this._secretNumbers[+key]) {
                response.bullCount++;
            } else if (this._checkCow(+number)) {
                response.cowCount++;
            }
        })
        return response;
    }

    _checkCow(userNumber) {
        let response = this._secretNumbers.filter((number) => {
            return userNumber !== number
        })
        return response.length !== this._secretNumbers.length;
    }

    init() {
        this._setSecretNumbers();
    }
}