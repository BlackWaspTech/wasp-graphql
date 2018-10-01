var setFetchRequest = require('../_internal/setFetchRequest');

describe('setFetchRequest.js', function() {
  var fields = '{ test { hello world } }';
  var expectedObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: fields
    })
  };

  it('generates the expected request object', function() {
    expect(setFetchRequest(fields)).toEqual(expectedObject);
  });
});
