function notify(message) {
  const notification = document.getElementById('notification');
  notification.addEventListener('click', () => {
    notification.style.display = 'none';
  })
  notification.innerText = message;
  notification.style.display = 'block';
}