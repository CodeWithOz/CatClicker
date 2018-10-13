const customMatchers = {
  toBeInstanceOf(util, customEqualityTesters) {
    return {
      compare(actual, expected) {
        const result = {};
        result.pass = actual instanceof expected;
        if (result.pass) {
          result.message = `Expected ${actual} not to be an instance of ${expected}`;
        } else {
          result.message = `Expected ${actual} to be an instance of ${expected}`;
        }

        return result;
      }
    };
  }
};

/*
 * This suite ensures that the model functions as expected
 */
describe('The model', () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
  });

  // test for a method that returns an array of all the cats
  it('has a getAllCats method', () => {
    expect(data.getAllCats).toBeDefined();
    expect(data.getAllCats()).toBeInstanceOf(Array);
    expect(data.getAllCats().length).toEqual(5);
  });

  // test for a method that takes a number and returns an object
  it('has a getCat method', () => {
    // get random index within the length of the array
    const index = Math.floor(Math.random() * data.getAllCats().length);

    expect(data.getCat).toBeDefined();
    expect(data.getCat(index)).toBeDefined();

    // `typeof` returns 'object' for `null`
    expect(data.getCat(index)).not.toBeNull();
    expect(typeof data.getCat(index)).toEqual('object');
  });

  // test for a method that increments the click count for a specified cat
  it(
    'has an updateCount method',
    () => {
      // randomly select a cat and get its current count
      const index = Math.floor(Math.random() * data.getAllCats().length);
      const curClicks = data.getCat(index).count;

      // increment count
      data.updateCount(index, curClicks + 1);

      // ensure that the count was incremented
      expect(data.getCat(index).count).toEqual(curClicks + 1);

      // undo this increment so the app functions normally after testing
      data.updateCount(index, curClicks + 1);
    }
  );

  // test for a method whose return value indicates whether the
  // sidebar will be shown/hidden on the next render
  it('has a toShow method', () => {
    expect(data.toShow).toBeDefined();
    expect(data.toShow()).toEqual(jasmine.any(Boolean));
  });

  // test for a method that toggles the toShow value
  it('has a toggleToShow method', () => {
    expect(data.toggleToShow).toBeDefined();

    // get current toShow value
    const curVal = data.toShow();

    // toggle it
    data.toggleToShow();

    // ensure it's been toggled
    expect(data.toShow()).toEqual(!curVal);
  });

  // test for a method that explicitly sets the toShow value
  it('has a setToShow method', () => {
    expect(data.setToShow).toBeDefined();

    // get current value
    const curVal = data.toShow();

    // explicitly set it to the reverse
    data.setToShow(!curVal);

    // ensure it's been changed
    expect(data.toShow()).toEqual(!curVal);
  });

  it('has an updateCat method', () => {
    expect(data.updateCat).toBeDefined();

    // randomly get a current cat
    const index = Math.floor(Math.random() * data.getAllCats().length),
      cat = data.getCat(index);

    // save its current values
    const { name, src, count } = cat;

    // ensure that it doesn't currently match the intended new values
    const newVals = {
      name: 'new name',
      src: 'new src',
      count: 10
    };
    expect(name).not.toEqual(newVals.name);
    expect(src).not.toEqual(newVals.src);
    expect(count).not.toEqual(newVals.count);

    // update its values
    data.updateCat(index, newVals);

    // ensure that it now matches the intended values
    expect(cat.name).toEqual(newVals.name);
    expect(cat.src).toEqual(newVals.src);
    expect(cat.count).toEqual(newVals.count);

    // reset the values
    data.updateCat(index, { name, src, count });

    // ensure that nothing changes when empty strings are submitted
    newVals.name = '';
    newVals.src = '';
    newVals.count = '';
    data.updateCat(index, newVals);
    expect(cat.name).toEqual(name);
    expect(cat.src).toEqual(src);
    expect(cat.count).toEqual(count);
  });
});

/*
 * This suite tests for completeness of each cat in the model
 */
