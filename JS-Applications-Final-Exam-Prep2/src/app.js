import { page } from './common/lib.js';
import { dashboardPage } from './views/dashboard.js';
import { getUserData } from './common/utilities.js';
import { render } from './common/lib.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { myBooksPage } from './views/my-books.js';
import { registerPage } from './views/register.js';
import { logout } from './data/data.js';

const root = document.querySelector('main');
document.getElementById('logout').addEventListener('click', onLogout);

page(decorateContext);
page('/', dashboardPage);
page('/add-book', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/my-books', myBooksPage);
page('/register', registerPage);
updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.querySelector('#user').style.display = 'inline-block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user>span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'inline-block';
    }
}


function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}