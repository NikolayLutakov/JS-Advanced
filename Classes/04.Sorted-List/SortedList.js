class List {
    elements = [];
    size = this.elements.length

    add(element) {
        this.elements.push(element)
        this.elements = this._sortElements();
        this.size = this.elements.length
    }

    remove(index) {
        if (this._isValidIndex(index)) {
            this.elements.splice(index, 1)
            this.elements = this._sortElements();
            this.size = this.elements.length
        }

    }

    get(index) {
        if (this._isValidIndex(index)) {
            return this.elements[index];
        }
    }

    _sortElements() {
        return this.elements.sort((a, b) => a - b)
    }

    _isValidIndex(index){
        return (index >= 0 && index < this.elements.length) && this.elements.length > 0
    }

}

const list = new List();

console.log(list);

list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(2);
list.add(3);
list.add(4);
list.add(2);
list.add(3);
list.add(4);


console.log(list);
console.log(list.get(3));
list.remove(10);
list.remove(-2);
console.log(list.size);