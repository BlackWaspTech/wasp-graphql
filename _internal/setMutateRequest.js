/**
 * Generates the settings neessary for a successful GraphQL request.
 *
 * @param {string} fields - The GraphQL query
 *
 * @param {string} - A parsable JSON string
 *
 */

function getMutateRequest(fields) {
  let request = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  if (fields) {
    request.body = JSON.stringify({
      query: fields
    });
  }
}

function postMutateRequest(fields) {
  let request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  if (fields) {
    request.body = JSON.stringify({
      query: fields
    });
  }
}

function putMutateRequest(fields) {
  let request = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  if (fields) {
    request.body = JSON.stringify({
      query: fields
    });
  }
}

function deleteMutateRequest(fields) {
  let request = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  if (fields) {
    request.body = JSON.stringify({
      query: fields
    });
  }
}

module.exports = {
  getMutateRequest,
  postMutateRequest,
  putMutateRequest,
  deleteMutateRequest
};
