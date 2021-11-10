import { updateNav } from './app.js';
import { showView } from './dom.js';
import { showHome } from './home.js';

// initialization
// - find relevant section
// - detach section from DOM
const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);
section.remove();

// display logic

export function showRegister(){
    showView(section);
}


async function onRegister(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repeatPass = formData.get('repeatPassword').trim();
    
    if(password != repeatPass){
        alert('Passwords don\'t match!');
        return;
    }


    try {
        const res = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})

        });

        if(res.ok == false){
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();

        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken
        }));
        form.reset();
        updateNav();
        showHome();
    } catch (err) {
        alert(err.message);
    }
}