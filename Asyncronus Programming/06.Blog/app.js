function attachEvents() {
    const loadPostsBtn = document.getElementById('btnLoadPosts');
    loadPostsBtn.addEventListener('click', getAllPosts);

    const viewPostBtn = document.getElementById('btnViewPost');
    viewPostBtn.addEventListener('click', displayPost);
}

async function displayPost(){
    const selectedId = document.getElementById('posts').value;

    const [post, comments] = await Promise.all([getPostById(selectedId), getCommentsByPostId(selectedId)]);

    if(post && comments){
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-body').textContent = post.body;
    
        const ul = document.getElementById('post-comments');
        ul.replaceChildren();
    
        comments.forEach(x => {
            const li = document.createElement('li');
            li.textContent = x.text;
            ul.appendChild(li);
        });
    }
    
}

async function getAllPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';

    try {
        const res = await fetch(url);
        if (res.status != 200) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        populateList(data);
    } catch (error) {
        handleError(error);
    }
}

async function getPostById(id) {
    const url = 'http://localhost:3030/jsonstore/blog/posts/' + id;

    try {
        const res = await fetch(url);
        if (res.status != 200) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        handleError(error);
    }
}

async function getCommentsByPostId(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/comments';

    try {
        const res = await fetch(url);
        if (res.status != 200 || res.ok == false) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const data = await res.json();

        return Object.values(data).filter(c => c.postId == postId);
    } catch (error) {
        handleError(error);
    }  
}

function handleError(error){
    document.getElementById('post-title').textContent = `Error: ${error.message}`;
    document.getElementById('post-body').textContent = '';
    document.getElementById('post-comments').replaceChildren();
}

function populateList(data){
    const selectElement = document.getElementById('posts');
    selectElement.replaceChildren();
    Object.values(data).forEach(x => {
        const optionElement = document.createElement('option');
        optionElement.textContent = x.title;
        optionElement.value = x.id;
        selectElement.appendChild(optionElement);
    });
}

attachEvents();