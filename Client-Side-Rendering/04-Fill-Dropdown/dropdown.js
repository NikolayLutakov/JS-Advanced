import { html, render } from './node_modules/lit-html/lit-html.js';

const slectTemplate = (items) => html`
<select>
    ${items.map(i => html`<option value=${i._id}>${i.text}</option>`)}
</select>`;

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const root = document.querySelector('div');
document.querySelector('form').addEventListener('submit', addItem)
getData();

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    update(Object.values(data));
}

function update(items) {
    const result = slectTemplate(items);
    render(result, root);
}

async function addItem(e) {
    e.preventDefault();
    const text = document.getElementById('itemText').value;

    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    });
    
    if(res.ok){
        getData();
    }
}