function solve() {
    const [input, output] = Array.from(document.querySelectorAll('textarea'));
    const [generateBtn, buyBtn] = Array.from(document.querySelectorAll('button'));
    const tableBody = document.querySelector('table tbody');
    
    const items = [];

    generateBtn.addEventListener('click', generate);
    buyBtn.addEventListener('click', buy);

    function generate() {
        if(input.value != ''){
            const inputArr = JSON.parse(input.value);

            for(const element of inputArr){
                const imageElmnt = createImageElement(element['img']);
                const nameElmnt = createNameElement(element['name']);
                const priceElmnt = createPriceElement(element['price']);
                const decFactorElmnt = createDecFactorElement(element['decFactor']);
                const checkBoxElmnt = createCheckBoxElement();

                const row = document.createElement('tr');
                row.appendChild(imageElmnt);
                row.appendChild(nameElmnt);
                row.appendChild(priceElmnt);
                row.appendChild(decFactorElmnt);
                row.appendChild(checkBoxElmnt);

                tableBody.appendChild(row);

                items.push([checkBoxElmnt.children[0], element]);
            }
            
        }        
    }

    function buy() {
        const buyedProducts = [];
        const names = [];
        let totalPrice = 0;
        let decorationFactorSum = 0;

        for(const element of items){
            if(element[0].checked){
                buyedProducts.push(element[1]);
            }
        }
        
        
        for(const product of buyedProducts){
            names.push(product['name']);
            totalPrice += Number(product['price']);
            decorationFactorSum += Number(product['decFactor']);
        }

        let avgDecorationFactor = decorationFactorSum / buyedProducts.length;

        output.value = `Bought furniture: ${names.join(', ')}\nTotal price: ${totalPrice.toFixed(2)}\nAverage decoration factor: ${avgDecorationFactor}`;
    }

    function createImageElement(imageLink){
        const td = document.createElement('td');
        const img = document.createElement('img');
        img.src = imageLink
        td.appendChild(img);
        return td;
    }

    function createNameElement(name){
        const td = document.createElement('td');
        const nameChild = document.createElement('p');
        nameChild.innerText = name;
        td.appendChild(nameChild);
        return td;
    }

    function createPriceElement(price){
        const td = document.createElement('td');
        const priceChild = document.createElement('p');
        priceChild.innerText = price;
        td.appendChild(priceChild);
        return td;
    }

    function createDecFactorElement(decFactor){
        const td = document.createElement('td');
        const decFactChild = document.createElement('p');
        decFactChild.innerText = decFactor;
        td.appendChild(decFactChild);
        return td;
    }

    function createCheckBoxElement(){
        const td = document.createElement('td');
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        td.appendChild(checkBox)
        return td;
    }
}