function getInfo() {
    const stopIdInput = document.getElementById('stopId');
    const stopNameDiv = document.getElementById('stopName');
    const bussesUl = document.getElementById('buses');
    const inputValue = stopIdInput.value;
    let url = `http://localhost:3030/jsonstore/bus/businfo/${inputValue}`

    if(inputValue != '' && inputValue.replaceAll(' ', '') != ''){
        requestData();
    }
    
    
    function processData(data){
        
        stopNameDiv.innerHTML = data.name;
        
        for(const bus in data.buses){
            const li = document.createElement('li');
            li.innerText = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
            bussesUl.appendChild(li);
        }
    }

    function processError(error){
       
        stopNameDiv.innerHTML = 'Error';
    }

    async function requestData() {
        try {
            stopIdInput.value = '';
            stopNameDiv.innerHTML = 'Loading...';
            bussesUl.innerHTML = '';
            const response = await fetch(url);
            if (response.status != 200) {
                throw new Error('Error');
            }

            const data = await response.json();
            processData(data);
        }
        catch (error) {
            processError(error);
        }
    }
}