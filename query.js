var assertString = require('./_internal/assertString');

/**
 * Confirms the given argument is a non-empty string.
 *
 * @param {string} endpoint - The url target for the fetch request
 * @param {(string|object)} fields - The GraphQL query
 * @param {object} [options] - Additional configuration settings for the fetch request
 *
 * @returns {Promise} - Will return a promise object
 *
 * @example
 * // Returns a promise
 * query('/graphql', { messages {id author description} })
 *  .then(res => res.json())
 *  .then(json => {console.log(json.data.data)})
 *  .catch(err => {console.log(err)})
 */

function query(endpoint, fields, options) {
  try {
    // Validate inputs
    assertString(endpoint, 'endpoint');
    assertString(fields, 'fields');
  } catch (err) {
    // The caller is expecting a promise object
    return Promise.reject(err);
  }

  // Prepare settings for the fetch request
  var configuration = generateConfig(fields);

  // Allow the user to add additional props to fetch
  if (options) {
    configuration = extendConfig(configuration, options);
  }

  return fetch(endpoint, configuration);
}

// --------------------

function generateConfig(fields) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: fields
    })
  };
}

function extendConfig(original, extension) {
  for (var prop in extension) {
    original[prop] = extension[prop];
  }

  return original;
}

module.exports = query;
