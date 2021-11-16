class Textbox {
    constructor(selector, regex) {
        this._value = undefined;
        this._elements = document.querySelectorAll(selector);
        this._invalidSymbols = regex;
        for (const el of this._elements) {
            el.addEventListener('input', (e) => {
                this.value = e.target.value;
            });
        }
    }

    get value() {
        return this._value;
    }

    set value(v) {
        this._value = v;
        for (const el of this._elements) {
            el.value = v;
        }
    }

    get elements() {
        return this._elements;
    }

    isValid() {
        if (this.value.search(this._invalidSymbols) === -1) {
            return true;
        }
        return false;
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = document.getElementsByClassName('.textbox');

inputs.addEventListener('click',function(){console.log(textbox.value);});
