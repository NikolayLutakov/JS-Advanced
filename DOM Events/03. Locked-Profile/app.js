function lockedProfile() {

   Array.from(document.querySelectorAll('.profile button'))
   .forEach(b => b.addEventListener('click', onClick));

   function onClick(event){
       const profile = event.target.parentElement;
       const isActive = profile
       .querySelector('input[type="radio"][value="unlock"]')
       .checked;

       if(isActive){
           const detailsDiv = profile.querySelector('div');

           if(event.target.textContent == 'Show more'){
               detailsDiv.style.display = 'block';
               event.target.textContent = 'Hide it';
           } else {
               detailsDiv.style.display = '';
               event.target.textContent = 'Show more';
           }
       }
   }
}