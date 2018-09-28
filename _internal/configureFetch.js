/**
 * Generates the settings necessary for a successful GraphQL request.
 *
 * @param {string} fields - The GraphQL query
 *
 * @returns {string} - A parsable JSON string
 */

function configureFetch(fields) {
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

module.exports = configureFetch;
