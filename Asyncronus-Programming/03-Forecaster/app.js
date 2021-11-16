function attachEvents() {
    const getWeatherBtn = document.getElementById('submit');
    getWeatherBtn.addEventListener('click', getLocations);

    const desiredLocationInput = document.getElementById('location');
    const forecastSection = document.getElementById('forecast');

    const forecastDiv = document.getElementById('current');
    const upcommingDiv = document.getElementById('upcoming');

    async function getLocations() {

        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const data = await makeRequest(url);

        const errorElmnt = document.getElementById('errorDiv');

        if (errorElmnt != null) {
            errorElmnt.remove();
        }

        dataArr = Object.values(data);

        const location = data.find(x => x.name.toLowerCase() == desiredLocationInput.value.toLowerCase());

        if (!location) {
            processError();
            return;
        }

        const currentConditionUrl = `http://localhost:3030/jsonstore/forecaster/today/${location.code}`;
        const upcomingConditionUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`;
        const [current, upcoming] = await Promise.all([makeRequest(currentConditionUrl), makeRequest(upcomingConditionUrl)]);

        desiredLocationInput.value = '';
        renderWheather(current, upcoming);
    }

    async function makeRequest(url) {
        try {
            const res = await fetch(url);
            if (res.status != 200) {
                throw new Error('Error');
            }

            const data = await res.json();
            return data;

        } catch (error) {
            processError();
        }
    }

    function processError() {
        forecastSection.innerHTML = '';
        forecastSection.style.display = 'block';
        const errorDiv = document.createElement('div');
        errorDiv.setAttribute("id", "errorDiv");
        errorDiv.style.textAlign = 'center';
        errorDiv.style.backgroundColor = 'red';
        const errorMsg = document.createElement('h1');
        errorMsg.innerText = 'Error';
        errorDiv.appendChild(errorMsg);
        forecastSection.insertBefore(errorDiv, forecastSection.firstChild);
    }

    function renderWheather(current, upcoming) {
        const symbols = {
            'Sunny': '&#x2600',
            'Partly sunny': '&#x26C5',
            'Overcast': '&#x2601',
            'Rain': '&#x2614',
            'Degrees': '&#176'
        }

        forecastSection.innerHTML = '';
        forecastSection.appendChild(forecastDiv);
        forecastSection.appendChild(upcommingDiv);

        const symbolSpan = document.createElement('span');

        symbolSpan.classList.add('condition');
        symbolSpan.classList.add('symbol');
        symbolSpan.innerHTML = symbols[current.forecast.condition];

        const forecastFirstElementChild = forecastDiv.firstElementChild;
        forecastDiv.innerHTML = '';
        forecastDiv.append(forecastFirstElementChild);

        const upcomingFirstElementChild = upcommingDiv.firstElementChild;
        upcommingDiv.innerHTML = '';
        upcommingDiv.append(upcomingFirstElementChild);

        const conditionSpan = document.createElement('span');
        conditionSpan.classList.add('condition');

        const forecastDataSpanName = document.createElement('span');
        forecastDataSpanName.classList.add('forecast-data');
        forecastDataSpanName.textContent = current.name;

        const forecastDataSpanDegree = document.createElement('span');
        forecastDataSpanDegree.classList.add('forecast-data');
        forecastDataSpanDegree.innerHTML = `${current.forecast.low}${symbols.Degrees}/${current.forecast.high}${symbols.Degrees}`;

        const forecastDataSpanCondition = document.createElement('span');
        forecastDataSpanCondition.classList.add('forecast-data');
        forecastDataSpanCondition.textContent = current.forecast.condition

        conditionSpan.appendChild(forecastDataSpanName);
        conditionSpan.appendChild(forecastDataSpanDegree);
        conditionSpan.appendChild(forecastDataSpanCondition);

        const upcomingSpan0 = document.createElement('span');
        upcomingSpan0.classList.add('upcoming');
        const upcomingSymbolSpan0 = document.createElement('span');
        upcomingSymbolSpan0.classList.add('symbol');
        upcomingSymbolSpan0.innerHTML = symbols[upcoming.forecast[0].condition];
        const upcomingDataSpanDegree0 = document.createElement('span');
        upcomingDataSpanDegree0.classList.add('forecast-data');
        upcomingDataSpanDegree0.innerHTML = `${upcoming.forecast[0].low}${symbols.Degrees}/${upcoming.forecast[0].high}${symbols.Degrees}`;
        const upcomingDataSpanCondition0 = document.createElement('span');
        upcomingDataSpanCondition0.classList.add('forecast-data');
        upcomingDataSpanCondition0.textContent = upcoming.forecast[0].condition;
        upcomingSpan0.appendChild(upcomingSymbolSpan0);
        upcomingSpan0.appendChild(upcomingDataSpanDegree0);
        upcomingSpan0.appendChild(upcomingDataSpanCondition0);

        const upcomingSpan1 = document.createElement('span');
        upcomingSpan1.classList.add('upcoming');
        const upcomingSymbolSpan1 = document.createElement('span');
        upcomingSymbolSpan1.classList.add('symbol');
        upcomingSymbolSpan1.innerHTML = symbols[upcoming.forecast[1].condition];
        const upcomingDataSpanDegree1 = document.createElement('span');
        upcomingDataSpanDegree1.classList.add('forecast-data');
        upcomingDataSpanDegree1.innerHTML = `${upcoming.forecast[1].low}${symbols.Degrees}/${upcoming.forecast[1].high}${symbols.Degrees}`;
        const upcomingDataSpanCondition1 = document.createElement('span');
        upcomingDataSpanCondition1.classList.add('forecast-data');
        upcomingDataSpanCondition1.textContent = upcoming.forecast[1].condition;
        upcomingSpan1.appendChild(upcomingSymbolSpan1);
        upcomingSpan1.appendChild(upcomingDataSpanDegree1);
        upcomingSpan1.appendChild(upcomingDataSpanCondition1);

        const upcomingSpan2 = document.createElement('span');
        upcomingSpan2.classList.add('upcoming');
        const upcomingSymbolSpan2 = document.createElement('span');
        upcomingSymbolSpan2.classList.add('symbol');
        upcomingSymbolSpan2.innerHTML = symbols[upcoming.forecast[2].condition];
        const upcomingDataSpanDegree2 = document.createElement('span');
        upcomingDataSpanDegree2.classList.add('forecast-data');
        upcomingDataSpanDegree2.innerHTML = `${upcoming.forecast[2].low}${symbols.Degrees}/${upcoming.forecast[2].high}${symbols.Degrees}`;
        const upcomingDataSpanCondition2 = document.createElement('span');
        upcomingDataSpanCondition2.classList.add('forecast-data');
        upcomingDataSpanCondition2.textContent = upcoming.forecast[2].condition;
        upcomingSpan2.appendChild(upcomingSymbolSpan2);
        upcomingSpan2.appendChild(upcomingDataSpanDegree2);
        upcomingSpan2.appendChild(upcomingDataSpanCondition2);

        upcommingDiv.appendChild(upcomingSpan0);
        upcommingDiv.appendChild(upcomingSpan1);
        upcommingDiv.appendChild(upcomingSpan2);

        forecastSection.style.display = 'block';
        forecastDiv.appendChild(symbolSpan);
        forecastDiv.appendChild(conditionSpan);     
    }
}



attachEvents();