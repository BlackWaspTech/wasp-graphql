var assertString = require('../_internal/assertString');

describe('assertString.js', function() {
  it('returns true if input is a non-empty string', function() {
    expect(assertString('foobar')).toBe(true);
    expect(assertString('foo', 'bar')).toBe(true);
  });

  it('throws when receiving an invalid input type', function() {
    expect(function() {
      assertString();
    }).toThrow();

    expect(function() {
      assertString(2);
    }).toThrow();

    expect(function() {
      assertString('');
    }).toThrow();
  });

  it('does not stop execution if OPTIONAL input is an invalid type', function() {
    expect(assertString('test', [-Infinity])).toBe(true);
  });
});
