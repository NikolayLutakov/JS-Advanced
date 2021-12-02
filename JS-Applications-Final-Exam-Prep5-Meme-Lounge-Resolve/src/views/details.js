import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { deleteMeme, getById } from '../data/data.js';

const detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>` : null}

        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const meme = await getById(ctx.params.id);
    const isOwner = ctx.userData && ctx.userData.id == meme._ownerId;
    renderPage(ctx, detailsTemplate(meme, isOwner, onDelete));

    async function onDelete(event) {
        event.preventDefault();

        await deleteMeme(ctx.params.id);
        ctx.page.redirect('/catalog');
    }
}