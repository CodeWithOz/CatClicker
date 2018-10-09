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

  it('has a getAllCats method that returns an array of all the cats', () => {
    expect(data.getAllCats).toBeDefined();
    expect(data.getAllCats()).toBeInstanceOf(Array);
    expect(data.getAllCats().length).toEqual(5);
  });

  it('has a getCat method that takes a number and returns an object', () => {
    // get random index within the length of the array
    const index = Math.floor(Math.random() * data.getAllCats().length);

    expect(data.getCat).toBeDefined();
    expect(data.getCat(index)).toBeDefined();

    // `typeof` returns 'object' for `null`
    expect(data.getCat(index)).not.toBeNull();
    expect(typeof data.getCat(index)).toEqual('object');
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
  it('exists', () => {
    expect(view).toBeDefined();
  });

  it('contains a `renderSidebar` method', () => {
    expect(view.renderSidebar).toBeDefined();
  });

  it('contains a `renderDisplay` method', () => {
    expect(view.renderDisplay).toBeDefined();
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
});

/*
 * This suite tests the menu's behavior
 */
describe('The sidebar', () => {
  const sidebar = document.querySelector('.cats-menu'),
    getSidebarRect = () => sidebar.getBoundingClientRect(),
    hamburger = document.querySelector('.hamburger a');

  // ensure it is hidden by default
  it('is hidden by default', () => {
    const sidebarRect = getSidebarRect();
    expect(sidebar.classList.contains('sidebar-hidden')).toBe(true);
    expect(sidebarRect.right).toBeLessThanOrEqual(0);
  });

  // handle clicks on the hamburger button
  it('shows on first hamburger click', (done) => {
    const testForShownMenu = event => {
      const sidebarRect = getSidebarRect();
      // position of right edge should be equal to the width
      expect(sidebarRect.right).toEqual(sidebarRect.width);

      // remove the event listener
      sidebar.removeEventListener('transitionend', testForShownMenu);

      // signal async completion
      done();
    };

    sidebar.addEventListener('transitionend', testForShownMenu);
    hamburger.click();
  });

  it('hides on second hamburger click', (done) => {
    const testForHiddenMenu = event => {
      const sidebarRect = getSidebarRect();
      // right edge should be off-screen
      expect(sidebarRect.right).toBeLessThan(0);

      // remove the event listener
      sidebar.removeEventListener('transitionend', testForHiddenMenu);

      // signal async completion
      done();
    };

    sidebar.addEventListener('transitionend', testForHiddenMenu);
    hamburger.click();
  });

  it(`hides when the display area (below navbar and not sidebar) is clicked`, () => {
    // first show the sidebar
    hamburger.click();
    expect(sidebar.classList.contains('sidebar-hidden')).toBe(false);

    // click the display area
    const displayArea = document.querySelector('.cat-display');
    displayArea.click();

    // sidebar should be hidden
    expect(sidebar.classList.contains('sidebar-hidden')).toBe(true);
  });
});

describe('Selecting a cat from the sidebar', () => {
  const sidebar = document.querySelector('.cats-menu'),
    hamburger = document.querySelector('.hamburger a');

  it(`hides the sidebar`, () => {
    // first show the sidebar
    hamburger.click();
    expect(sidebar.classList.contains('sidebar-hidden')).toBe(false);

    const sidebarCats = [...sidebar.querySelectorAll('li')];

    // randomly select a cat from the list
    const cat = sidebarCats[Math.floor(Math.random() * sidebarCats.length)];

    // click the anchor tag inside
    cat.children[0].click();

    // sidebar should be hidden
    expect(sidebar.classList.contains('sidebar-hidden')).toBe(true);
  });
});

/*
 * This suite ensures that items on the the cat list
 * contain the necessary info
 */
describe('Items on the cat list', () => {
  const sidebar = document.querySelector('.cats-menu'),
    cats = [...sidebar.querySelectorAll('li')];

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
    curClicks = 0;
    image = document.querySelector('img');

    // record the current clicks for each image
    const counter = image.nextElementSibling.querySelector('.clicks');
    curClicks = Number(counter.textContent);

    imgContainer = document.querySelector('.cat-pic');
  });

  it('increments its counters', done => {
    const testForIncrement = event => {
      const { target } = event;

      // exit if click is not from an image
      if (target.tagName !== 'IMG') return;

      // update the click count
      const updatedClicks = curClicks + 1;

      // on-page counter
      const counter = target.nextElementSibling.querySelector('.clicks'),
        newCount = Number(counter.textContent);
      expect(newCount).toEqual(updatedClicks);

      // sidebar counter
      const sidebar = document.querySelector('.cats-menu'),
        selectorString = `li[data-index="${target.dataset.index}"]`,
        sidebarCat = sidebar.querySelector(selectorString);

      /*
       * Note that the dataset property stores all info as
       * strings (in a DOMStringMap object).
       * So the `count` property must be converted back to a number for testing.
       */
      expect(Number(sidebarCat.dataset.count)).toEqual(updatedClicks);

      // remove this event listener
      imgContainer.removeEventListener('click', testForIncrement);

      // signal async completion
      done();
    };

    // check for increment after image has been clicked
    imgContainer.addEventListener('click', testForIncrement);

    image.click();
  });
});
