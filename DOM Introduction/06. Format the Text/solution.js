function solve() {
  const input = document.getElementById('input').value;
  const output = document.getElementById('output');
  let sentences = input.split('.').map(a => a.trim()).filter(n => n);

  while (sentences.length > 0) {
    const text = sentences.slice(0, 3).join('');
    sentences.splice(0, 3);
    output.innerHTML += (`<p>${text}.</p>`);
  }
}
