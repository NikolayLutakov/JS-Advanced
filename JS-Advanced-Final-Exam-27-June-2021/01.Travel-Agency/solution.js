window.addEventListener('load', solution);

function solution() {
    const personalInformationHolder = {
        'fullName': '',
        'email': '',
        'phoneNumber': '',
        'address': '',
        'postalCode': ''
    }

    const fullNameInput = document.getElementById('fname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const codeInput = document.getElementById('code');

    const submitBtn = document.getElementById('submitBTN');
    const editBtn = document.getElementById('editBTN');
    const continueBtn = document.getElementById('continueBTN');

    const unorderedList = document.getElementById('infoPreview');

    submitBtn.addEventListener('click', submitFunction);
    editBtn.addEventListener('click', editFunction);
    continueBtn.addEventListener('click', continueFunction)

    function submitFunction() {
        if (!validateInput()) {
            return;
        }

        const fullNameValue = fullNameInput.value;
        const emailValue = emailInput.value;
        const phoneValue = phoneInput.value;
        const addressValue = addressInput.value;
        const codeValue = codeInput.value;

        personalInformationHolder.fullName = fullNameValue;
        personalInformationHolder.email = emailValue;
        personalInformationHolder.phoneNumber = phoneValue;
        personalInformationHolder.address = addressValue;
        personalInformationHolder.postalCode = codeValue;

        const fullNameLi = document.createElement('li');
        fullNameLi.innerText = `Full Name: ${fullNameValue}`;

        const emailLi = document.createElement('li');
        emailLi.innerText = `Email: ${emailValue}`;

        const phoneLi = document.createElement('li');
        phoneLi.innerText = `Phone Number: ${phoneValue}`;

        const addressLi = document.createElement('li');
        addressLi.innerText = `Address: ${addressValue}`;

        const codeLi = document.createElement('li');
        codeLi.innerText = `Postal Code: ${codeValue}`;

        unorderedList.appendChild(fullNameLi);
        unorderedList.appendChild(emailLi);
        unorderedList.appendChild(phoneLi);
        unorderedList.appendChild(addressLi);
        unorderedList.appendChild(codeLi);

        fullNameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        addressInput.value = '';;
        codeInput.value = '';

        submitBtn.setAttribute('disabled', 'true');
        editBtn.removeAttribute('disabled');
        continueBtn.removeAttribute('disabled');
    }

    function editFunction() {
        fullNameInput.value = personalInformationHolder.fullName;
        emailInput.value = personalInformationHolder.email;
        phoneInput.value = personalInformationHolder.phoneNumber;
        addressInput.value = personalInformationHolder.address;
        codeInput.value = personalInformationHolder.postalCode;

        unorderedList.innerHTML = '';

        submitBtn.removeAttribute('disabled');
        editBtn.setAttribute('disabled', 'true');
        continueBtn.setAttribute('disabled', 'true');
    }

    function continueFunction() {
        const block = document.getElementById('block');

        block.innerHTML = '<h3>Thank you for your reservation!</h3>';
    }

    function validateInput() {
        if (fullNameInput.value && emailInput.value) {
            return true;
        }

        return false;
    }
}
