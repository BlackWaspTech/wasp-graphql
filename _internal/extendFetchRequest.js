/**
 * Allows the user to override the fetch configuration
 *      with additional settings.
 *
 * @param {object} original - The request object
 * @param {object} extension - Properties to be added to the request
 *
 * @returns {object} - The amended request
 */

function extendFetchRequest(original, extension) {
  // This is the ES5 version of:
  //    ---> return Object.assign(original, extension)
  for (var prop in extension) {
    original[prop] = extension[prop];
  }

  return original;
}

module.exports = extendFetchRequest;
