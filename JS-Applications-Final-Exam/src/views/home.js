import { html } from '../common/lib.js';
import { renderPage } from '../common/utilities.js';
import { getById } from '../data/data.js';

const homeTemplate = () => html`
<section id="welcomePage">
    <div id="welcome-message">
        <h1>Welcome to</h1>
        <h1>My Music Application!</h1>
    </div>

    <div class="music-img">
        <img src="/images/musicIcons.webp">
    </div>
</section>`;

export async function homePage(ctx) {
    renderPage(ctx, homeTemplate());
}