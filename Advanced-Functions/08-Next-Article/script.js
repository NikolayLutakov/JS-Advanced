function getArticleGenerator(articles) {
    return () => {
        let article;

        if (articles.length > 0) {
            text = articles.shift();
            const article = document.createElement('article');
            article.innerText = text;

            document.getElementById('content').appendChild(article);
        }
    }
}
