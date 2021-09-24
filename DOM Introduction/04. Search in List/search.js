function search() {

   const searchText = document.getElementById('searchText').value;
   const result = document.getElementById('result');
   const towns = Array.from(document.querySelector('#towns').childNodes).filter(e => e.innerText)
   
   towns.map(a =>  {a.style.textDecoration = 'none'
   a.style.fontWeight = 'none'} )
   
   let found = towns.filter(a => a.innerText.includes(searchText));

   found.map(a => {
      a.style.textDecoration = 'underline'
      a.style.fontWeight = 'bold'
   })
   result.innerText = `${found.length} matches found`;
}