describe('Each cat in the model', () => {
  it('contains a name property', () => {
    data.getAllCats().forEach(cat => {
      expect(cat.name).toBeDefined();

      // must be a non-empty string
      expect(cat.name).toMatch(/.+/);
    });
  });

  it('contains a src property', () => {
    data.getAllCats().forEach(cat => {
      expect(cat.src).toBeDefined();

      // must be a non-empty string
      expect(cat.src).toMatch(/.+/);
    });
  });

  it('contains a count property', () => {
    data.getAllCats().forEach(cat => {
      expect(cat.count).toBeDefined();

      // must be a non-NaN number
      expect(typeof cat.count).toBe('number');
      expect(cat.count).not.toBeNaN('number');
    });
  });
});

/*
 * This suite checks the functionality of the view
 */
describe('The `view` JS object', () => {
  // I couldn't figure out a way to test the methods
  // because their results are tested elsewhere

  it('exists', () => {
    expect(view).toBeDefined();
  });

  it('contains a `renderSidebar` method', () => {
    expect(view.renderSidebar).toBeDefined();
  });

  it('contains a `renderDisplay` method', () => {
    expect(view.renderDisplay).toBeDefined();
  });

  it('contains a `sidebar` property', () => {
    expect(view.sidebar).toBeDefined();
  });

  it('contains a `hamburger` property', () => {
    expect(view.hamburger).toBeDefined();
  });

  it('contains an `imageDiv` property', () => {
    expect(view.imageDiv).toBeDefined();
  });

  it('contains a `getSidebarItems` method', () => {
    expect(view.getSidebarItems).toBeDefined();
  });

  it('contains a `displayArea` property', () => {
    expect(view.displayArea).toBeDefined();
  });

  it('contains an `adminSidebar` property', () => {
    expect(view.adminSidebar).toBeDefined();
  });

  it('contains an `adminBtn` property', () => {
    expect(view.adminBtn).toBeDefined();
  });

  it('contains a renderAdminSidebar method', () => {
    expect(view.renderAdminSidebar).toBeDefined();
  });

  it('contains an `cancelBtn` property', () => {
    expect(view.cancelBtn).toBeDefined();
  });

  it('contains an `saveBtn` property', () => {
    expect(view.saveBtn).toBeDefined();
  });

  it('contains an `adminForm` property', () => {
    expect(view.adminForm).toBeDefined();
  });
});

/*
 * This suite checks for the functionality of the octopus
 */
describe('The octopus', () => {
  it('contains an `init` method', () => {
    expect(octopus.init).toBeDefined();
  });

  it('contains a `loadCat` method', () => {
    expect(octopus.loadCat).toBeDefined();
  });

  it('contains a `handleHamburgerClick` method', () => {
    expect(octopus.handleHamburgerClick).toBeDefined();
  });

  it('contains a `handleDisplayAreaClick` method', () => {
    expect(octopus.handleDisplayAreaClick).toBeDefined();
  });

  it('contains a `handleCatSelection` method', () => {
    expect(octopus.handleCatSelection).toBeDefined();
  });

  it('contains a `handleImageClick` method', () => {
    expect(octopus.handleImageClick).toBeDefined();
  });

  it('contains a getToShow method', () => {
    expect(octopus.getToShow).toBeDefined();
  });

  it('contains a toggleToShow method', () => {
    expect(octopus.toggleToShow).toBeDefined();
  });

  it('contains a setToShow method', () => {
    expect(octopus.setToShow).toBeDefined();
  });

  it('contains a handleAdminBtnClick method', () => {
    expect(octopus.handleAdminBtnClick).toBeDefined();
  });

  it('contains a handleCancel method', () => {
    expect(octopus.handleCancel).toBeDefined();
  });

  it('contains a handleSave method', () => {
    expect(octopus.handleSave).toBeDefined();
  });
});

/*
 * This suite tests the cat sidebar's behavior
 */
