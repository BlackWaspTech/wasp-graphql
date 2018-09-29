/**
 * Generates the settings necessary for a successful GraphQL request.
 *
 * @param {string} fields - The GraphQL query
 * @param {object} [options] - The user may choose to supply the query via options instead
 *
 * @returns {object} - Request object for an XmlHttpRequest
 */

function configureFetch(fields, options) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: fields || options.body
    })
  };
}

module.exports = configureFetch;
