// give the cats names
const cats = [...document.querySelectorAll('img')],
  catNames = ['Floor cat', 'Stunned cat'];
cats.forEach((cat, index) => {
  cat.previousElementSibling.textContent = catNames[index];
});

// track clicks on the image
const imageDiv = document.querySelector('.cat-pics');
imageDiv.addEventListener('click', event => {
  // exit if click is not from an image
  if (event.target.tagName !== 'IMG') return;

  const counter = document.querySelector('.clicks');
  let curClicks = Number(counter.textContent);
  curClicks++;

  // update counter text
  counter.textContent = curClicks;
});
