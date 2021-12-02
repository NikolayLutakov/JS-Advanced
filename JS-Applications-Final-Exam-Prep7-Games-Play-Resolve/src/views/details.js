import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { addComment, deleteItem, getAllComments, getById } from '../data/data.js';

const detailsTemplate = (item, onDelete, isOwner, comments, isLoged, onComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${item.imageUrl} />
            <h1>${item.title}</h1>
            <span class="levels">MaxLevel: ${item.maxLevel}</span>
            <p class="type">${item.category}</p>
        </div>

        <p class="text">
            ${item.summary}
        </p>

        <!-- Bonus ( for Guests and Users ) -->

        <div class="details-comments">
            <h2>Comments:</h2>
            ${comments.length == 0 ? html`<p class="no-comment">No comments.</p>` :
             html`<ul>
               ${comments.map(commentTemplate)}
            </ul>`
            }
        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${isOwner ? html`<div class="buttons">
            <a href="/edit/${item._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>` : null}
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
   ${!isOwner && isLoged ? html` <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>` : null}

</section>`;

const commentTemplate = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>`;

export async function detailsPage(ctx) {
    update(ctx);

    async function update(ctx) {
        const [item, comments] = await Promise.all([getById(ctx.params.id), getAllComments(ctx.params.id)]);
        const isOwner = ctx.userData && ctx.userData.id == item._ownerId
        const isLoged = ctx.userData != null;
        renderPage(ctx, detailsTemplate(item, onDelete, isOwner, comments, isLoged, onComment));

         async function onDelete(event) {
            event.preventDefault();

             const confirmation = confirm('Are you sure?');
            if (confirmation) {
                await deleteItem(ctx.params.id);
                ctx.page.redirect('/');
            }
        }

        async function onComment(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const comment = formData.get('comment').trim();
        
            if(comment == '') {
                return alert('Comment can\'t be empty!');
            }

            await addComment(ctx.params.id, comment);
            update(ctx);
        }
    }
}