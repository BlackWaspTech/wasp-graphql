const setMutateRequest = require('../_internal/setMutateRequest');

/**
 * Configures a subscription in real time
 *
 * @param {string} url - The websocket for real time data
 * @param {string} prevField - The schema field that will be mutated in real time
 * @param {string} updatedField - The object that is updated in the schema
 *
 * @returns {promise} Will return a promise object
 *
 * @example
 * // Returns a promise object
 *
 * const saveBook = (book, authorId) => {
 *  const body = JSON.stringify({ book, authorId });
 *  return fetch('/books', {
 *    method: 'POST',
 *    headers: {
 *      'Content-Type': 'application/json',
 *      credentials: 'include'
 *    },
 *  body
 * })
 * .then(res => res.json())
 * .then((data) => {
 *  $('#book-list').append(
 *    `<li data-id=${data._id}>
 *      ${data.book}
 *     </li>`
 *    );
 * })
 * .catch(err => console.log(err));
 * };
 *
 */

function addMutate(url, fields) {
  const config = setMutateRequest.getMutateRequest(fields);
  return fetch(url, config);
}

function sendMutate(url, fields) {
  const config = setMutateRequest.postMutateRequest(fields);
  return fetch(url, config);
}

function destroyMutate(url, fields) {
  const config = setMutateRequest.deleteMutateRequest(fields);
  return fetch(url, config);
}

function updateMutate(url, fields) {
  const config = setMutateRequest.putMutateRequest(fields);
  return fetch(url, config);
}

module.exports = {
  addMutate,
  sendMutate,
  destroyMutate,
  updateMutate
};
