import { html } from "../common/lib.js";
import { getUserData } from "../common/util.js";

const welcomeTemplate = html`
<section id="welcome">
<div id="welcome-container">
    <h1>Welcome To Meme Lounge</h1>
    <img src="/images/welcome-meme.jpg" alt="meme">
    <h2>Login to see our memes right away!</h2>
    <div id="button-div">
        <a href="/login" class="button">Login</a>
        <a href="/register" class="button">Register</a>
    </div>
</div>
</section>`

export function welcomePage(ctx) {
    const userData = getUserData();
    if(userData){
       ctx.page.redirect('/catalog');
    }
    ctx.render(welcomeTemplate);
}

