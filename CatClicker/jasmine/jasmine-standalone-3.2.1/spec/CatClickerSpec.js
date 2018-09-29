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
 * This suite ensures that there are 2 clickable images on the page
 */

describe('Two images', () => {
  // ensure there is an img element with a valid src attribute
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    images = [...document.querySelectorAll('img')];
  });

  they('are on the page', () => {
    expect(images.length).toEqual(2);
    images.forEach(img => {
      expect(img).toBeInstanceOf(HTMLImageElement);
      expect(img.getAttribute('src')).not.toEqual('');
    });
  });

  // ensure both images have names
  they('have names', () => {
    images.forEach(image => {
      const title = image.previousElementSibling;
      expect(title).toBeInstanceOf(HTMLParagraphElement);
      expect(title.textContent).not.toEqual('');
    });
  });

  // ensure both have a counter
  they('each have a click counter', () => {
    images.forEach(image => {
      const counter = image.nextElementSibling.querySelector('.clicks');
      expect(counter).toBeInstanceOf(HTMLSpanElement);
    });
  });
});

/*
 * This suite ensures that the counter increments when the images
 * are clicked.
 */
describe('Clicking each image', () => {
  beforeEach(() => {
    counter = document.querySelector('.clicks');
    curClicks = Number(counter.textContent);
    images = [...document.querySelectorAll('img')];
    imgContainer = document.querySelector('.cat-pics');
  });

  it('increments the counter', done => {
    const testForIncrement = event => {
      // exit if click is not from an image
      if (event.target.tagName !== 'IMG') return;

      // check for increments after image has been clicked
      const newCount = Number(counter.textContent);
      expect(newCount).toEqual(++curClicks);

      if (event.target === images[1]) {
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
