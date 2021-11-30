import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { createComment, deleteGame, getById, getComments } from '../data/data.js';

const detailsTemplate = (game, onDelete, isOwner, comments, isLoged, onComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>
        <p class="text">
            ${game.summary}
        </p>
        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length == 0
            ? html`<p class="no-comment">No comments.</p>` 
            : html` <ul>
                ${comments.map(commentTemplate)}
            </ul>`}
        </div>
        ${isOwner ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>` : null}
    </div>
    ${isLoged && !isOwner 
    ? html`<article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>` 
    : null}
</section>`;

const commentTemplate = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;

export async function detailsPage(ctx) {
    update()
    async function update(){
    const [game, comments] = await Promise.all([getById(ctx.params.id), getComments(ctx.params.id)]);
    const isLoged = ctx.userData != null;
    const isOwner = ctx.userData && ctx.userData.id == game._ownerId;

    renderPage(ctx, detailsTemplate(game, onDelete, isOwner, comments, isLoged, onComment));
    }
    async function onDelete(event) {
        event.preventDefault();
        await deleteGame(ctx.params.id);
        ctx.page.redirect('/');
    }

    async function onComment(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const content = formData.get('comment');
        event.target.reset();
        await createComment(ctx.params.id, content);
        update();
    }
}