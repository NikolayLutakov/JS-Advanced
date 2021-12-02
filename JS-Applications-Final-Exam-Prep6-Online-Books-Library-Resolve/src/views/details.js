import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { addLike, deleteBook, getById, getIsLiked, getLikesCount } from '../data/data.js';

const detailsTemplate = (params) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${params.book.title}</h3>
        <p class="type">Type: ${params.book.type}</p>
        <p class="img"><img src=${params.book.imageUrl}></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${params.isOwner 
            ? html`<a class="button" href="/edit/${params.book._id}">Edit</a>
            <a @click=${params.onDelete} class="button" href="javascriprt:void(0)">Delete</a>`
            : null}

            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            ${!params.isOwner && params.isLoged && !params.isLiked ? html`<a @click=${params.onLike} class="button" href="javascript:void(0)">Like</a>` : null}

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${params.likesCount}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${params.book.description}</p>
    </div>
</section>`;

export async function detailsPage(ctx) {
    
    update(ctx);

    async function update(ctx) {
        const bookId = ctx.params.id;
        const isLoged = ctx.userData != null;
        const [book, isLiked, likesCount] = await Promise.all([getById(bookId),
            isLoged && await getIsLiked(bookId, ctx.userData.id) > 0,
            getLikesCount(bookId)]);
        const isOwner = ctx.userData && ctx.userData.id == book._ownerId;
        console.log(isLiked);

        const params = {
            book,
            isLiked,
            likesCount,
            isOwner,
            isLoged,
            onDelete,
            onLike
        }
    
        renderPage(ctx, detailsTemplate(params));

        async function onDelete(event){
            event.preventDefault();

            await deleteBook(ctx.params.id);
            ctx.page.redirect('/');
        }
    
        async function onLike(event){
            event.preventDefault();
    
            await addLike(bookId);
            update(ctx);
        }
    } 
}