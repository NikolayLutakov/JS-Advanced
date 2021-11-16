function solve() {
    let [nameElement, hallElement, priceElement] = document.querySelectorAll('input');
    let [onScreen, clearScreen] = document.querySelectorAll('button');
    let moviesElement = document.querySelector('#movies ul');
    let archiveElement = document.querySelector('#archive ul');

    function isNumber(n) {
        return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }

    onScreen.addEventListener('click', function (e) {
        e.preventDefault();

        if (nameElement.value.length > 0 && hallElement.value.length > 0 && isNumber(priceElement.value)) {
            let li = document.createElement('li');
            let span = document.createElement('span');
            span.textContent = nameElement.value;
            let strong = document.createElement('strong');
            strong.textContent = `Hall: ${hallElement.value}`;
            let div = document.createElement('div');
            let strong2 = document.createElement('strong');
            strong2.textContent = Number(priceElement.value).toFixed(2);
            let input = document.createElement('input');
            input.placeholder = "Tickets Sold";
            let button = document.createElement('button');
            button.textContent = 'Archive';

            li.appendChild(span);
            li.appendChild(strong);

            div.appendChild(strong2);
            div.appendChild(input);
            div.appendChild(button);
            li.appendChild(div);

            moviesElement.appendChild(li);

            nameElement.value = '';
            hallElement.value = '';
            priceElement.value = '';

            button.addEventListener('click', (e) => {
                if (isNumber(input.value)) {
                    let liMove = document.createElement('li');
                    let strongMove = document.createElement('strong');
                    strongMove.textContent = `Total amount: ${(e.target.parentElement.children[1].value * Number(e.target.parentElement.children[0].textContent)).toFixed(2)}`;
                    let buttonMove = document.createElement('button');
                    buttonMove.textContent = 'Delete';
                    let spanMove = document.createElement('span');
                    spanMove.textContent = e.target.parentElement.parentElement.children[0].textContent;

                    liMove.appendChild(span);
                    liMove.appendChild(strongMove);
                    liMove.appendChild(buttonMove);
                    archiveElement.appendChild(liMove);
                    e.target.parentElement.parentElement.remove();

                    buttonMove.addEventListener('click', (e) => {
                        e.target.parentElement.remove();
                    });
                }
            });
        }
    });

    clearScreen.addEventListener('click', (e) => {
        allLis = Array.from(document.querySelectorAll('#archive li'));
        allLis.forEach(el => {
            el.remove()
        });
    });
}