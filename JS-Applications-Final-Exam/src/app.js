import { page, render } from './common/lib.js';
import { getUserData } from './common/utilities.js';
import { logout } from './data/data.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';

const root = document.querySelector('main');
document.getElementById('logout').addEventListener('click', onLogout);

page(decorateContext);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/search', searchPage);
updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    ctx.userData = getUserData();
    next();
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        [...document.querySelectorAll('.user')].forEach(x => x.style.display = 'inline-block');
        [...document.querySelectorAll('.guest')].forEach(x => x.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(x => x.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(x => x.style.display = 'inline-block');
    }
}


function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}