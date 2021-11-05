function attachEvents() {
    const refreshBtn = document.getElementById('refresh');
    const sendBtn = document.getElementById('submit');

    refreshBtn.addEventListener('click', refreshMessages);
    sendBtn.addEventListener('click', sendMessage);
}

async function refreshMessages(event) {
    removeInfoDiv();
    const btn = event.target;
    const textArea = document.getElementById('messages');
    const url = 'http://localhost:3030/jsonstore/messenger';
    let messagesString = '';
    btn.disabled = true;
    try {
        const messages = Object.values(await makeRequest(url));
        messages.forEach(m => {
            messagesString += `${m.author}: ${m.content}\n`
        });

    }
    catch (err) {
        showInfo(`Error: ${err.message}`, false);
        return;
    }

    textArea.value = messagesString.trimEnd();
    btn.disabled = false;
}

async function sendMessage(event) {
    removeInfoDiv();
    const nameInput = document.querySelector('[name="author"]');
    const messageInput = document.querySelector('[name="content"]');

    if (nameInput.value == '' || messageInput.value == '') {
        showInfo('Fields "Name" and "Message" are required!', false);
        return;
    }

    const btn = event.target;
    const url = 'http://localhost:3030/jsonstore/messenger';

    const author = nameInput.value.trim();
    const content = messageInput.value.trim();

    nameInput.value = '';
    messageInput.value = '';

    const data = {
        author,
        content
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(data)
    }

    btn.disabled = true;
    try {
        await makeRequest(url, options);
    }
    catch (err) {
        showInfo(`Error: ${err.message}`, false);
        return;
    }
    showInfo('Message sent successfully.', true);
    btn.disabled = false;
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
    infoDiv.setAttribute('text-align', 'center');
    if (flag) {
        infoDiv.style.backgroundColor = '#98fb98';
    } else {
        infoDiv.style.backgroundColor = '#ff4500';
    }
    infoDiv.textContent = message;
    document.getElementById('main').appendChild(infoDiv);
}

function removeInfoDiv() {
    const infoDiv = document.getElementById('infoDiv');
    if (infoDiv) {
        infoDiv.remove();
    }
}

attachEvents();