/**
 * Generates the settings necessary for a successful GraphQL request.
 *
 * @param {object} init - The user-provided options argument
 *
 * @returns {string} - A parsable JSON string
 */

function configureFetch(init) {
  var request = {
    method: init.method || 'POST',
    headers: init.headers || {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body:
      init.body ||
      JSON.stringify({
        query: init.fields,
        variables: init.variables
      }),
    mode: init.mode,
    credentials: init.credentials,
    cache: init.cache,
    redirect: init.redirect,
    referrer: init.referrer,
    referrerPolicy: init.referrerPolicy,
    integrity: init.integrity,
    keepalive: init.keepalive,
    signal: init.signal
  };

  return request;
}

module.exports = configureFetch;
