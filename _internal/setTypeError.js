/**
 * Creates a custom error message.
 *
 * @param {any} receivedValue
 * @param {string} expectedLabel
 * @param {string} expectedType
 *
 * @returns {string}
 */

function setTypeError(receivedValue, expectedLabel, expectedType) {
  var message = '';
  message += '\n\nEXPECTED ' + expectedLabel;
  message += ' to be a ' + expectedType;
  message += '.\nRECEIVED: ' + JSON.stringify(receivedValue);
  message += ' (' + typeof receivedValue + ')\n\n';
  return message;
}

module.exports = setTypeError;
