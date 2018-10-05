const hamburger = document.querySelector('.hamburger a'),
  sidebar = document.querySelector('.cats-menu');

// handle hamburger clicks
hamburger.addEventListener('click', event => {
  event.preventDefault();

  sidebar.classList.toggle('sidebar-hidden');
});

// populate cat names in sidebar
const sidebarCats = [...sidebar.querySelectorAll('li')];
sidebarCats.forEach(cat => {
  // get the inner anchor tag
  const clickableArea = cat.children[0];

  // update its text
  clickableArea.textContent = cat.dataset.name;
});

// display cat when its name is clicked in sidebar
const imageDiv = document.querySelector('.cat-pic');
sidebar.addEventListener('click', loadCat);

function loadCat(event) {
  const { target } = event;

  // exit if click is not from the list item anchor tag
  if (target.tagName !== 'A') return;

  event.preventDefault();

  // hide the menu
  sidebar.classList.add('sidebar-hidden');

  // get the parent that contains the necessary info
  const cat = target.parentElement;

  // populate the main image display
  const [title, image, countContainer] = [...imageDiv.children[0].children];
  title.textContent = cat.dataset.name;
  image.setAttribute('src', cat.dataset.src);
  countContainer.children[0].textContent = cat.dataset.count;

  // this saves a reference to this cat's matching sidebar item
  image.dataset.index = cat.dataset.index;
}

// show the first cat on page load
sidebarCats[0].children[0].click();

// track clicks on the image
imageDiv.addEventListener('click', event => {
  const { target } = event;

  // exit if click is not from an image
  if (target.tagName !== 'IMG') return;

  // get and increment count
  const counter = target.nextElementSibling.querySelector('.clicks');
  let curClicks = Number(counter.textContent);
  curClicks++;

  // update counter text
  // on-page counter
  counter.textContent = curClicks;
  // sidebar counter
  const sidebarCat = sidebarCats.filter(cat => cat.dataset.index === target.dataset.index)[0];
  sidebarCat.dataset.count = curClicks;
});
