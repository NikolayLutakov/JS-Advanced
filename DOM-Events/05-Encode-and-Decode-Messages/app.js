function encodeAndDecodeMessages() {
    Array.from(document.getElementsByTagName('button'))
    .forEach(element => element.addEventListener('click', onClick));
    
    const textAreas = document.querySelectorAll('textarea');
    const sender = textAreas[0];
    const reciever = textAreas[1];


    function onClick(event){
        if(event.target.innerText.includes('send')){
            encode(sender.value);
        } else {
            decode(reciever.value)
        }
    }

    function encode(message){
        const asciiNumbers = Array.from(message).map(c => c.charCodeAt(0) + 1);
        const encoded = asciiNumbers.map(n => String.fromCharCode(n)).join('');
        reciever.value = encoded;
        sender.value = '';
    }

    function decode(message){
        const asciiNumbers = Array.from(message).map(c => c.charCodeAt(0) - 1);
        const decoded = asciiNumbers.map(n => String.fromCharCode(n)).join('');
        reciever.value = decoded;
    }
}

