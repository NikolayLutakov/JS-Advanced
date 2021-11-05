function attachEvents() {
    document.getElementById('form').addEventListener('submit', createRecord);
    refreshResults();
}

async function createRecord(event) {
    event.preventDefault();
    removeInfoDiv();
    const form = event.target;
    const formData = new FormData(form);
    const firstName = formData.get('firstName').trim();
    const lastName = formData.get('lastName').trim();
    const facultyNumber = formData.get('facultyNumber').trim();
    const grade = formData.get('grade').trim();

    try {
        validateInput(firstName, lastName, facultyNumber, grade);
    } catch (err) {
        showInfo(err.message, false);
        return;
    }
    form.reset()
    const data = {
        firstName,
        lastName,
        facultyNumber,
        grade: Number(grade)
    }

    try {
        await postData(data);
    } catch (err) {
        showInfo(err.message, false)
        return;
    }
    addRecordToTable(data);
}

async function postData(data) {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const result = await makeRequest(url, options)
    showInfo(`Student "${result.firstName} ${result.lastName}" added successfully.`, true)
}

function addRecordToTable(data) {
    const tableBody = document.querySelector('table>tbody');
    const row = document.createElement('tr');
    const firstNameTd = document.createElement('td');
    firstNameTd.textContent = data.firstName;

    const lastNameTd = document.createElement('td');
    lastNameTd.textContent = data.lastName;

    const facultyNumberTd = document.createElement('td');
    facultyNumberTd.textContent = data.facultyNumber;

    const gradeTd = document.createElement('td');
    gradeTd.textContent = data.grade;

    row.appendChild(firstNameTd);
    row.appendChild(lastNameTd);
    row.appendChild(facultyNumberTd);
    row.appendChild(gradeTd);

    tableBody.appendChild(row);
}

async function refreshResults() {
    const tableBody = document.querySelector('table>tbody');
    tableBody.replaceChildren();
    let result = '';
    try {
        result = Object.values(await getStudents());
    }
    catch (err) {
        showInfo(err.message, false);
        return;
    }

    result.forEach(x => {
        const row = document.createElement('tr');

        const firstNameTd = document.createElement('td');
        firstNameTd.textContent = x.firstName;

        const lastNameTd = document.createElement('td');
        lastNameTd.textContent = x.lastName;

        const facultyNumberTd = document.createElement('td');
        facultyNumberTd.textContent = x.facultyNumber;

        const gradeTd = document.createElement('td');
        gradeTd.textContent = x.grade;

        row.appendChild(firstNameTd);
        row.appendChild(lastNameTd);
        row.appendChild(facultyNumberTd);
        row.appendChild(gradeTd);

        tableBody.appendChild(row);
    });
}

async function getStudents() {
    const url = 'http://localhost:3030/jsonstore/collections/students';

    data = await makeRequest(url);
    return data;
}

function validateInput(firstName, lastName, facultyNumber, grade) {
    if (firstName == '' || lastName == '' || facultyNumber == '' || grade == '') {
        throw new Error('All fields are required!');
    }

    if (isNaN(Number(facultyNumber))) {
        throw new Error('Field "Faculty Number" must be a number!');
    }

    if (isNaN(Number(grade))) {
        throw new Error('Field "Grade" must be a number!');
    }

    if (Number(grade) < 2 || Number(grade) > 6) {
        throw new Error('Grade value must be between 2.0 and 6.0!');
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
    infoDiv.style.marginTop = '5px';
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

attachEvents();