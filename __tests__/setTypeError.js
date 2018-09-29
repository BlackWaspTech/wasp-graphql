var setTypeError = require('../_internal/setTypeError');

describe('setTypeError.js', function() {
  it('generates a string', function() {
    expect(typeof setTypeError()).toBe('string');
    expect(setTypeError({ test: 'hello' })).toMatch(/hello/);
    expect(setTypeError([], 'foo', 'bar')).toMatch(/foo to be a bar/);
  });
});
