function solve() {
    function moveToComplete(event) {
        let article = event.target.parentElement.parentElement;
        article.querySelector('div').remove();
        completeSectionDiv.appendChild(article);
    }

    function moveToInProgress(event) {
        let article = event.target.parentElement.parentElement;
        let finishBtn = article.querySelector('button:nth-child(2)');
        finishBtn.className = 'orange';
        finishBtn.textContent = 'Finish';
        finishBtn.addEventListener('click', moveToComplete);
        let deleteBtn = article.querySelector('button:nth-child(1)');
        deleteBtn.className = 'red';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function (event) {
            let article = event.target.parentElement.parentElement;
            article.remove();
        });

        inProgressSectionDiv.appendChild(article);
    }

    function moveToOpen(event) {
        event.preventDefault();
        if (taskEl.value !== '' && taslDescriptionEl.value !== '' && dueDateEl.value !== '') {

            let newArticle = document.createElement('article');

            let newH3 = document.createElement('h3');
            newH3.textContent = taskEl.value;
            let newP1 = document.createElement('p');
            newP1.textContent = `Description: ${taslDescriptionEl.value}`;
            let newP2 = document.createElement('p');
            newP2.textContent = `Due Date: ${dueDateEl.value}`;

            let newDiv = document.createElement('div');
            newDiv.className = 'flex';
            let startBtn = document.createElement('button');
            startBtn.className = 'green';
            startBtn.textContent = 'Start';
            startBtn.addEventListener('click', moveToInProgress);
            let deleteBtn = document.createElement('button');
            deleteBtn.className = 'red';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', (event) => {
                let article = event.target.parentElement.parentElement;
                article.remove();
            })
            newDiv.appendChild(startBtn);
            newDiv.appendChild(deleteBtn);

            newArticle.appendChild(newH3);
            newArticle.appendChild(newP1);
            newArticle.appendChild(newP2);
            newArticle.appendChild(newDiv);
            openSectionDiv.appendChild(newArticle);
        }
    }

    let formButton = document.querySelector('form button');
    let formInputs = Array.from(document.querySelectorAll('form input'));
    formInputs.push(document.querySelector('form textarea'));
    let taskEl = formInputs[0];
    let taslDescriptionEl = formInputs[2];
    let dueDateEl = formInputs[1];

    let openSectionDiv = document.querySelector('section:nth-child(2) div:nth-child(2)');
    let inProgressSectionDiv = document.querySelector('section:nth-child(3) div:nth-child(2)');
    let completeSectionDiv = document.querySelector('section:nth-child(4) div:nth-child(2)');

    formButton.addEventListener('click', moveToOpen);
}