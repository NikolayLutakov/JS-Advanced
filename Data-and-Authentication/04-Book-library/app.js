function attachEvents() {
    document.getElementById('loadBooks').addEventListener('click', loadBooks);
    document.querySelector('table tbody').replaceChildren();
    document.querySelector('form').addEventListener('submit', createBook)
}

async function createBook(event){
    event.preventDefault();
    const form = event.target;
    removeInfoDiv();
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');

    const data = {
        title,
        author
    }

    try {
        validateInput(data.title, data.author);
    } catch (err) {
        showInfo(err.message, false);
        return;
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    
    const url = 'http://localhost:3030/jsonstore/collections/books';
    try {
        await makeRequest(url, options)
        showInfo(`Book ${title} created successfully.`, true)
    } catch (err) {
        showInfo(err.message, false)
    }
    form.reset();
}

async function loadBooks() {
    removeInfoDiv();
    try {
        const booksData = await getBooks();
        renderBooks(booksData);
    } catch (err) {
        showInfo(err.message, false)
        return;
    }
}

async function getBooks() {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const data = await makeRequest(url);
    return data;
}

function renderBooks(data) {
    const tableBody = document.querySelector('table tbody');
    tableBody.replaceChildren();

    const books = Object.entries(data);

    books.forEach(x => {
        const row = document.createElement('tr');

        const title = document.createElement('td');
        title.textContent = x[1].title;

        const author = document.createElement('td');
        author.textContent = x[1].author;

        const action = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.value = x[0];
        editBtn.addEventListener('click', editBook);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.value = x[0];
        deleteBtn.addEventListener('click', deleteBook);

        action.appendChild(editBtn);
        action.appendChild(deleteBtn);

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(action);
        tableBody.appendChild(row);

    });
}

async function editBook(event) {
    removeInfoDiv();
    const bookId = event.target.value;

    const form = document.querySelector('form');
    form.removeEventListener('submit', createBook);

    const formTitle = document.querySelector('form h3');
    formTitle.textContent = 'EditFORM';

    const btn = document.querySelector('form button');
    btn.textContent = 'Save';

    const cels = event.target.parentNode.parentNode.querySelectorAll('td');
    
    const inputs = form.querySelectorAll('input');
    const titleInput = inputs[0];
    const authorInput = inputs[1];
    
    titleInput.value = cels[0].textContent;
    authorInput.value = cels[1].textContent;
    
    form.addEventListener('submit', submitEdit);
    form.bookId = bookId;
}

async function submitEdit(event){
    removeInfoDiv();
    event.preventDefault();
    const form = event.target
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');

    const data = {
        title,
        author
    }

    const bookId = event.target.bookId
   
    const url = 'http://localhost:3030/jsonstore/collections/books/' + bookId;
    
    try {
        validateInput(data.title, data.author);
    } catch (err) {
        showInfo(err.message, false);
        return;
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    try {
        await makeRequest(url, options)
        await loadBooks();
    } catch (err) {
        showInfo(err.message, false)
    }
    form.reset();
    form.removeEventListener('submit', submitEdit);
    const formTitle = document.querySelector('form h3');
    formTitle.textContent = 'FORM';

    const btn = document.querySelector('form button');
    btn.textContent = 'Submit';
    form.addEventListener('submit', createBook)
}

function validateInput(title, author){
    if(title == ''){
        throw new Error('Title can not be empty!');
    }
    
    if(author == ''){
        throw new Error('Author can not be empty!');
    }
}

async function deleteBook(event) {
    removeInfoDiv();
    const bookId = event.target.value;
    const url = 'http://localhost:3030/jsonstore/collections/books/' + bookId;
    const options = {
        method: 'DELETE'
    }
    try {
        await makeRequest(url, options)
        event.target.parentNode.parentNode.remove();
    } catch (err) {
        showInfo(err.message, false)
    }
}

async function makeRequest(url, options) {
    const response = await fetch(url, options);
    if (response.status != 200) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

function showInfo(message, flag) {
    const infoDiv = document.createElement('div');

    infoDiv.setAttribute('id', 'infoDiv');
    infoDiv.style.textAlign = 'center';
    infoDiv.style.marginTop = '5px';

    if (flag) {
        infoDiv.style.backgroundColor = '#98fb98';
    } else {
        infoDiv.style.backgroundColor = '#ff4500';
    }
    infoDiv.textContent = message;
    
    document.querySelector('body').appendChild(infoDiv);
}

function removeInfoDiv() {
    const infoDiv = document.getElementById('infoDiv');
    if (infoDiv) {
        infoDiv.remove();
    }
}

attachEvents();