describe('The cat sidebar', () => {
  const getSidebarRect = () => view.sidebar.getBoundingClientRect();

  // ensure it is hidden by default
  it('is hidden by default', () => {
    const sidebarRect = getSidebarRect();
    expect(view.sidebar.classList.contains('sidebar-hidden')).toBe(true);
    expect(sidebarRect.right).toBeLessThanOrEqual(0);
  });

  // handle clicks on the hamburger button
  it('is visible on first hamburger click', (done) => {
    const testForShownMenu = event => {
      const sidebarRect = getSidebarRect();
      // position of right edge should be equal to the width
      expect(sidebarRect.right).toEqual(sidebarRect.width);

      // remove the event listener
      view.sidebar.removeEventListener('transitionend', testForShownMenu);

      // signal async completion
      done();
    };

    view.sidebar.addEventListener('transitionend', testForShownMenu);
    view.hamburger.click();
  });

  it('is not visible on second hamburger click', (done) => {
    const testForHiddenMenu = event => {
      const sidebarRect = getSidebarRect();
      // right edge should be off-screen
      expect(sidebarRect.right).toBeLessThan(0);

      // remove the event listener
      view.sidebar.removeEventListener('transitionend', testForHiddenMenu);

      // signal async completion
      done();
    };

    view.sidebar.addEventListener('transitionend', testForHiddenMenu);
    view.hamburger.click();
  });

  it(`hides when the display area (below navbar and not sidebar) is clicked`, () => {
    // first show the sidebar
    view.hamburger.click();
    expect(view.sidebar.classList.contains('sidebar-hidden')).toBe(false);

    // click the display area
    view.displayArea.click();

    // sidebar should be hidden
    expect(view.sidebar.classList.contains('sidebar-hidden')).toBe(true);
  });
});


describe('Selecting a cat from the sidebar', () => {
  it(`hides the sidebar`, () => {
    // first show the sidebar
    view.hamburger.click();
    expect(view.sidebar.classList.contains('sidebar-hidden')).toBe(false);

    const sidebarCats = [...view.sidebar.querySelectorAll('li')];

    // randomly select a cat from the list
    const cat = sidebarCats[Math.floor(Math.random() * sidebarCats.length)];

    // click the anchor tag inside
    cat.children[0].click();

    // sidebar should be hidden
    expect(view.sidebar.classList.contains('sidebar-hidden')).toBe(true);
  });

  it('populates the cat display area', () => {
    // first show the sidebar
    view.hamburger.click();

    // randomly select a cat from the list
    const sidebarCats = [...view.sidebar.querySelectorAll('li')];
    const cat = sidebarCats[Math.floor(Math.random() * sidebarCats.length)];

    // click the anchor tag inside
    cat.children[0].click();

    // ensure that the cat display area is populated
    const title = view.imageDiv.querySelector('h4'),
      img = view.imageDiv.querySelector('img'),
      counter = view.imageDiv.querySelector('span');

    // must be non-empty strings
    expect(title.textContent).toMatch(/.+/);
    expect(img.getAttribute('src')).toMatch(/.+/);

    // must be a non-NaN number
    const count = Number(counter.textContent);
    expect(typeof count).toEqual('number');
    expect(count).not.toBeNaN();
  });
});

/*
 * This suite ensures that items on the the cat list
 * contain the necessary info
 */
describe('Items on the cat list', () => {
  const cats = [...view.sidebar.querySelectorAll('li')];

  they('add up to a total of 5', () => {
    expect(cats.length).toEqual(5);
  });

  they('each have an index property', () => {
    cats.forEach(cat => {
      const innerAnchorTag = cat.children[0];
      expect(innerAnchorTag.dataset.index).toBeDefined();

      // must be a non-NaN number
      const index = Number(innerAnchorTag.dataset.index);
      expect(typeof index).toBe('number');
      expect(index).not.toBeNaN();
    });
  });

  they(`each display the cat's name`, () => {
    cats.forEach(cat => {
      const innerAnchorTag = cat.children[0];
      expect(innerAnchorTag.textContent).toMatch(/.+/);
    });
  });
});

/*
 * This suite ensures that there is 1 clickable image on the page
 */

