class Restaurant {
    constructor(budgetMoney) {
        this.budgetMoney = budgetMoney,
            this.menu = {},
            this.stockProducts = {},
            this.history = []
    }

    loadProducts(products) {
        for (const element of products) {
            let tokens = element.split(' ');
            let productName = tokens[0];
            let productQuantity = Number(tokens[1]);
            let productTotalPrice = Number(tokens[2]);

            if (productTotalPrice <= this.budgetMoney) {
                if (Object.keys(this.stockProducts).includes(productName)) {
                    this.stockProducts[productName] += productQuantity
                } else {
                    this.stockProducts[productName] = productQuantity;
                }

                this.budgetMoney -= productTotalPrice;

                this.history.push(`Successfully loaded ${productQuantity} ${productName}`)
            } else {
                this.history.push(`There was not enough money to load ${productQuantity} ${productName}`)
            }
        }

        return this.history.join('\n');
    }

    addToMenu(mealName, neededProducts, price) {
        if (Object.keys(this.menu).includes(mealName)) {
            return `The ${mealName} is already in the our menu, try something different.`
        } else {
            let meal = {};
            meal['products'] = neededProducts;
            meal['price'] = price;
            this.menu[mealName] = meal;
        }

        let mealsCount = Object.keys(this.menu).length;
        if (mealsCount == 1) {
            return `Great idea! Now with the ${mealName} we have 1 meal in the menu, other ideas?`
        } else {
            return `Great idea! Now with the ${mealName} we have ${mealsCount} meals in the menu, other ideas?`
        };
    }

    showTheMenu(){
        let result = '';
        let keys = Object.keys(this.menu);
        if(keys.length == 0){
            result = 'Our menu is not ready yet, please come later...';
        }
        
        for(let i = 0; i < keys.length; i++){
            if(i< keys.length - 1){
                result += `${keys[i]} - $ ${this.menu[keys[i]].price}\n`
            } else {
                result += `${keys[i]} - $ ${this.menu[keys[i]].price}`
            }    
        }
        return result;
    }

    makeTheOrder(meal){
        if(!Object.keys(this.menu).includes(meal)){
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        }

        let neededProducts = this.menu[meal].products;

        let products = neededProducts.map(r => {
            let lastIndex = r.lastIndexOf(' '); 
            let arr = [r.substr(0, lastIndex), Number(r.substr(lastIndex))]
            return arr;
        });
        
        for(const row of products){
            if(!this.stockProducts.hasOwnProperty(row[0]) || this.stockProducts[row[0]] < row[1]){
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
            } 
        }

        for(const row of products){
            this.stockProducts[row[0]] -= row[1];
        }

        this.budgetMoney += this.menu[meal].price;
        return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`
    }
}

let kitchen = new Restaurant(1000);
kitchen.loadProducts(['Yogurt 30 3', 'Honey 50 4', 'Strawberries 20 10', 'Banana 5 1']);
kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);
console.log(kitchen.budgetMoney);
console.log(kitchen.stockProducts)
console.log(kitchen.menu)
console.log(kitchen.makeTheOrder('frozenYogurt'));

console.log(kitchen.budgetMoney);
console.log(kitchen.stockProducts)
