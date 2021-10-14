function validate() {
    const button = document.getElementById('submit');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const company = document.getElementById('company');
    const companyInfo = document.getElementById('companyInfo');
    const companyNumber = document.getElementById('companyNumber');

    const valid = document.getElementById('valid');
    button.addEventListener('click', onClick);
    company.addEventListener('change', companyCheck)

    function companyCheck(){
        if(company.checked){
            companyInfo.style.display = 'block';
        } else {
            companyInfo.style.display = 'none';
        }
    }

    function onClick(){
        arguments[0].preventDefault();

        let flag = {
            username: 1,
            email: 1,
            password: 1,
            confirm: 1,
            number: 1
        };
        const usernameValidator = /^[0-9a-zA-Z]{3,20}$/;
        if(!usernameValidator.test(username.value)){
            flag.username = 0;
            username.style.borderColor = 'red';
        } else {
            flag.username = 1;
            username.style = 'none'
        }

        const emailValidator = /.*@.*\..*/;
        if(!emailValidator.test(email.value)){
            flag.email = 0;
            email.style.borderColor = 'red';
        } else {
            flag.email = 1;
            email.style = 'none'
        }

        const passwordValidator = /^[0-9a-zA-Z_]{5,15}$/;
        if(!passwordValidator.test(password.value)){
            flag.password = 0;
            password.style.borderColor = 'red';
        } else {
            flag.password = 1;
            password.style = 'none'
        }

        if((password.value != confirmPassword.value) || (!passwordValidator.test(confirmPassword.value)) ){
            flag.confirm = 0
            confirmPassword.style.borderColor = 'red';
            flag.password = 0;
            password.style.borderColor = 'red';
        } else {
            flag.confirm = 1
            confirmPassword.style = 'none'
            flag.password = 1;
            password.style = 'none'
        }
         
        if(company.checked){
            
            if(Number(companyNumber.value) < 1000 || Number(companyNumber.value) > 9999){
                flag.number = 0;
                companyNumber.style.borderColor = 'red';
            } else {
                flag.number = 1;
                companyNumber.style = 'none';
            }
        }

        let validity = true;
        for(const prop in flag){
            if(flag[prop] == 0){
                validity =false;
                break;
            }
        }
        
        if(validity == true){
            valid.style.display = 'block';
        } else {
            valid.style.display = 'none'
        }
        
    }
}