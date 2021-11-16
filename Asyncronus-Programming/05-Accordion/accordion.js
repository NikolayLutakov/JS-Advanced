async function solution() {
    const main = document.getElementById('main');

    const articles = await getArticles();

    renderArticles();


    function renderArticles() {
        articles.forEach(x => {
            const head = document.createElement('div');
            head.classList.add('head');

            const titleSpan = document.createElement('span');
            titleSpan.textContent = x.title;

            const button = document.createElement('button');
            button.classList.add('button');
            button.setAttribute('id', `${x._id}`);
            button.textContent = 'More';
            button.addEventListener('click', showMore)

            head.appendChild(titleSpan);
            head.appendChild(button);

            const extra = document.createElement('div');
            extra.classList.add('extra');

            const extraParagraph = document.createElement('p');
            extraParagraph.textContent = '';
            extra.appendChild(extraParagraph);

            const accordion = document.createElement('div');
            accordion.classList.add('accordion');
            accordion.appendChild(head);
            accordion.appendChild(extra);
            main.appendChild(accordion);
        });
    }

    async function showMore(event) {
        const button = event.target
        const hidden = event.target.parentNode.parentNode.querySelector('.extra');
        const p = hidden.querySelector('p');
        if (button.textContent == 'More') {
            if(p.textContent == ''){
                const content = await getMore(event.target.id);
                p.textContent = content.content;
            }
           
            hidden.style.display = 'block';
            button.textContent = 'Less'
        } else {
            button.textContent = 'More'
            hidden.style.display = 'none';
        }

    }

    async function getArticles(url) {
        try {
            const url = `http://localhost:3030/jsonstore/advanced/articles/list`;
            const res = await fetch(url);
            if (res.status != 200) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            main.innerHTML = `<h1>Error loading page!</h1>
        <span>${error.message}</span>`
        }
    }

    async function getMore(id) {
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        const res = await fetch(url);
        try {
            if (res.status != 200) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            return data;
        } catch (error) {
            main.innerHTML = `<h1>Error loading page!</h1>
        <span>${error.message}</span>`
        }
    }
}

solution();

