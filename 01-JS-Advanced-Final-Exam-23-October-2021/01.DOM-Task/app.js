window.addEventListener('load', solve);

function solve() {
    const genreInput = document.getElementById('genre');
    const nameInput = document.getElementById('name');
    const authorInput = document.getElementById('author');
    const dateInput = document.getElementById('date');
    
    const addBtn = document.getElementById('add-btn');
    addBtn.addEventListener('click', add);

    const allHitsContainer = document.getElementsByClassName('all-hits-container')[0];
    const savedContainer = document.getElementsByClassName('saved-container')[0];


    function add(e){
        e.preventDefault();
        if(!validateInput()){
            
            return;
        }

        const image = document.createElement('img');
        image.src = './static/img/img.png';

        const genre = document.createElement('h2');
        genre.textContent = 'Genre: ' + genreInput.value;

        const name = document.createElement('h2');
        name.textContent = 'Name: ' + nameInput.value;

        const author = document.createElement('h2');
        author.textContent = 'Author: ' + authorInput.value;

        const date = document.createElement('h3');
        date.textContent = 'Date: ' + dateInput.value;

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('save-btn');
        saveBtn.textContent = 'Save song';
        saveBtn.addEventListener('click', saveSong)

        const likeBtn = document.createElement('button');
        likeBtn.classList.add('like-btn');
        likeBtn.textContent = 'Like song';
        likeBtn.addEventListener('click', likeSong)

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteSong);

        const hitsInfo = document.createElement('div');
        hitsInfo.classList.add('hits-info');
        hitsInfo.appendChild(image);
        hitsInfo.appendChild(genre);
        hitsInfo.appendChild(name);
        hitsInfo.appendChild(author);
        hitsInfo.appendChild(date);
        hitsInfo.appendChild(saveBtn);
        hitsInfo.appendChild(likeBtn);
        hitsInfo.appendChild(deleteBtn);

        allHitsContainer.appendChild(hitsInfo);
        
        genreInput.value = '';
        nameInput.value = '';
        authorInput.value = '';
        dateInput.value = '';
    }

    function saveSong(e){
        const song = e.target.parentNode
        allHitsContainer.removeChild(song);
        
        const saveButton = song.querySelector('.save-btn');
        const likeButton = song.querySelector('.like-btn');
        saveButton.remove()
        likeButton.remove()

        
        savedContainer.appendChild(song);

        
    }

    function likeSong(e){
        e.target.disabled = true;

        const totalLikes = document.querySelector('.likes p')
        
        let totalLikesValue = Number(totalLikes.textContent.substring(13, totalLikes.textContent.length))
        
        totalLikes.textContent = `Total Likes: ${++totalLikesValue}`;
        
    }

    function deleteSong(e){
        e.target.parentNode.remove();
    }

    function validateInput(){
        const genreValue = genreInput.value
        const nameValue = nameInput.value
        const authorValue = authorInput.value
        const dateValue = dateInput.value
        if(genreValue == '' ||
            nameValue == '' ||
            authorValue == '' ||
            dateValue == ''){
                return false
            }
            return true;
    }

}