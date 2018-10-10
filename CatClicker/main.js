const data = (() => {
  const cats = [
    {
      name: 'Playful cat',
      src: 'cat.jpg',
      count: 0
    },
    {
      name: 'Staring cat',
      src: 'cat2.jpg',
      count: 0
    },
    {
      name: 'Thoughtful cat',
      src: 'cat3.jpeg',
      count: 0
    },
    {
      name: 'Comfy cat',
      src: 'cat4.jpg',
      count: 0
    },
    {
      name: 'Scared cat',
      src: 'cat5.jpg',
      count: 0
    }
  ];

  return {
    getCat(index) {
      return cats[index];
    },

    getAllCats() {
      return cats;
    }
  };
})();

const view = {
  // render the cat image on the main display
  renderDisplay(cat) {
    const [title, image, countContainer] = [...imageDiv.children[0].children];
    title.textContent = cat.name;
    image.setAttribute('src', cat.src);
    countContainer.children[0].textContent = cat.count;

    // this saves a reference to this cat's matching sidebar item
    image.dataset.index = index;
  },

  /**
   * Render the sidebar
   * @param {Array} cats List of cats to be rendered
   * @returns {undefined}
   */
  renderSidebar(cats) {
    const sidebarList = document.querySelector('.cats-menu ul'),
      docFrag = document.createDocumentFragment();
    cats.forEach((cat, index) => {
      // create each list item
      const entry = document.createElement('li');
      entry.innerHTML = `<a href="#" data-index="${index}">${cat.name}</a>`;

      docFrag.appendChild(entry);
    });

    // add the list to the DOM
    sidebarList.appendChild(docFrag);
  }
};

const octopus = (() => {
  return {
    init() {
      // render the sidebar
      const cats = data.getAllCats();
      view.renderSidebar(cats);
    },

    handleCatSelection(event) {
      const { target } = event;

      // exit if click is not from the list item anchor tag
      if (target.tagName !== 'A') return;

      event.preventDefault();

      // hide the menu
      sidebar.classList.add('sidebar-hidden');

      // display the cat
      loadCat(target.dataset.index);
    },

    loadCat(index) {
      // get the necessary info from the model
      const cat = data.getCat(index);

      // populate the main image display
      view.renderDisplay(cat);
    }
  };
})();

// initiate the app
octopus.init();

const hamburger = document.querySelector('.hamburger a'),
  sidebar = document.querySelector('.cats-menu');

// handle hamburger clicks
hamburger.addEventListener('click', event => {
  event.preventDefault();

  sidebar.classList.toggle('sidebar-hidden');
});

// hide sidebar when main display area is clicked
const displayArea = document.querySelector('.cat-display');
displayArea.addEventListener('click', event => {
  sidebar.classList.add('sidebar-hidden');
});

// display cat when its name is clicked in sidebar
const imageDiv = document.querySelector('.cat-pic');
sidebar.addEventListener('click', octopus.handleCatSelection);

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
