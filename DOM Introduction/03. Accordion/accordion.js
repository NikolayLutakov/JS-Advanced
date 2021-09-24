function toggle() {
    const button = document.getElementsByClassName('button')[0];
    const extra = document.getElementById('extra');
    let buttonText = button.innerText.toLowerCase();
    if(buttonText == 'more'){
        button.innerText = 'Less';
        extra.style.display = 'block';
    } else {
        button.innerText = 'More'
        extra.style.display = 'none';
    }
}