describe('A cat image', () => {
  // ensure there is an img element with a valid src attribute
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    image = document.querySelector('img');
  });

  it('is on the page', () => {
    expect(image).toBeInstanceOf(HTMLImageElement);
    expect(image.getAttribute('src')).not.toEqual('');
  });

  it('has a name', () => {
    const title = image.previousElementSibling;
    expect(title).toBeInstanceOf(HTMLHeadingElement);
    expect(title.textContent).not.toEqual('');
  });

  it('has a click counter', () => {
    const counter = image.nextElementSibling.querySelector('.clicks');
    expect(counter).toBeInstanceOf(HTMLSpanElement);
  });

  it('has a reference to its sidebar cat', () => {
    expect(image.dataset.index).toBeDefined();

    // must be a non-empty string
    expect(image.dataset.index).toMatch(/.+/);
  });
});

/*
 * This suite ensures that the counter increments when the image
 * is clicked.
 */
describe('Clicking the image', () => {
  beforeEach(() => {
    image = document.querySelector('img');
  });

  it('increments the counters', () => {
    // get the current count on the page
    const counter = image.nextElementSibling.querySelector('.clicks'),
      curClicks = Number(counter.textContent);

    // click on the image
    image.click();

    // get the new count
    const newCount = Number(counter.textContent);

    // test for increment
    expect(newCount).toEqual(curClicks + 1);
  });
});

/*
* This suite tests the admin sidebar's behavior
*/
describe('The admin sidebar', () => {
  const getSidebarRect = () => view.adminSidebar.getBoundingClientRect();

  // ensure it is hidden by default
  it('is hidden by default', () => {
    const sidebarRect = getSidebarRect();
    expect(view.adminSidebar.classList.value).toContain('admin-hidden');

    // left edge should be on or after the right edge of viewport
    expect(sidebarRect.left).toBeGreaterThanOrEqual(window.innerWidth);
  });

  // handle clicks on the admin button
  it('is visible on first admin button click', (done) => {
    const testForShownSidebar = event => {
      const sidebarRect = getSidebarRect();

      // right edge should not exceed right viewport edge
      expect(sidebarRect.right).toBeLessThanOrEqual(window.innerWidth);

      // remove the event listener
      view.adminSidebar.removeEventListener('transitionend', testForShownSidebar);

      // signal async completion
      done();
    };

    view.adminSidebar.addEventListener('transitionend', testForShownSidebar);
    view.adminBtn.click();
  });

  it('is not visible on second admin button click', (done) => {
    const testForHiddenSidebar = event => {
      const sidebarRect = getSidebarRect();
      // left edge should be off-screen
      expect(sidebarRect.left).toBeGreaterThanOrEqual(window.innerWidth);

      // remove the event listener
      view.adminSidebar.removeEventListener('transitionend', testForHiddenSidebar);

      // signal async completion
      done();
    };

    view.adminSidebar.addEventListener('transitionend', testForHiddenSidebar);
    view.adminBtn.click();
  });

  it(`hides when the display area (below navbar and not sidebar) is clicked`, () => {
    // first show the sidebar
    view.adminBtn.click();
    expect(view.adminSidebar.classList.value).not.toContain('admin-hidden');

    // click the display area
    view.displayArea.click();

    // sidebar should be hidden
    expect(view.adminSidebar.classList.value).toContain('admin-hidden');
  });
});

describe('Clicking the cancel button', () => {
  it('hides the admin sidebar', () => {
    // first show the admin sidebar
    view.adminBtn.click();
    expect(view.adminSidebar.classList.value).not.toContain('admin-hidden');

    // then click the cancel button
    view.cancelBtn.click();
    expect(view.adminSidebar.classList.value).toContain('admin-hidden');
  });
});

describe('Clicking the save button', () => {
  it('hides the admin sidebar', () => {
    // first show the admin sidebar
    view.adminBtn.click();
    expect(view.adminSidebar.classList.value).not.toContain('admin-hidden');

    // then click the save button
    view.saveBtn.click();
    expect(view.adminSidebar.classList.value).toContain('admin-hidden');
  });

  it('calls the updateCat method on the octopus', () => {
    // first show the admin sidebar
    view.adminBtn.click();
    expect(view.adminSidebar.classList.value).not.toContain('admin-hidden');

    // spy on the updateCat method
    spyOn(data, 'updateCat');

    // click the save button
    view.saveBtn.click();

    // check if it tried to update
    expect(data.updateCat).toHaveBeenCalled();
  });
});
