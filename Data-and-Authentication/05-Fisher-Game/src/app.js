let userData = null;
window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#addForm  .add').disabled = false;
        document.querySelector('p[class="email"] span').textContent = userData.email;
    } else {
        document.getElementById('user').style.display = 'none';
    }

    document.querySelector('.load').addEventListener('click', loadData);
    document.getElementById('addForm').addEventListener('submit', onCreateSubmit);
    document.getElementById('logout').addEventListener('click', onLogout);
    const catches = document.getElementById('catches');
    catches.replaceChildren();
    catches.addEventListener('click', onClick);
});

function onClick(e){
    const selector = {
        'update': updateCatch,
        'delete': deleteCatch,
    }
    
    const target = e.target;
    
    if(target.tagName == 'BUTTON'){
        selector[target.textContent.toLowerCase()](target);
    }
}

async function updateCatch(target){
    const catchId = target.getAttribute('data-id');
    
    const data = [...target.parentNode.querySelectorAll('input')]
    .reduce((a, c) => Object.assign(a, { [c.getAttribute('class')]: c.value }), {});

    try {
        if (Object.values(data).some(x => x == '')) {
            throw new Error('Al fields are required!');
        }

        const res = await fetch('http://localhost:3030/data/catches/' + catchId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        loadData();
    } catch (err) {
        alert(err.message);
    }
}

async function deleteCatch(target){
    const catchId = target.getAttribute('data-id');
    try {
        const res = await fetch('http://localhost:3030/data/catches/' + catchId, {
            method: 'DELETE',
            headers: {
                'X-Authorization': userData.token
            }
        });
        
        loadData();
    } catch (err) {
        alert(err.message);
    }
}

async function onLogout(){
    if(userData == null){
        return;
    }

    try {
        const res = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': userData.token
            }
        });
        console.log(res);
    } catch (err) {
        alert(err.message);
    }
    
    sessionStorage.clear();
    window.location = './index.html';
}

async function onCreateSubmit(e) {
    e.preventDefault();
    if (!userData) {
        window.location = './login.html';
        return;
    }
    const formData = new FormData(e.target);
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

    try {
        if (Object.values(data).some(x => x == '')) {
            throw new Error('Al fields are required!');
        }

        const res = await fetch('http://localhost:3030/data/catches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        });

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        loadData();
        e.target.reset();
    } catch (err) {
        alert(err.message);
    }
}

async function loadData() {
    const res = await fetch('http://localhost:3030/data/catches');
    const data = await res.json();

    document.getElementById('catches').replaceChildren(...data.map(createPreview));
}

function createPreview(item) {
    let isOwner = false;
    if(userData){
        isOwner = item._ownerId == userData.id
    }

    const element = document.createElement('div');
    element.classList.add('catch');
    element.innerHTML = `<label>Angler</label>
<input type="text" class="angler" value="${item.angler}" ${!isOwner ? 'disabled' : ''}>
<label>Weight</label>
<input type="text" class="weight" value="${item.weight}" ${!isOwner ? 'disabled' : ''}>
<label>Species</label>
<input type="text" class="species" value="${item.species}" ${!isOwner ? 'disabled' : ''}>
<label>Location</label>
<input type="text" class="location" value="${item.location}" ${!isOwner ? 'disabled' : ''}>
<label>Bait</label>
<input type="text" class="bait" value="${item.bait}" ${!isOwner ? 'disabled' : ''}>
<label>Capture Time</label>
<input type="number" class="captureTime" value="${item.captureTime}" ${!isOwner ? 'disabled' : ''}>
<button class="update" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Update</button>
<button class="delete" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Delete</button>`;

    return element;
}