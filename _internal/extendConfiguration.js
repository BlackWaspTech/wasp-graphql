/**
 * Allows the user to override the fetch configuration
 *      with additional settings.
 *
 * @param {object} original - The request object
 * @param {object} extension - Properties to be added to the request
 *
 * @returns {object} - The amended request
 */

function extendConfiguration(original, extension) {
  for (var prop in extension) {
    original[prop] = extension[prop];
  }

  return original;
}

module.exports = extendConfiguration;
