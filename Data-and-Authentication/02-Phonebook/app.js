function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadEntries);
    document.getElementById('btnCreate').addEventListener('click', createEntry)
}

attachEvents();

async function loadEntries(event) {
    const btn = event.target;
    btn.disabled = true;
    removeInfoDiv();
    const url = 'http://localhost:3030/jsonstore/phonebook';
    try {
        const phoneEntities = await makeRequest(url);
        renderPhones(phoneEntities);
    }
    catch (err) {
        showInfo(err.message, false);
    }
    btn.disabled = false;
}

function renderPhones(phones) {
    const phonebook = document.getElementById('phonebook');
    phonebook.replaceChildren();
    Object.values(phones).forEach(x => {
        const li = document.createElement('li');
        li.textContent = `${x.person}: ${x.phone}`;
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.value = x._id;
        btn.addEventListener('click', deleteEntity)
        li.appendChild(btn);
        phonebook.appendChild(li);
    });
}

async function createEntry(e) {
    removeInfoDiv();
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const btn = e.target;
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    if (personInput.value == '' || phoneInput.value == '') {
        showInfo('Fields "Person" and "Phone" are required!', false);
        return;
    }

    const person = personInput.value.trim();
    const phone = phoneInput.value.trim();

    personInput.value = '';
    phoneInput.value = '';

    const data = {
        person,
        phone
    }
    
    const options = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    try {
        const result = await makeRequest(url, options)
        showInfo(`${result.person} created successfully.`, true);
    } catch (err) {
        showInfo(err.message, false);
    }
}

async function deleteEntity(event) {
    removeInfoDiv();
    const id = event.target.value;
    event.target.disabled = true;
    const url = 'http://localhost:3030/jsonstore/phonebook/' + id;

    const options = {
        method: 'DELETE'
    }
    try {
        const result = await makeRequest(url, options);
        event.target.parentNode.remove();
        showInfo(`${result.person} deleted successfully.`, true);
    } catch (err) {
        showInfo(err.message, false);
    }

}

async function makeRequest(url, options) {
    const response = await fetch(url, options);
    if (response.status != 200) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

function showInfo(message, flag) {
    const infoDiv = document.createElement('div');
    infoDiv.setAttribute('id', 'infoDiv');
    infoDiv.style.textAlign = 'center';
    if (flag) {
        infoDiv.style.backgroundColor = '#98fb98';
    } else {
        infoDiv.style.backgroundColor = '#ff4500';
    }
    infoDiv.textContent = message;
    document.querySelector('body').appendChild(infoDiv);
}

function removeInfoDiv() {
    const infoDiv = document.getElementById('infoDiv');
    if (infoDiv) {
        infoDiv.remove();
    }
}