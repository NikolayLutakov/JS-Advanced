function solve() {
    const departBtn = document.getElementById('depart');
    const ariveBtn = document.getElementById('arrive');
    const infoSpan = document.getElementById('info').childNodes[0];

    let currentName = '';
    let nextId = 'depot';  

    function depart() {
        getData();
    }

    function arrive() {
        infoSpan.textContent = `Arriving at ${currentName}`;
        ariveBtn.disabled = true;
        departBtn.disabled = false;
    }

    async function getData() {
        try {
            departBtn.disabled = true;

            const url = `http://localhost:3030/jsonstore/bus/schedule/${nextId}`;
            const res = await fetch(url);

            if (res.status != 200) {
                throw new Error('Error');
            }

            const data = await res.json();
            
            processData(data);
        }
        catch (err) {
            processError(err)
        }
    }

    function processData(data) {

        currentName = data.name;
        nextId = data.next;

        infoSpan.textContent = `Next stop ${currentName}`;
        ariveBtn.disabled = false;
    }

    function processError(err) {
        infoSpan.textContent = 'Error';
        departBtn.disabled = true;
        ariveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();