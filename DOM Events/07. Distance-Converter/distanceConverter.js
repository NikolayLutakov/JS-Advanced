function attachEventsListeners() {
    document.getElementById('convert').addEventListener('click', convert)
    
    const mapTable = {
        0: 1000,
        1: 1,
        2: 0.01,
        3: 0.001,
        4: 1609.34,
        5: 0.9144,
        6: 0.3048,
        7: 0.0254
    }

    function convert(){
        const fromValue = document.getElementById('inputDistance').value;
        const output = document.getElementById('outputDistance');
        const fromSelected = document.getElementById('inputUnits').selectedIndex;
        const toSelected = document.getElementById('outputUnits').selectedIndex;

        valueToMeters = fromValue * mapTable[fromSelected];

        converted = valueToMeters / mapTable[toSelected];

        output.value = converted;

    }
}