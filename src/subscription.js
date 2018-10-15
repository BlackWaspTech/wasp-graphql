'use strict';

var mutation = require('./query');

/**
 * Configures a mutation in real time.
 *
 * @param {string} endpoint - The endpoint of the resource
 * @param {(string|Object)} mutationQuery - The query handling mutation data
 *
 * @returns {promise} Will return a promise object
 */

function subscription(endpoint, mutationQuery) {
  return mutation.query(endpoint, mutationQuery);
}

module.exports = {
  subscription: subscription
};
