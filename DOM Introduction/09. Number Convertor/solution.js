function solve() {
    const selectTable = document.getElementById('selectMenuTo');
    const binary = selectTable.querySelector('option');
    binary.textContent = 'Binary';
    binary.value = 'binary';
    const hexadecimal = document.createElement('option');
    hexadecimal.textContent = 'Hexadecimal';
    hexadecimal.value = 'hexadecimal';
    selectTable.appendChild(hexadecimal);

    function onClick() {
        const input = Number(document.getElementById('input').value);
        const toSelected = document.getElementById('selectMenuTo').value;
        const functions = {
            binary: binaryConvert,
            hexadecimal: hexadecimalConvert
        }
        if (toSelected != '') {
            document.getElementById('result').value = functions[toSelected](input);
        }

        function binaryConvert(number) {
            binaryString = number.toString(2);
            return binaryString;
        }

        function hexadecimalConvert(number) {
            hexString = number.toString(16).toUpperCase();
            return hexString;
        }
    }
    document.querySelector('button').addEventListener('click', onClick);
}