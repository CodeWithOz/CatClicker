// track clicks on the image
const imageDiv = document.querySelector('.cat-pics');
imageDiv.addEventListener('click', event => {
  // exit if click is not from an image
  if (event.target.tagName !== 'IMG') return;

  const counter = imageDiv.nextElementSibling;
  let curClicks = Number(counter.textContent);
  curClicks++;

  // update counter text
  counter.textContent = curClicks;
});
