class ArtGallery {
    constructor(creator) {
        this.creator = creator,
            this.possibleArticles = { picture: 200, photo: 50, item: 250 },
            this.listOfArticles = [],
            this.guests = [];
    }

    addArticle(articleModel, articleName, quantity) {
        let modelToLower = articleModel.toLowerCase();
        
        if (!Object.keys(this.possibleArticles).includes(modelToLower)) {
            throw Error('This article model is not included in this gallery!')
        }

        let article = this.listOfArticles.find(o => o.articleName === articleName)

        if(article && article.articleModel === articleModel){
            article.quantity += Number(quantity);
        } else {
            this.listOfArticles.push({articleModel: modelToLower, articleName, quantity})
        }

        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`
    }

    inviteGuest(guestName, personality){
        let guest = this.guests.find(o => o.guestName === guestName);

        if(guest){
            throw Error(`${guestName} has already been invited.`)
        }

        let points = 0;
        if(personality === 'Vip'){
            points = 500;
        } else if (personality == 'Middle'){
            points = 250;
        } else {
            points = 50;
        }

        this.guests.push({guestName, points, purchaseArticle: 0});

        return `You have successfully invited ${guestName}!`
    } 

    buyArticle(articleModel, articleName, guestName){
        let article = this.listOfArticles.find(a => a.articleName === articleName);
        
        let guest = this.guests.find(a => a.guestName === guestName);
        if(!article || article.articleModel !== articleModel.toLowerCase()){
            throw Error('This article is not found.');
        }

        if(article.quantity === 0){
            return `The ${articleName} is not available.`
        }

        if(!guest){
            return 'This guest is not invited.'
        }
        
        let guestPoints = guest.points
        let price = this.possibleArticles[articleModel];

        if(price > guestPoints){
            return 'You need to more points to purchase the article.';
        } else {
            guest.points -= price;
            article.quantity--;
            guest.purchaseArticle++;
        }

        return `${guestName} successfully purchased the article worth ${price} points.`
    }

    showGalleryInfo (criteria){
        let result = '';
        if(criteria === 'article'){
            result += 'Articles information:\n'

            for(let i = 0; i < this.listOfArticles.length; i++){
                if(i < this.listOfArticles.length - 1){
                    result += `${this.listOfArticles[i].articleModel} - ${this.listOfArticles[i].articleName} - ${this.listOfArticles[i].quantity}\n`;
                } else{
                    result += `${this.listOfArticles[i].articleModel} - ${this.listOfArticles[i].articleName} - ${this.listOfArticles[i].quantity}`;
                }
            }
        } else {
            result += 'Guests information:\n'

            for(let i = 0; i < this.guests.length; i++){
                if(i < this.guests.length - 1){
                    result += `${this.guests[i].guestName} - ${this.guests[i].purchaseArticle}\n`;
                } else {
                    result += `${this.guests[i].guestName} - ${this.guests[i].purchaseArticle}`;
                }      
            }
        }

        return result;
    }
}

const artGallery = new ArtGallery('Curtis Mayfield'); 
artGallery.addArticle('picture', 'Mona Liza', 3);
artGallery.addArticle('Item', 'Ancient vase', 2);
artGallery.addArticle('picture', 'Mona Liza', 1);
artGallery.inviteGuest('John', 'Vip');
artGallery.inviteGuest('Peter', 'Middle');
artGallery.buyArticle('picture', 'Mona Liza', 'John');
artGallery.buyArticle('item', 'Ancient vase', 'Peter');
console.log(artGallery.showGalleryInfo('article'));
console.log(artGallery.showGalleryInfo('guest'));

