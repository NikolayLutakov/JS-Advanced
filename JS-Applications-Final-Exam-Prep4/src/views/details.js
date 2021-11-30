import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { deleteListing, getById } from '../data/data.js';

const detailsTemplate = (listing, onDelete, isOwner) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${listing.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${listing.brand}</li>
            <li><span>Model:</span>${listing.model}</li>
            <li><span>Year:</span>${listing.year}</li>
            <li><span>Price:</span>${listing.price}$</li>
        </ul>

        <p class="description-para">${listing.description}</p>
        ${isOwner ? html`<div class="listings-buttons">
            <a href="/edit/${listing._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
        </div>` : null}
        
    </div>
</section>`;

export async function detailsPage(ctx) {
    const listing = await getById(ctx.params.id);
    const isOwner = ctx.userData && ctx.userData.id == listing._ownerId
    renderPage(ctx, detailsTemplate(listing, onDelete, isOwner));

    async function onDelete(event) {
        event.preventDefault();
        const confirmation = confirm('Are you sure?');
        if(confirmation){
            await deleteListing(ctx.params.id);
            ctx.page.redirect('/all-listings');
        }
    }
}