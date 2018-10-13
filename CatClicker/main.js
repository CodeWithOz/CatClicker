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
  // admin sidebar is hidden by default
  // so it should start off as false
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
    },

    updateCat(index, newVals) {
      const cat = cats[index],
        { name, src, count } = newVals;

      // use current values if new values are not supplied
      cat.name = name || cat.name;
      cat.src = src || cat.src;
      // and ensure a count value of 0 is not ignored by || operator
      cat.count = count === 0 ? count : count || cat.count;
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
  cancelBtn: document.querySelector('.admin-sidebar button[name="cancel"]'),
  saveBtn: document.querySelector('.admin-sidebar button[name="save"]'),
  adminForm: document.querySelector('.admin-sidebar form'),

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
  },

  // render the admin sidebar
  renderAdminSidebar() {
    // render the sidebar
    if (octopus.getToShow()) {
      view.adminSidebar.classList.remove('admin-hidden');
    } else {
      view.adminSidebar.classList.add('admin-hidden');
    }

    // toggle status for the next render
    octopus.toggleToShow();
  }
};

const octopus = (() => {
  return {
    init() {
      // render the main display
      octopus.loadCat(0);

      // render the cat sidebar
      const cats = data.getAllCats();
      view.renderSidebar(cats, 0);

      // render the admin sidebar
      view.renderAdminSidebar();
    },

    handleDisplayAreaClick(event) {
      view.sidebar.classList.add('sidebar-hidden');

      /* view.renderAdminSidebar() will not work here
       * because it always does the next thing based on
       * the current toggle status.
       * Here, we always want to hide the admin sidebar and
       * set it to show on the next render.
       */
      view.adminSidebar.classList.add('admin-hidden');
      octopus.setToShow(true);
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

      // render the cat again to update the displayed count
      octopus.loadCat(index);
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
    },

    // handle clicks on admin button
    handleAdminBtnClick(event) {
      view.renderAdminSidebar();
    },

    // handle clicks on cancel button
    handleCancel(event) {
      // the button is of type="reset"
      // so it already clears the form fields
      // only need to hide the sidebar
      view.renderAdminSidebar();
    },

    // handle clicks on save button
    handleSave(event) {
      event.preventDefault();
      const { target } = event;

      // get the submitted values and update the model
      const [ name, src, count ] = target,
        catImg = view.imageDiv.children[0].children[1];
      data.updateCat(catImg.dataset.index, {
        name: name.value,
        src: src.value,
        count: count.value
      });

      // re-render the new values
      octopus.loadCat(catImg.dataset.index);

      // trigger the reset event to clear and hide the form
      view.adminForm.reset();
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

// handle admin button clicks
view.adminBtn.addEventListener('click', octopus.handleAdminBtnClick);

// handle cancel button clicks
view.adminForm.addEventListener('reset', octopus.handleCancel);

// handle save button clicks
view.adminForm.addEventListener('submit', octopus.handleSave);
