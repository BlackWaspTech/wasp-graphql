var setFetchRequest = require('./_internal/setFetchRequest');
var extendFetchRequest = require('./_internal/extendFetchRequest');
var setTypeError = require('./_internal/setTypeError');

/**
 * Configures and executes a fetch request.
 *
 * @param {string} url - The endpoint for the request
 * @param {string} queryFields - The GraphQL query string
 * @param {object} [config] - Additional configuration settings for the fetch request
 *
 * @returns {Promise} - Will be either a response promise or a rejected promise
 *
 * @example
 * // Returns a promise
 * var queryString = '{ users { id username } }'
 * query('/api/users', queryString).then(res => res.json())
 * query('/abc/123', { body: JSON.stringify({query: queryString})}).then(res => res.json())
 * query('/myEndpoint', queryString, { "headers": { "xHeader": "123"}}).then(res => res.json())
 *
 * @example
 * var queryString = '{ users { id username } }'
 * var graphQL = query('/api/graphql') // preloads the url via currying
 * graphQL(queryString).then(res => res.json())
 *
 */

function query(url, queryFields, config) {
  switch (arguments.length) {
    // If User provided no arguments
    case 0:
      return Promise.reject(new TypeError(setTypeError(url, 'url', 'string')));

    // If User provided only a url; this will curry the function so that
    //    the user can "preload" a url for later use
    case 1:
      if (!url)
        return Promise.reject(
          new TypeError(setTypeError(url, 'url', 'string'))
        );
      return setAndRun;

    // If User provided separate arguments for queryFields & config
    default:
      return setAndRun(queryFields, config);
  }

  // --------------------
  /**
   * @param {(string | object)} arguments[0] - Can be the query or the request options
   * @param {object} arguments[1] - The request options
   * @returns {Promise} - Will return a promise object
   *
   */
  function setAndRun() {
    var options;

    // Return early if both inputs are invalid
    if (arguments.length === 0)
      return Promise.reject(
        new TypeError(setTypeError(setAndRun, 'queryFields', 'string'))
      );
    if (!arguments[0] && !arguments[1])
      return Promise.reject(
        new TypeError(setTypeError(queryFields, 'queryFields', 'string'))
      );

    // If User provided only a single argument
    if (!arguments[1]) {
      var param = arguments[0];

      if (typeof param === 'string') {
        // Configure the fetch request
        options = setFetchRequest(param);
      } else if (typeof param === 'object' && typeof param.body === 'string') {
        // Configure the fetch request; then, extend the configuration
        //    with additional settings provided by the user
        options = setFetchRequest();
        options = extendFetchRequest(options, param);
      }
    } else {
      var queryFields = arguments[0];
      var config = arguments[1];

      // Check if a query string exists
      if (
        typeof queryFields !== 'string' &&
        (!config || typeof config.body !== 'string')
      )
        return Promise.reject(
          new TypeError(setTypeError(queryFields, 'queryFields', 'string'))
        );

      // Configure the fetch request; then, extend the configuration
      //    with additional settings provided by the user
      options = setFetchRequest(queryFields);
      options = extendFetchRequest(options, config);
    }

    // The url is supplied here via closure
    // The fetch options are built via the above conditionals
    return fetch(url, options);
  }
}

module.exports = query;
