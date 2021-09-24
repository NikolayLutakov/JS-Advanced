function solve() {
  const text = document.getElementById('text').value;
  const convention = document.getElementById('naming-convention').value;
  const result = document.getElementById('result');

  if (convention == 'Camel Case') {
    
    result.textContent = text.split(' ')[0]
    .toLowerCase() + text
    .split(' ')
    .slice(1)
    .map(a => a[0]
      .toUpperCase() + a
      .slice(1, a.length).toLowerCase())
      .join('');
    return;
  }

  if (convention == 'Pascal Case') {
    result.textContent = text
    .split(' ')
    .map(a => a[0]
      .toUpperCase() + a
      .slice(1, a.length).toLowerCase())
      .join('');
    return;
  }
  result.textContent = "Error!"
  return;
}