function solve() {
    const authorInput = document.getElementById('creator');
    const titleInput = document.getElementById('title');
    const categoryInput = document.getElementById('category');
    const contentInput = document.getElementById('content');
    const postSection = document.querySelector('main section');
    const archiveSection = document.querySelectorAll('aside section')[1].querySelector('ol');

    console.log(archiveSection);
    const createBtn = document.getElementsByClassName('create')[0];

    createBtn.addEventListener('click', post);

    function post(e) {
        e.preventDefault();
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete'
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', deleteArticle);

        const archiveBtn = document.createElement('button');
        archiveBtn.innerText = 'Archive'
        archiveBtn.classList.add('btn');
        archiveBtn.classList.add('archive');
        archiveBtn.addEventListener('click', archiveArticle);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        buttonsDiv.appendChild(deleteBtn);
        buttonsDiv.appendChild(archiveBtn);

        const title = document.createElement('h1');
        title.innerText = titleInput.value;

        const category = document.createElement('p');
        category.innerHTML = `Category: <strong>${categoryInput.value}</strong>`;

        const creator = document.createElement('p');
        creator.innerHTML = `Creator: <strong>${authorInput.value}</strong>`

        const content = document.createElement('p');
        content.innerText = contentInput.value;

        const article = document.createElement('article');
        article.appendChild(title);
        article.appendChild(category);
        article.appendChild(creator);
        article.appendChild(content);
        article.appendChild(buttonsDiv);

        postSection.appendChild(article);

        authorInput.value = '';
        titleInput.value = '';
        categoryInput.value = '';
        contentInput.value = '';
        postSection.value = '';
        archiveSection.value = '';

    }

    function deleteArticle(e) {
        let articleToDelete = e.target.parentNode.parentNode;

        articleToDelete.remove();
    }

    function archiveArticle(e) {
        const articleToArchive = e.target.parentNode.parentNode;
        const title = articleToArchive.querySelector('h1').innerText;
        const archive = document.createElement('li');
        archive.innerText = title;
        let lis = Array.from(archiveSection.childNodes);
        lis.push(archive);

        lis.sort((a, b) => a.innerText.localeCompare(b.innerText))

        archiveSection.innerHTML = '';

        for (const li of lis) {
            archiveSection.appendChild(li);
        }

        articleToArchive.remove()

    }
}
