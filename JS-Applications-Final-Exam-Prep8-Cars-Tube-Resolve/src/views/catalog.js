import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { getAll } from '../data/data.js';

const catalogTemplate = (listings) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${listings.length == 0 ? html`<p class="no-cars">No cars in database.</p>` : listings.map(listingTemplate)}   
    </div>
</section>`;

const listingTemplate = (listing) => html`
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

export async function catalogPage(ctx) {
    const listings = await getAll();
    
    renderPage(ctx, catalogTemplate(listings));
}