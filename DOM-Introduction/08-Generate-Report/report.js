function generateReport() {
    const choices = Array.from(document.querySelectorAll('thead tr th'));
    const information = Array.from(document.querySelectorAll('tbody tr'))
    const allInfo = [];

    for (const row of information) {
        const rowInfo = {};
        for (let i = 0; i < choices.length; i++) {
            if (choices[i].childNodes[1].checked) {
                rowInfo[choices[i].textContent.toLowerCase().trimEnd()] = row.children[i].innerHTML;
            }
        }
        allInfo.push(rowInfo)
    }
    document.getElementById('output').value = JSON.stringify(allInfo, null, 2);
}