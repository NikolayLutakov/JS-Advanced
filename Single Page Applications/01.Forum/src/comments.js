import { e, showView } from './dom.js';
import { getDateTime } from './app.js';

const section = document.getElementById('comments');

export async function showComments(topic) {
    section.replaceChildren();

    const res = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`);
    const data = await res.json();

    const comments = Object.values(data).filter(x => x.topicId == topic._id);

    const themeContent = e('div', { className: 'theme-content' });

    const topicTitle = e('div', { className: 'theme-title' },
        e('div', { className: 'theme-name-wrapper' },
            e('div', { className: 'theme-name' },
                e('h2', {}, `${topic.title}`)
            )
        )
    );

    themeContent.appendChild(topicTitle);

    const topicSection = e('div', { className: 'comment' },
        e('div', { className: 'header' },
            e('img', { src: './static/profile.png', alt: 'avatar' }),
            e('p', {}, 'posted on ', e('time', {}, `${new Date(topic.created).toISOString('bg').replace('T', ' ').substring(0, new Date(topic.created).toISOString('bg').indexOf('.'))}`)),
            e('p', { className: 'post-content' }, `${topic.post}`)
        )
    );

    

    comments.forEach(c => {
        const comment = e('div', { id: 'user-comment' },
            e('div', { className: 'topic-name-wrapper' },
                e('div', { className: 'topic-name' },
                    e('p', {},
                        e('strong', {}, `${c.user}`),
                        ' comented on ',
                        e('time', {}, `${new Date(c.created).toLocaleString()}`)
                    ),
                    e('div', { className: 'post-content' },
                        e('p', {}, `${c.comment}`)
                    )
                )
            )
        );
        topicSection.appendChild(comment);
    });

    themeContent.appendChild(topicSection);

    const createCommentForm = e('div', { className: 'answer-comment' },
        e('p', {},
            e('span', {}, 'currentUser'),
            ' comment:'
        ),
        e('div', { className: 'answer' },
            e('form', {},
                e('textarea', { name: 'posText', id: 'comment', cols: '30', rows: '10' }),
                e('div', {},
                    e('label', { for: 'username' }, 'Username ', e('span', { className: 'red' }, '*')),
                    e('input', { type: 'text', name: 'username', id: 'username' })
                ),
                e('button', { type: 'submit', onClick: submitComment }, `Post`)
            )
        )
    );

    createCommentForm.querySelector('form').setAttribute('data-topicid', `${topic._id}`);

    themeContent.appendChild(createCommentForm);

    section.appendChild(themeContent);

    showView(section);

    async function submitComment(event) {
        event.preventDefault();
        const topicId = event.target.parentElement.dataset.topicid;
    
        const formData = new FormData(event.target.parentElement);
    
        const comment = formData.get('posText');
        const user = formData.get('username');
        const created = Date.now();
    
        const data = {
            topicId,
            comment,
            user,
            created
        }
    
        if (Object.values(data).some(x => x == '')) {
            alert('All fields are required');
            return;
        }
    
        try {
            const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
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
            showComments(topic, comments);
        } catch (err) {
            alert(err.message)
        }
    }
}

