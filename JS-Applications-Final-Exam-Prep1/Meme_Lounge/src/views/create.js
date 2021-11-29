import { createMeme } from "../api/data.js";
import { html } from "../common/lib.js";
import { showError } from "../common/notification.js";

const createTemplate = (onSubmit) => html`
<section @submit=${onSubmit} id="create-meme">
    <form id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);

        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();

        if(title == '' || description == '' || imageUrl == ''){
            return showError('All fields are required!')
        }

        await createMeme(title, description, imageUrl);
        ctx.page.redirect(`/catalog`);
    }
}