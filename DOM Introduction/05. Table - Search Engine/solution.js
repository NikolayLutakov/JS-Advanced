function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const searchTerm = document.getElementById('searchField').value.toLowerCase();
      const rows = Array.from(document.querySelectorAll('tbody tr'));

      for (const row of rows) {
         row.classList.remove('select');
      }

      for (let row of rows) {
         for (const cell of row.childNodes) {
            if (cell.textContent.toLowerCase().includes(searchTerm)) {
               row.classList.add('select');
            }
         }
      }
   }
}