const box = document.getElementById('errorBox');

export function showError(message){
    box.querySelector('span').textContent = message;
    box.style.display = 'block';

    setTimeout(() => {box.style.display = 'none'}, 3000);
}