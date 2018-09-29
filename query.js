var configureFetch = require('./_internal/configureFetch');
var extendConfiguration = require('./_internal/extendConfiguration');
var generateTypeErrorMessage = require('./_internal/generateTypeErrorMessage');

/**
 * Confirms the given argument is a non-empty string.
 *
 * @param {string} endpoint - The url target for the fetch request
 * @param {string} fields - The GraphQL query
 * @param {object} [options] - Additional configuration settings for the fetch request
 *
 * @returns {Promise} - Will return a promise object
 *
 * @example
 * // Returns a promise
 * query('/graphql', '{ users {id} }')
 */

function query(endpoint, fields, options) {
  // ----------
  // The user must provide a non-empty string as the first argument
  if (!endpoint || typeof endpoint !== 'string') {
    var message = generateTypeErrorMessage(endpoint, 'url endpoint', 'string');
    return Promise.reject(new TypeError(message));
  } else if (
    // The user can choose to provide the GraphQL query either as a
    //    second argument or as a body property on the third argument
    (!fields || typeof fields !== 'string') &&
    (!options || !options.body || typeof options.body !== 'string')
  ) {
    var message = generateTypeErrorMessage(fields, 'query fields', 'string');
    return Promise.reject(new TypeError(message));
  }

  // ----------
  // Prepare settings for the fetch request
  var configuration = configureFetch(fields, options);

  // Allow the user to add additional props to fetch
  if (options) {
    configuration = extendConfiguration(configuration, options);
  }

  return fetch(endpoint, configuration);
}

module.exports = query;
