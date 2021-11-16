import { deleteById, getById } from '../api/data.js';
import { e } from '../dom.js';

const loadingElement = e('h1', {}, 'Loading...');
const section = document.getElementById('details-page');
section.remove();
let ctx = null;

export async function showDetailsPage(ctxTarget, id) {
    ctx = ctxTarget;
    ctx.showSection(section);
    section.replaceChildren(loadingElement);
    loadIdea(id);
}

async function loadIdea(id) {
    const idea = await getById(id);

    section.replaceChildren(crateIdeaDiv(idea));
}


function crateIdeaDiv(idea) {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(e('img', { className: 'det-img', src: idea.img }));
    fragment.appendChild(e('div', { className: 'desc' },
        e('h2', { className: 'display-5' }, idea.title),
        e('p', { className: 'infoType' }, 'Description:'),
        e('p', { className: 'idea-description' }, idea.description))
    );

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData && userData.id == idea._ownerId) {
        fragment.appendChild(e('div', { className: 'text-center' },
            e('a', { className: 'btn detb', href: '', onClick: onDelete }, 'Delete')
        ));
    }

    return fragment;

    async function onDelete(event) {
        event.preventDefault();
        const confirmed = confirm('Are you sure you want to delete this idea?');
        if(confirmed){
            await deleteById(idea._id);
            ctx.goTo('catalog');
        }
    }
}