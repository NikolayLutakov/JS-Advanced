import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { getMy } from '../data/data.js';

const profileTemplate = (memes, user) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${memes.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : memes.map(memeCard)}
    </div>
</section>`;

const memeCard = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`;

export async function profilePage(ctx) {
    const memes = await getMy(ctx.userData.id);

    renderPage(ctx, profileTemplate(memes, ctx.userData));
}