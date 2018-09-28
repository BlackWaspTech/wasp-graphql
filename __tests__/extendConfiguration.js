var extendConfiguration = require('../_internal/extendConfiguration');

describe('configureFetch.js', function() {
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
    expect(extendConfiguration(original1, newProps)).toEqual(expectedObject);
  });
});
