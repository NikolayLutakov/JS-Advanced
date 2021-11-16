import { getDateTime } from './app.js';
import { showComments } from './comments.js';
import { e, showView } from './dom.js';

const section = document.getElementById('home');
const topicContainer = section.querySelector('.topic-container');
const form = section.querySelector('form');
const cancelBtn = form.querySelectorAll('button')[0]
cancelBtn.setAttribute('type', 'button')
cancelBtn.addEventListener('click', onCancel);
form.addEventListener('submit', onSubmit);

export function showHome() {
    form.reset();
    showView(section);
    getTopics();
}

function onCancel() {
    form.reset();
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const title = formData.get('topicName');
    const username = formData.get('username');
    const post = formData.get('postText');
    const created = Date.now();

    const data = {
        title,
        username,
        post,
        created
    }

    if (Object.values(data).some(x => x == '')) {
        alert('All fields are required');
        return;
    }

    try {
        const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(res.ok == false){
            const error = await res.json();
            throw new Error(error.message);
        }
        await res.json();
        showHome();
    } catch (err) {
        alert(err.message)
    }

}

async function getTopics() {
    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const data = await res.json();
    topicContainer.replaceChildren(...Object.values(data).map(createTopic));
}

function createTopic(topic) {
    const element = e('div', { className: 'topic-name-wrapper' },
        e('div', { className: 'topic-name' },
            e('a', { className: 'normal', href: '#', onClick: onTopic },
                e('h2', {}, `${topic.title}`)
            ),
            e('div', { className: 'columns' },
                e('div', {},
                    e('p', {}, 'Date: ',
                        e('time', {}, `${new Date(topic.created).toISOString()}`)
                    ),
                    e('div', { className: 'nick-name' },
                        e('p', {}, 'Username: ',
                            e('span', {}, `${topic.username}`)
                        )
                    )
                )
            )
        )
    );
    return element;

    async function onTopic() {
        showComments(topic);
    }
}

