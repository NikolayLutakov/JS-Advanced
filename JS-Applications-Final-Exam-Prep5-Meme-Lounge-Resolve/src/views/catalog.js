import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { getAll } from '../data/data.js'

const catalogTemplate = (memes) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${memes.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : memes.map(memeCard)}
        
    </div>
</section>`;

const memeCard = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`;

export async function catalogPage(ctx) {
    const memes = await getAll();
    renderPage(ctx, catalogTemplate(memes));
}