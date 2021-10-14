function validate() {
    const input = document.getElementById('email');
    const validator = /[a-z]{1,}@[a-z]{1,}\.[a-z]{1,}/;

    input.addEventListener('change', () => {
        if(!validator.test(input.value)){
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    })
}