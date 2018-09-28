/**
 * Confirms the given argument is a non-empty string.
 *
 * @param {string} item - The variable to be checked
 * @param {string} [itemDescription] - A label to be applied to the error message to describe the item
 *
 * @returns {boolean} - Will return true if the function does not throw
 *
 * @example
 * // returns true
 * assertString('foo', 'myValue')
 * @example
 * // returns true
 * assertString('abcdefg', '')
 *
 * @throws Will throw an error if item is not a string
 * @throws Will throw an error if the string is length 0
 */

function assertString(item, itemDescription) {
  // Defensively sets the optional input to nothing if it's not a string
  if (itemDescription && typeof itemDescription !== 'string') {
    itemDescription = undefined;
  }

  // Throws if the item isn't a valid string
  if (!item || typeof item !== 'string') {
    throwError();
  }

  return true;

  // ----------
  // Generates the error object
  function throwError() {
    var expected =
      'Expected a string for the ' +
      (itemDescription ? itemDescription : 'variable') +
      ' argument ';
    var receivedValue = 'but received a value of ' + item + ' ';
    var receivedType = '(with typeof === ' + typeof item + ') instead.';

    throw new Error(expected + receivedValue + receivedType);
  }
}

module.exports = assertString;
