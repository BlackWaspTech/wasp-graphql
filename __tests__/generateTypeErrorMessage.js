var generateTypeErrorMessage = require('../_internal/generateTypeErrorMessage');

describe('generateTypeErrorMessage.js', function() {
  it('generates a string', function() {
    expect(typeof generateTypeErrorMessage()).toBe('string');
    expect(generateTypeErrorMessage({ test: 'hello' })).toMatch(/hello/);
    expect(generateTypeErrorMessage([], 'foo', 'bar')).toMatch(
      /foo to be a bar/
    );
  });
});
