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
