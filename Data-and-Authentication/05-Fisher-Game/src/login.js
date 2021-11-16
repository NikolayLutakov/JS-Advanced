window.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
       window.location = './index.html';
    }
    document.getElementById('user').style.display = 'none';
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', onLogin);
});

async function onLogin(e) {
    e.preventDefault();
    const notification = document.querySelector('.notification')
    notification.textContent = '';
    const formData = new FormData(e.target);

    const email = formData.get('email');
    const password = formData.get('password');

    if(email == '' || password == ''){
        notification.textContent = 'Email and Password are required!'
        return;
    }

    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }

        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = './index.html';
    } catch (err) {
        notification.textContent = err.message;
    }
}