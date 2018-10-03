const hamburger = document.querySelector('.hamburger a'),
  sidebar = document.querySelector('.cats-menu');

// handle hamburger clicks
hamburger.addEventListener('click', event => {
  event.preventDefault();

  sidebar.classList.toggle('sidebar-hidden');
});

// give the cats names
const cats = [...document.querySelectorAll('img')],
  catNames = ['Floor cat', 'Stunned cat'];
cats.forEach((cat, index) => {
  cat.previousElementSibling.textContent = catNames[index];
});

// track clicks on the image
const imageDiv = document.querySelector('.cat-pics');
imageDiv.addEventListener('click', event => {
  const { target } = event;

  // exit if click is not from an image
  if (target.tagName !== 'IMG') return;

  // get and increment count
  const counter = target.nextElementSibling.querySelector('.clicks');
  let curClicks = Number(counter.textContent);
  curClicks++;

  // update counter text
  counter.textContent = curClicks;
});
