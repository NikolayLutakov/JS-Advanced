class Story {

    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
    }

    get likes() {
        let likesCount = this._likes.length;

        if (likesCount == 0) {
            return `${this.title} has 0 likes`
        }

        if (likesCount == 1) {
            return `${this._likes[0]} likes this story!`
        }

        return `${this._likes[0]} and ${likesCount - 1} others like this story!`
    }

    like(username) {
        if (this._likes.includes(username)) {
            throw Error(`You can't like the same story twice!`);
        }

        if (this.creator == username) {
            throw Error(`You can't like your own story!`);
        }

        this._likes.push(username);

        return `${username} liked ${this.title}!`
    }

    dislike(username) {
        let index = this._likes.indexOf(username);
        if (index == -1) {
            throw Error(`You can't dislike this story!`);
        }

        this._likes.splice(index, 1);

        return `${username} disliked ${this.title}`;
    }

    comment(username, content, id) {
        let comment = this._comments.find(o => o.Id == id);

        if (comment == undefined || id == undefined) {
            let commentId = this._comments.length + 1;
            let comment = {
                'Id': commentId,
                'Username': username,
                'Content': content,
                'Replies': []
            }

            this._comments.push(comment);
            return `${username} commented on ${this.title}`;
        }

        let replyId = Number(`${comment.Id}.${comment.Replies.length + 1}`);

        let reply = {
            'Id': replyId,
            'Username': username,
            'Content': content
        }

        comment.Replies.push(reply);

        return `You replied successfully`;
    }

    toString(sortingType) {
        let result = '';
        result += `Title: ${this.title}\n`;
        result += `Creator: ${this.creator}\n`;
        result += `Likes: ${this._likes.length}\n`;
        result += `Comments:\n`;

        let comments = this._comments;

        if (sortingType == 'asc') {
            comments.sort((a, b) => a.Id - b.Id)
        } else if (sortingType == 'desc') {
            comments.sort((a, b) => b.Id - a.Id)
        } else {
            comments.sort((a, b) => a.Username.localeCompare(b.Username))
        }

        for (const comment of comments) {
            result += `-- ${comment.Id}. ${comment.Username}: ${comment.Content}\n`

            let sortedReplies = comment.Replies;
            if (sortingType == 'asc') {
                sortedReplies.sort((a, b) => a.Id - b.Id)
            } else if (sortingType == 'desc') {
                sortedReplies.sort((a, b) => b.Id - a.Id)
            } else {
                sortedReplies.sort((a, b) => a.Username.localeCompare(b.Username))
            }

            for (const rep of sortedReplies) {
                result += `--- ${rep.Id}. ${rep.Username}: ${rep.Content}\n`
            }
        }
        return result.trimEnd();
    }
}

let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");



