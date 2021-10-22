class ChristmasDinner{
    _budget;
    constructor(value){
        this.budget = value
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }

    get budget(){
        return this._budget;
    }

    set budget(value){
        if(value < 0){
            throw Error('The budget cannot be a negative number');
        }

        this._budget = value;
    }

    shopping(product){
        const productType = product[0];
        const productPrice = product[1];
        if(this.budget - productPrice < 0){
            throw Error('Not enough money to buy this product')
        };

        this.products.push(productType);
        this.budget -= productPrice;

        return `You have successfully bought ${productType}!`;
    }

    recipes(recipe){
        const neededProducts = recipe.productsList;
        let checker = (arr, target) => target.every(v => arr.includes(v));
        if(!checker(this.products, neededProducts)){
            throw Error('We do not have this product');
        }
        this.dishes.push({recipeName: recipe.recipeName, productsList: recipe.productsList });

        return `${recipe.recipeName} has been successfully cooked!`
    }

    inviteGuests(name, dish){
        if(!this.dishes.some(x => x.recipeName == dish)){
            throw Error('We do not have this dish')
        }

        if(this.guests.hasOwnProperty(name)){
            throw Error('This guest has already been invited')
        }

        this.guests[name] = dish;

        return `You have successfully invited ${name}!`
    }

    showAttendance(){
        let result = '';
        
        for(const guest in this.guests){
            const products = this.dishes.find(x => x.recipeName == this.guests[guest]);

            result += `${guest} will eat ${this.guests[guest]}, which consists of ${products.productsList.join(', ')}\n`
        }

        return result.trimEnd();
    }
}


let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance());



