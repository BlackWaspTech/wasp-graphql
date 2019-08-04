'use strict';

var configureFetch = require('../_internal/configureFetch');

/**
 * Provides a thin, GQL-compliant wrapper over the Fetch API.
 *
 * Syntax: query(url, init)
 *
 * @param {string} url - The url for the intended resource
 * @param {(string|Object)} init - Can be a string of fields or a configuration object
 * @param {string} [init.fields] - GQL fields: Will be added to the body of the request
 * @param {Object} [init.variables] - GQL variables: Will be added to the body of the request
 * // For additional valid arguments, see the Fetch API:
 * // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 *
 * Default init properties
 * @param {string} [init.method='POST']
 * @param {Object} [init.headers={ 'Content-Type': 'application/json', 'Accept': 'application/json' }]
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