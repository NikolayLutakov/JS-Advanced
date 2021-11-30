import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { search } from '../data/data.js';

const searchTemplate = (listings, onSearch) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
        ${listings.length == 0 ? html`<p class="no-cars"> No results.</p>` : listings.map(listingCard)}  
    </div>
</section>`;

const listingCard = (listing) => html`
<div class="listing">
    <div class="preview">
        <img src=${listing.imageUrl}>
    </div>
    <h2>${listing.brand} ${listing.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${listing.year}</h3>
            <h3>Price: ${listing.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${listing._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function searchPage(ctx) {
    let listings = [];
    renderPage(ctx, searchTemplate(listings, onSearch));
    
    async function onSearch(event){
        const input = document.querySelector('#search-input').value.trim()
        if(input != '') {
            listings = await search(input); 
            renderPage(ctx, searchTemplate(listings, onSearch));
        } else {
            listings = [];
            renderPage(ctx, searchTemplate(listings, onSearch));
        }
    }
}