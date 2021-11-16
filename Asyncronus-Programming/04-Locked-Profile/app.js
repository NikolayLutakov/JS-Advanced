async function lockedProfile() {
    const main = document.getElementById('main');

    const users = Object.values(await getUsers());

    renderProfiles();

    function renderProfiles() {
        main.replaceChildren();
        users.forEach((x, i) => {

            const profile = document.createElement('div');
            profile.classList.add('profile');

            const imageUrl = document.createElement('img');
            imageUrl.src = './iconProfile2.png';
            imageUrl.classList.add('userIcon');

            const lockLabel = document.createElement('label');
            lockLabel.textContent = 'Lock';
            const lockRadio = document.createElement('input');
            lockRadio.setAttribute('type', 'radio');
            lockRadio.setAttribute('name', `user${i + 1}Locked`);
            lockRadio.value = 'lock';
            lockRadio.checked = true;


            const unlockLabel = document.createElement('label');
            unlockLabel.textContent = 'Unlock';
            const unlockRadio = document.createElement('input');
            unlockRadio.setAttribute('type', 'radio');
            unlockRadio.setAttribute('name', `user${i + 1}Locked`);
            unlockRadio.value = 'unlock';

            const hr = document.createElement('hr');

            const usernameLabel = document.createElement('label');
            usernameLabel.textContent = 'Username'

            const usernameInput = document.createElement('input');
            usernameInput.setAttribute('type', 'text');
            usernameInput.setAttribute('name', `user${i + 1}Username`);
            usernameInput.setAttribute('value', `${x.username}`);
            usernameInput.setAttribute('disabled', 'true');
            usernameInput.setAttribute('readOnly', 'true');
            usernameInput.disabled = true;
            usernameInput.readOnly = true;

            const userHiddenFields = document.createElement('div');
            userHiddenFields.setAttribute('id', `user${i + 1}HiddenFields`);
            const hr1 = document.createElement('hr');
            userHiddenFields.appendChild(hr1);

            const emailLabel = document.createElement('label');
            emailLabel.textContent = 'Email:';
            const emailInput = document.createElement('input');
            emailInput.setAttribute('type', 'email');
            emailInput.setAttribute('value', `${x.email}`);
            emailInput.setAttribute('disabled', 'true');
            emailInput.setAttribute('readOnly', 'true');
            userHiddenFields.appendChild(emailLabel);
            userHiddenFields.appendChild(emailInput);

            const ageLabel = document.createElement('label');
            ageLabel.textContent = 'Age:';
            const ageInput = document.createElement('input');
            ageInput.setAttribute('type', 'number');
            ageInput.setAttribute('value', `${x.age}`);
            ageInput.setAttribute('disabled', 'true');
            ageInput.setAttribute('readOnly', 'true');
            userHiddenFields.appendChild(ageLabel);
            userHiddenFields.appendChild(ageInput);

            const showMoreBtn = document.createElement('button');
            showMoreBtn.textContent = 'Show more';
            showMoreBtn.addEventListener('click', showMore);

            profile.appendChild(imageUrl);
            profile.appendChild(lockLabel);
            profile.appendChild(lockRadio);
            profile.appendChild(unlockLabel);
            profile.appendChild(unlockRadio);
            profile.appendChild(hr);
            profile.appendChild(usernameLabel);
            profile.appendChild(usernameInput);
            profile.appendChild(userHiddenFields);
            profile.appendChild(showMoreBtn);
            main.appendChild(profile);
        });
    }

    function showMore(event) {
        const profile = event.target.parentElement;
        const isActive = profile
            .querySelector('input[type="radio"][value="unlock"]')
            .checked;

        if (isActive) {
            const detailsDiv = profile.querySelector('div');

            if (event.target.textContent == 'Show more') {
                detailsDiv.style.display = 'block';
                event.target.textContent = 'Hide it';
            } else {
                detailsDiv.style.display = 'none';
                event.target.textContent = 'Show more';
            }
        }
    }

    async function getUsers() {
        try {
            const url = `http://localhost:3030/jsonstore/advanced/profiles`;
            const res = await fetch(url);
            if (res.status != 200) {
                throw new Error(`${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            return data;
        } catch (error) {
            main.innerHTML = `<h1>Error loading page!</h1>
            <span>${error.message}</span>`
        }
    }
}

