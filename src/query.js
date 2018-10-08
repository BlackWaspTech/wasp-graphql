'use strict';

var configureFetch = require('../_internal/configureFetch');

/**
 * Configures and executes a GraphQL fetch request.
 *
 * // Base
 * @param {string} url - The url for the intended resource
 * @param {(string|Object)} init - The options object
 * // GraphQL
 * @param {string} [init.fields] - The GraphQL fields for the intended query; either fields or body must be supplied
 * @param {string} [init.body] - The body of the request object; either fields or body must be supplied
 * @param {string} [init.variables]
 * @param {string} [init.method="POST"]
 * @param {(string|Object)} [init.headers={'Content-Type': 'application/json',Accept: 'application/json'}]
 * // For additional valid arguments, see:
 * // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 *
 * @returns {Promise}
 */

function query(url, init) {
  // Reject if user provided no arguments
  if (!url || typeof url !== 'string') {
    return Promise.reject(
      "Expected a non-empty string for 'url' but received: " + typeof url
    );
  }

  // Reject if user provided an invalid second argument
  if (!init) {
    return Promise.reject(
      "Expected an object or a non-empty string for 'init' but received: " +
        typeof init
    );
  }

  // The user can just pass in a query string directly; however, if they
  //    pass in an object instead, we need to validate the properties.
  if (typeof init !== 'string') {
    // Reject if there's no valid fields or body parameter
    if (
      typeof init !== 'object' ||
      init.constructor === Array ||
      ((!init.fields || typeof init.fields !== 'string') &&
        (!init.body || typeof init.body !== 'string'))
    ) {
      return Promise.reject(
        "Expected a string for 'init.fields' or 'init.body' but received: " +
          typeof init
      );
    }
  }

  try {
    var fetchOptions = configureFetch(init);
  } catch (err) {
    return Promise.reject(err);
  }

  // Reject if something went wrong with building the request
  if (!fetchOptions) {
    return Promise.reject(
      setTypeError(
        'Something went wrong when setting the fetch options: ' +
          JSON.stringify(fetchOptions)
      )
    );
  }

  return fetch(url, fetchOptions);
}

module.exports = query;
