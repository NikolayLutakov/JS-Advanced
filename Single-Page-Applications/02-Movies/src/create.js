import { showView } from './dom.js';
import { showHome } from './home.js';

// initialization
// - find relevant section
// - detach section from DOM

const section = document.getElementById('add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onCreate);
section.remove();

// display logic

export function showCreate() {
    showView(section);
}

async function onCreate(event) {
    event.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const formData = new FormData(event.target);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageUrl').trim();

    const data = {
        title,
        description,
        img
    }

    if (Object.values(data).some(x => x == '')) {
        alert('All fields are required');
        return;
    }

    try {
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });
        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }
        await res.json();
        form.reset();
        showHome();
    } catch (err) {
        alert(err.message);
    }
}