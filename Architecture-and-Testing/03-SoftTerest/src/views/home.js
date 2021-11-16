const section = document.getElementById('home-page');
section.remove();
section.querySelector('#get-started-link').addEventListener('click', (event) => {
    event.preventDefault();
    ctx.goTo('catalog')
});

let ctx = null;

export async function showHomePage(ctxTarget) {
    ctx = ctxTarget
    ctx.showSection(section);
}