function attachEvents() {
    document.getElementById('loginForm').addEventListener('submit', makeLogin)
}

function makeLogin(e) {
    const notification = document.querySelector('.notification');
    notification.textContent = '';
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    if(email == '' || password == ''){
        notification.textContent = 'Email and Password fields are required';
        return;
    }

    //make request

    //save token

    //redirect to home
}

window.onload = attachEvents;