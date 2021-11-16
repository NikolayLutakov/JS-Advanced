function solve() {
  let correct = 0;
  let sections = document.querySelectorAll('section');
  let results = document.querySelector('#results');

  let section1 = sections[0];
  let section2 = sections[1];
  let section3 = sections[2];

  let button11 = section1.querySelectorAll('p')[0];
  let button12 = section1.querySelectorAll('p')[1];
  button11.addEventListener('click', (e) => {
      correct += 1;
      section1.style.display = 'none';
      section2.style.display = 'block';
  });

  button12.addEventListener('click', (e) => {
      section1.style.display = 'none';
      section2.style.display = 'block';
  });

  let button21 = section2.querySelectorAll('p')[0];
  let button22 = section2.querySelectorAll('p')[1];
  button22.addEventListener('click', (e) => {
      correct += 1;
      section2.style.display = 'none';
      section3.style.display = 'block';
  });

  button21.addEventListener('click', (e) => {
      section2.style.display = 'none';
      section3.style.display = 'block';
  });

  let button31 = section3.querySelectorAll('p')[0];
  let button32 = section3.querySelectorAll('p')[1];
  button31.addEventListener('click', (e) => {
      correct += 1;
      section3.style.display = 'none';
      results.style.display = 'block';
      let output = results.querySelector('h1');
      if (correct === 3) {
          output.textContent = 'You are recognized as top JavaScript fan!'
      } else {
          output.textContent = `You have ${correct} right answers`
      }
  });

  button32.addEventListener('click', (e) => {
      section3.style.display = 'none';
      results.style.display = 'block';
      let output = results.querySelector('h1');
      if (correct === 3) {
          output.textContent = 'You are recognized as top JavaScript fan!'
      } else {
          output.textContent = `You have ${correct} right answers`
      }
  });
}