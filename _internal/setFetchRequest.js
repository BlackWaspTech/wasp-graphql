/**
 * Generates the settings necessary for a successful GraphQL request.
 *
 * @param {string} fields - The GraphQL query
 *
 * @returns {string} - A parsable JSON string
 */

function setFetchRequest(fields) {
  var baseRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };

  if (fields) {
    baseRequest.body = JSON.stringify({
      query: fields
    });
  }

  return baseRequest;
}

module.exports = setFetchRequest;
