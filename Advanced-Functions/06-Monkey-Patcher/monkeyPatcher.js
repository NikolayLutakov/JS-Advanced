function solution(command) {
    if (command === 'upvote') this.upvotes += 1;
    else if (command === 'downvote') this.downvotes += 1;
    else if (command === 'score') {
        let sentiment = this.upvotes - this.downvotes;
        let total = this.upvotes + this.downvotes;
        let numToAdd = this.upvotes >= this.downvotes ? Math.ceil(this.upvotes * 0.25) : Math.ceil(this.downvotes * 0.25);

        let rating = 'new';
        if (total < 10) {
            rating = 'new';
        } else if (this.upvotes / total * 100 > 66) {
            rating = 'hot';
        } else if (sentiment >= 0 && total > 100) {
            rating = 'controversial';
        } else if (sentiment < 0) {
            rating = 'unpopular';
        }
        let result = []
        if (total > 50) {
            result.push(this.upvotes + numToAdd);
            result.push(this.downvotes + numToAdd);
        } else {
            result.push(this.upvotes);
            result.push(this.downvotes);
        }
        result.push(sentiment)
        result.push(rating)
        return result;
    }
}