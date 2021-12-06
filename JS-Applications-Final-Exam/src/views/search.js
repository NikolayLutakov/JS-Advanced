import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { search } from '../data/data.js';

let isLoged = false;
const searchTemplate = (items, onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <!--Show after click Search button-->
    <div class="search-result">
        ${items.length == 0 ? html`<p class="no-result">No result.</p>` : items.map(itemTemplate)}
    </div>
</section>`;

const itemTemplate = (item) => html`
<div class="card-box">
    <img src=${item.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${item.name}</p>
            <p class="artist">Artist: ${item.artist}</p>
            <p class="genre">Genre: ${item.genre}</p>
            <p class="price">Price: $${item.price}</p>
            <p class="date">Release Date: ${item.releaseDate}</p>
        </div>
        ${isLoged ? html`<div class="btn-group">
            <a href="/details/${item._id}" id="details">Details</a>
        </div>` : null}
    </div>
</div>`;

export async function searchPage(ctx) {
    isLoged = ctx.userData != null;
    let items = [];
    renderPage(ctx, searchTemplate(items, onSearch));

    async function onSearch(event) {
        event.preventDefault();
        const query = document.getElementById('search-input').value.trim();
        items = await search(query);
        renderPage(ctx, searchTemplate(items, onSearch));
    }
}