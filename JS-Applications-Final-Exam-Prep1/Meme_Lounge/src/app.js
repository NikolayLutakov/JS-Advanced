import { logout } from "./api/data.js";
import { render, page } from "./common/lib.js";
import { getUserData } from "./common/util.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { myProfilePage } from "./views/my-profile.js";
import { registerPage } from "./views/register.js";
import { welcomePage } from "./views/welcome.js";

const root = document.querySelector('main');
document.getElementById('logout').addEventListener('click', onLogout)

page(decorateContext);
page('/', welcomePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/my-profile', myProfilePage);
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
        document.querySelector('.user').style.display = 'inline-block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.profile>span').textContent = `Wellcome, ${userData.email}`;
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'inline-block';
    }
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}