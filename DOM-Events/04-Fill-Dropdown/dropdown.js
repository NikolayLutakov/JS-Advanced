function addItem() {
    const text = document.getElementById('newItemText');
    const value = document.getElementById('newItemValue');

    const item = document.createElement('option');
    document.createAttribute('value')
    item.value = value.value;
    item.innerText = text.value;

    document.getElementById('menu').appendChild(item);

    text.value = '';
    value.value = '';
}