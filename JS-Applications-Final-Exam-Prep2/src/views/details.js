import { html } from '../common/lib.js'
import { renderPage } from '../common/renderPage.js';
import { getUserData } from '../common/utilities.js';
import { deleteBook, getBookById, getBookLikesCount, getBookLikesForUser, likeBook } from '../data/data.js';

const detailsTemplate = (book, isOwner, isLoged, onDelete, onLike, bookLikes, isLiked) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${isOwner ? 
            html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` : null }
            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            ${ !isOwner && isLoged && !isLiked ? html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>` : null }
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${bookLikes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

export async function detailsPage(ctx) {
    const userData = getUserData();
    const isLoged = userData != null
    update();
    async function update() {
        const [book, bookLikes, isLiked] = await Promise.all([getBookById(ctx.params.id), getBookLikesCount(ctx.params.id), isLoged ? await getBookLikesForUser(ctx.params.id, userData.id) > 0 : false]);
        const isOwner = userData && userData.id == book._ownerId;
        renderPage(ctx, detailsTemplate(book, isOwner, isLoged, onDelete, onLike, bookLikes, isLiked));
    }
    

    async function onDelete(event) {
        event.preventDefault();
        const confirmation = confirm('Are you shure?');
        if(confirmation) {
            await deleteBook(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onLike(event) {
        event.preventDefault();
        await likeBook(ctx.params.id);
        update()
    }
}