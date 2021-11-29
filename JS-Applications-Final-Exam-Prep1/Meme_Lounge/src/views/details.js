import { deleteMeme, getMemeById } from "../api/data.js";
import { html } from "../common/lib.js";
import { getUserData } from "../common/util.js";

const detailsTemplate = (meme, onDelete, userData) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${userData && userData.id == meme._ownerId 
            ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button class="button danger" @click=${onDelete}>Delete</button>`
            : null}
        </div>
    </div>
</section>`

export async function detailsPage(ctx) {
    const userData = getUserData();
    const meme = await getMemeById(ctx.params.id);
    ctx.render(detailsTemplate(meme, onDelete, userData));

    async function onDelete() {
        await deleteMeme(ctx.params.id);
        ctx.page.redirect('/catalog');
    }
}