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
 * This suite ensures that there is a clickable image on the page
 */

describe('An image', () => {
  // ensure there is an img element with a valid src attribute
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
  });

  it('is on the page', () => {
    const img = document.querySelector('img');
    expect(img).toBeInstanceOf(HTMLImageElement);
    expect(img.src).not.toBeNull();
  });
});

/*
 * This suite ensures that the counter increments when the image
 * is clicked.
 */
describe('Clicking the image', () => {
  beforeEach(() => {
    counter = cat.parentElement.nextElementSibling;
    curClicks = Number(counter.textContent);
  });

  it('increments the counter', done => {
    cat.addEventListener('click', event => {
      // check for increments after image has been clicked
      const newCount = Number(counter.textContent);
      expect(newCount).toEqual(++curClicks);

      done();
    });

    cat.click();
  });
});
