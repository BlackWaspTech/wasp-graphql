var query = require('../query');

describe('query.js', function() {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify({ data: 42 }));
  });

  it('returns a promise on error', function() {
    return query().catch(e => expect(e).toBeTruthy());
  });

  it('returns a rejection on receiving invalid input', function() {
    return query('', '').catch(e => expect(e).toBeTruthy());
  });

  it('returns a promise on success', function() {
    return query('foo', 'bar').then(res => expect(res).toBeTruthy());
  });

  it('calls an endpoint and returns data', function() {
    return query('/foo', 'bar')
      .then(res => res.json())
      .then(json => expect(json.data).toBe(42));
  });

  it('handles passing in a valid body value instead of a second argument', function() {
    return query('validArg', '', { body: 'valid body' }).then(res =>
      expect(res).toBeTruthy()
    );
  });

  it('allows "preloading" a url for later use', function() {
    var loadedQuery = query('/foo');

    expect(typeof loadedQuery).toBe('function');
    return loadedQuery('bar')
      .then(res => res.json())
      .then(json => expect(json.data).toBe(42));
  });

  it('returns a rejection on receiving invalid input for a preloaded query', function() {
    var loadedQuery = query('/foo');

    return loadedQuery('', '').catch(e => expect(e).toBeTruthy());
  });
});
