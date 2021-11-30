import { html } from '../common/lib.js'
import { renderPage } from '../common/renderPage.js';
import { getUserData } from '../common/utilities.js';
import { getMyBooks } from '../data/data.js';

const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    ${books.length == 0 
        ? html`<p class="no-books">No books in database!</p>`
        : html`<ul class="my-books-list">${books.map(bookCard)}</ul>`
    }
</section>`;

const bookCard = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function myBooksPage(ctx) {
    const userData = getUserData();
    const myBooks = await getMyBooks(userData.id);
    renderPage(ctx, myBooksTemplate(myBooks));
}