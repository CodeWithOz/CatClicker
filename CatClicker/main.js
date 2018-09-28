// track clicks on the image
const cat = document.querySelector('img');
cat.addEventListener('click', event => {
  const counter = cat.parentElement.nextElementSibling;
  let curClicks = Number(counter.textContent);
  curClicks++;

  // update counter text
  counter.textContent = curClicks;
});
