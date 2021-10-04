function create(words) {
   const content = document.getElementById('content');
   content.addEventListener('click', onClick);

   for(const word of words){
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.innerText = word;
      p.style.display = 'none';
      div.appendChild(p);
      content.appendChild(div);
   }

   function onClick(ev){
      ev.target.childNodes[0].style.display = '';
   }
}