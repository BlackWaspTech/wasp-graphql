var mutate = require('../mutate');

// const mockDelete = jest.fn( ('To Kill A Mockingbird') => {

// });

describe('mutate.js', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ title: 'Catch 22' }));
  });

  it('returns a promise error', () => {
    return mutate.addMutate().catch(e => expect(e).toBeTruthy);
  });

  it('returns a promise on success using two strings', () => {
    return mutate
      .addMutate('book', 'authorId')
      .then(res => expect(res).toBeTruthy());
  });

  it('returns a promise on success using a string and an object', () => {
    return mutate
      .addMutate('book', { authorId: '1234' })
      .then(res => expect(res).toBeTruthy());
  });

  it('calls an endpoint and returns some data', () => {
    return mutate
      .addMutate('/url', 'book')
      .then(res => res.json())
      .then(json => expect(json.title).toBe('Catch 22'));
  });

  it('calls an endpoint and returns some data', () => {
    return mutate
      .sendMutate('/url', 'book')
      .then(res => res.json())
      .then(json => expect(json.title).toBe('Catch 22'));
  });

  describe('mutate.js', () => {
    beforeEach(() => {
      fetch.mockResponse(
        JSON.stringify({ name: 'naruto' }, { name: 'itachi' })
      );
    });

    it('calls an endpoint and returns some data', () => {
      return mutate
        .updateMutate('/url', 'book')
        .then(res => res.json())
        .then(json => expect(json.title).toBe('Catch 22'))
        .then(json => expect(json.name).toBe('itachi'));
    });
  });

  describe('mutate.js', () => {
    beforeEach(() => {
      fetch.mockResponse(JSON.stringify({ name: 'goku' }));
    });
    it('calls an endpoint and returns some data', () => {
      return mutate
        .destroyMutate('/url', 'book')
        .then(res => res.json())
        .then(json => expect(json.title).toBe('Catch 22'))
        .then(json => expect(json.name).toEqual(undefined));
    });
  });
});
