function solution() {

    const sections = document.querySelectorAll('body section');
    const addGiftBtn = sections[0].querySelector('button');
    const addGiftInput = sections[0].querySelector('input');
    const giftList = sections[1].querySelector('ul');
    const sentGiftsList = sections[2].querySelector('ul');
    const discardedGiftsList = sections[3].querySelector('ul');

    addGiftBtn.addEventListener('click', addGift)


    function addGift() {
        const sendBtn = document.createElement('button');
        sendBtn.setAttribute('id', 'sendButton');
        sendBtn.innerText = 'Send';
        sendBtn.addEventListener('click', send);

        const discardBtn = document.createElement('button');
        discardBtn.setAttribute('id', 'discardButton');
        discardBtn.innerText = 'Discard';
        discardBtn.addEventListener('click', discard);

        const gift = document.createElement('li');
        gift.classList.add('gift');
        gift.innerText = addGiftInput.value;
        gift.appendChild(sendBtn);
        gift.appendChild(discardBtn);
        
        let giftsArr = Array.from(giftList.childNodes);
        giftsArr.push(gift);
        giftsArr.sort((a, b) => a.textContent.localeCompare(b.textContent));
        giftList.innerHTML = '';
        for(const li of giftsArr){
            giftList.appendChild(li);
        }

        addGiftInput.value = '';
    }

    function send(e){
        const parent = e.target.parentNode;
        const item = parent.innerText.substring(0, parent.innerText.length - 11);
        const li = document.createElement('li');
        li.classList.add('gift');
        li.innerText = item;
        giftList.removeChild(parent);

        sentGiftsList.appendChild(li);
    }

    function discard(e){
        const parent = e.target.parentNode;
        const item = parent.innerText.substring(0, parent.innerText.length - 11);
        const li = document.createElement('li');
        li.classList.add('gift');
        li.innerText = item;
        giftList.removeChild(parent);

        discardedGiftsList.appendChild(li);
    }
}