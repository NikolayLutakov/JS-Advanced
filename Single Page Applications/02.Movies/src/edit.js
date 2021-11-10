// initialization
// - find relevant section

import { showDetails } from './details.js';
import { showView } from './dom.js';

// - detach section from DOM
const section = document.getElementById('edit-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onEdit);
section.remove();

// display logic

export function showEdit(movie){
    const titleInput = section.querySelector('#editTitle');
    const descriptionInput = section.querySelector('textarea[name="description"]');
    const imageUrlInput = section.querySelector('#editImageUrl');
    
    titleInput.value = movie.title;
    descriptionInput.value = movie.description;
    imageUrlInput.value = movie.img;

    section.setAttribute('data-movieid', `${movie._id}`)

    showView(section);
}

async function onEdit(event){
    event.preventDefault();
    const movieId = event.target.parentElement.dataset.movieid;
    
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
        const res = await fetch('http://localhost:3030/data/movies/' + movieId, {
            method: 'PUT',
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
        showDetails(movieId);
    } catch (err) {
        alert(err.message);
    }
}