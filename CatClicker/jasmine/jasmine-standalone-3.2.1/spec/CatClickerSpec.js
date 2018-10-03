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
 * This suite ensures that there is 1 clickable image on the page
 */

describe('The cat image', () => {
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
    expect(title).toBeInstanceOf(HTMLParagraphElement);
    expect(title.textContent).not.toEqual('');
  });

  // ensure both have a counter
  it('has a click counter', () => {
    const counter = image.nextElementSibling.querySelector('.clicks');
    expect(counter).toBeInstanceOf(HTMLSpanElement);
  });
});

/*
 * This suite ensures that the counters increment when the images
 * are clicked.
 */
describe('Clicking each image', () => {
  beforeEach(() => {
    curClicks = {};
    images = [...document.querySelectorAll('img')];
    images.forEach(image => {
      // record the current clicks for each image
      const counter = image.nextElementSibling.querySelector('.clicks');
      curClicks[image.dataset.pos] = Number(counter.textContent);
    });
    imgContainer = document.querySelector('.cat-pics');
  });

  it('increments its respective counter', done => {
    const testForIncrement = event => {
      const { target } = event;

      // exit if click is not from an image
      if (target.tagName !== 'IMG') return;

      // check for increments after image has been clicked
      const counter = target.nextElementSibling.querySelector('.clicks'),
        newCount = Number(counter.textContent);
      expect(newCount).toEqual(++curClicks[target.dataset.pos]);

      if (target === images[1]) {
        // after second image has been tested
        // remove this event listener
        imgContainer.removeEventListener('click', testForIncrement);

        // signal async completion
        done();
      }
    };
    imgContainer.addEventListener('click', testForIncrement);

    images.forEach(cat => {
      cat.click();
    });
  });
});
