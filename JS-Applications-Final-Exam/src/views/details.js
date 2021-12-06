import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { deleteItem, getById } from '../data/data.js';

const detailsTemplate = (item, onDelete, isOwner) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${item.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${item.name}</h1>
                <h3>Artist: ${item.artist}</h3>
                <h4>Genre: ${item.genre}</h4>
                <h4>Price: $${item.price}</h4>
                <h4>Date: ${item.releaseDate}</h4>
                <p>${item.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            ${isOwner ? html`<div class="actionBtn">
                <a href="/edit/${item._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>` : null}
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const item = await getById(ctx.params.id);
    const isOwner = ctx.userData && ctx.userData.id == item._ownerId;
    renderPage(ctx, detailsTemplate(item, onDelete, isOwner));

    async function onDelete(event) {
        event.preventDefault();

        const confirmation = confirm('Are you sure?');
        if (confirmation) {
            await deleteItem(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}