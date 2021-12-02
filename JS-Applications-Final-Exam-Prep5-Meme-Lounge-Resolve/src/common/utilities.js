export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}

export function renderPage(ctx, pageLayout) {
    ctx.render(pageLayout);
}

export function showNotification(message){
    const errorBox = document.getElementById('errorBox');
    console.log(errorBox);
    errorBox.querySelector('span').textContent = message;
    errorBox.style.display = 'block';

    setTimeout(() => errorBox.style.display = 'none', 3000);
}