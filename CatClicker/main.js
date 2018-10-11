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

  // this flag indicates what will happen on the next render
  // admin sidebar is hidden by default so it should be false
  let toShow = false;

  return {
    getCat(index) {
      return cats[index];
    },

    getAllCats() {
      return cats;
    },

    updateCount(index, newCount) {
      cats[index].count = newCount;
    },

    toShow() {
      return toShow;
    },

    toggleToShow() {
      toShow = !toShow;
    },

    setToShow(newVal) {
      toShow = newVal;
    }
  };
})();

const view = {
  hamburger: document.querySelector('.hamburger a'),
  sidebar: document.querySelector('.cats-menu'),
  imageDiv: document.querySelector('.cat-pic'),
  displayArea: document.querySelector('.cat-display'),
  adminSidebar: document.querySelector('.admin-sidebar'),
  adminBtn: document.querySelector('.admin-btn'),

  // get the list items in the sidebar
  getSidebarItems() {
    return [...this.sidebar.querySelectorAll('li')];
  },

  // render the cat image on the main display
  renderDisplay(cat, index) {
    const [title, image, countContainer] = [...this.imageDiv.children[0].children];
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
      // render the main display
      const firstCat = data.getCat(0);
      view.renderDisplay(firstCat);

      // render the sidebar
      const cats = data.getAllCats();
      view.renderSidebar(cats, 0);
    },

    handleDisplayAreaClick(event) {
      view.sidebar.classList.add('sidebar-hidden');
    },

    handleHamburgerClick(event) {
      event.preventDefault();

      view.sidebar.classList.toggle('sidebar-hidden');
    },

    handleCatSelection(event) {
      const { target } = event;

      // exit if click is not from the list item anchor tag
      if (target.tagName !== 'A') return;

      event.preventDefault();

      // hide the menu
      view.sidebar.classList.add('sidebar-hidden');

      // display the cat
      octopus.loadCat(target.dataset.index);
    },

    handleImageClick(event) {
      const { target } = event;

      // exit if click is not from an image
      if (target.tagName !== 'IMG') return;

      // increment count in the model
      const { index } = target.dataset;
      const counter = target.nextElementSibling.querySelector('.clicks');
      data.updateCount(index, Number(counter.textContent) + 1);

      // render the cat again to update the count
      const clickedCat = data.getCat(index);
      view.renderDisplay(clickedCat, index);
    },

    loadCat(index) {
      // get the necessary info from the model
      const cat = data.getCat(index);

      // populate the main image display
      view.renderDisplay(cat, index);
    },

    // get to-show status
    getToShow() {
      return data.toShow();
    },

    // toggle to-show status
    toggleToShow() {
      data.toggleToShow();
    },

    // set to-show status
    setToShow(newVal) {
      data.setToShow(newVal);
    }
  };
})();

// initiate the app
octopus.init();

// handle hamburger clicks
view.hamburger.addEventListener('click', octopus.handleHamburgerClick);

// hide sidebar when main display area is clicked
view.displayArea.addEventListener('click', octopus.handleDisplayAreaClick);

// display cat when its name is clicked in sidebar
view.sidebar.addEventListener('click', octopus.handleCatSelection);

// track clicks on the image
view.imageDiv.addEventListener('click', octopus.handleImageClick);
