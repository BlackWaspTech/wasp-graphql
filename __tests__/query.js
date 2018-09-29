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
    expect(query()).rejects.toThrow(TypeError);
    expect(query('', '')).rejects.toThrow(TypeError);
    expect(query('OnlyOneArgument')).rejects.toThrow(TypeError);
    expect(query('validArg', '', { body: 42 })).rejects.toThrow(TypeError);
  });

  it('returns a promise on success', function() {
    return query('foo', 'bar').then(res => expect(res).toBeTruthy());
  });

  it('handles passing in a valid body value instead of a second argument', function() {
    return query('validArg', '', { body: 'valid body' }).then(res =>
      expect(res).toBeTruthy()
    );
  });

  it('calls an endpoint and returns data', function() {
    return query('/foo', 'bar')
      .then(res => res.json())
      .then(json => expect(json.data).toBe(42));
  });
});
