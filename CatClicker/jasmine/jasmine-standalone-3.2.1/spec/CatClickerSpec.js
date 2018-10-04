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
  it('shows on first click', (done) => {
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

  // handle clicks on the hamburger button
  it('hides on second click', (done) => {
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
});

/*
 * This suite ensures that items on the the cat list
 * contain the necessary info
 */
describe('Items on the cat list', () => {
  const sidebar = document.querySelector('.cats-menu'),
    cats = sidebar.querySelectorAll('li');

  they('add up to a total of 5', () => {
    expect(cats.length).toEqual(5);
  });

  they('each have a name property', () => {
    cats.forEach(cat => {
      expect(cat.dataset.name).toBeDefined();

      // must be a string with length > 0
      expect(cat.dataset.name).toMatch(/.+/);
    });
  });

  they('each have a src property', () => {
    cats.forEach(cat => {
      expect(cat.dataset.src).toBeDefined();

      // must be a string with length > 0
      expect(cat.dataset.src).toMatch(/.+/);
    });
  });

  they('each have a count property', () => {
    cats.forEach(cat => {
      expect(cat.dataset.count).toBeDefined();

      // must be a non-NaN number
      expect(typeof Number(cat.dataset.count)).toBe('number');
      expect(Number(cat.dataset.count)).not.toBeNaN();
    });
  });

  they('each have a index property', () => {
    cats.forEach(cat => {
      expect(cat.dataset.index).toBeDefined();

      // must be a non-NaN number
      expect(typeof Number(cat.dataset.index)).toBe('number');
      expect(Number(cat.dataset.index)).not.toBeNaN();
    });
  });

  they(`each display the cat's name`, () => {
    cats.forEach(cat => {
      const clickableArea = cat.children[0];
      expect(clickableArea.textContent).toEqual(cat.dataset.name);
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

  it('increments its counter', done => {
    const testForIncrement = event => {
      const { target } = event;

      // exit if click is not from an image
      if (target.tagName !== 'IMG') return;

      const counter = target.nextElementSibling.querySelector('.clicks'),
        newCount = Number(counter.textContent);
      expect(newCount).toEqual(++curClicks);

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
