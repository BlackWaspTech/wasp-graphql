var extendFetchRequest = require('../_internal/extendFetchRequest');

describe('extendFetchRequest.js', function() {
  var original1 = {
    str: 'hello, world'
  };
  var newProps = {
    test: 42
  };

  var expectedObject = {
    str: 'hello, world',
    test: 42
  };

  it('generates the expected request object', function() {
    expect(extendFetchRequest(original1, newProps)).toEqual(expectedObject);
  });
});
