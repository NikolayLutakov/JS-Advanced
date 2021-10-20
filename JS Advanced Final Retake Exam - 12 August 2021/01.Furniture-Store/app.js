window.addEventListener('load', solve);

function solve() {
    const addButton = document.getElementById('add');
    addButton.addEventListener('click', addItem);

    const modelField = document.getElementById('model');
    const yearField = document.getElementById('year');
    const descriptionField = document.getElementById('description');
    const priceField = document.getElementById('price');
    const furnitureList = document.getElementById('furniture-list');
    const totalPriceElement = document.querySelectorAll('tfoot>tr>td')[1];

    const rows = [];
    function addItem(e) {

        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        const moreBtn = document.createElement('button');
        moreBtn.classList.add('moreBtn');
        moreBtn.innerText = 'More Info';
        moreBtn.addEventListener('click', showMore);

        const buyBtn = document.createElement('button');
        buyBtn.classList.add('buyBtn');
        buyBtn.innerText = 'Buy it';
        buyBtn.addEventListener('click', buy);

        const buttonsTd = document.createElement('td');
        buttonsTd.appendChild(moreBtn);
        buttonsTd.appendChild(buyBtn);

        const modelTd = document.createElement('td');
        modelTd.innerText = modelField.value;

        const priceTd = document.createElement('td')
        priceTd.innerText = Number(priceField.value).toFixed(2);

        const YearTd = document.createElement('td');
        YearTd.innerText = 'Year: ' + yearField.value;

        const descriptionTd = document.createElement('td');
        descriptionTd.colSpan = '3';
        descriptionTd.innerText = 'Description: ' + descriptionField.value;

        const descriptionRow = document.createElement('tr');
        descriptionRow.classList.add('hide');
        descriptionRow.appendChild(YearTd);
        descriptionRow.appendChild(descriptionTd);

        const mainRow = document.createElement('tr');
        mainRow.classList.add('info');
        mainRow.appendChild(modelTd);
        mainRow.appendChild(priceTd);
        mainRow.appendChild(buttonsTd);

        furnitureList.appendChild(mainRow);
        furnitureList.appendChild(descriptionRow)
        rows.push(mainRow);
        rows.push(descriptionRow);

        modelField.value = '';
        yearField.value = '';
        descriptionField.value = '';
        priceField.value = '';

    }

    function showMore(e) {
        const row = e.target.parentNode.parentNode;
        const next = row.parentNode.rows[row.rowIndex];

        if ( next.style.display == '') {
            e.target.innerText = 'Less Info';
            next.style.display = 'contents';
        } else {
            e.target.innerText = 'More Info';
            next.style.display = '';
        }
    }

    function buy(e) {
        let totalPriceValue = Number(totalPriceElement.innerText);
        const row = e.target.parentNode.parentNode;
        const next = row.parentNode.rows[row.rowIndex];
        let price = Number(e.target.parentNode.parentNode.children[1].innerText);

        furnitureList.removeChild(row);
        furnitureList.removeChild(next);
        
        newPrice = totalPriceValue + price;
        totalPriceElement.innerText = newPrice.toFixed(2);
    }

    function validateFields() {
        modelValue = modelField.value;
        yearValue = yearField.value;
        descriptionValue = descriptionField.value;
        priceValue = priceField.value;

        if (modelValue == null
            || modelValue == ''
            || descriptionValue == null
            || descriptionValue == '') {
            return false;
        }

        if (yearValue == null
            || !Number(yearValue)
            || yearValue < 1
            || priceValue == null
            || !Number(priceValue)
            || priceValue < 1) {
            return false;
        }

        return true;
    }
}
