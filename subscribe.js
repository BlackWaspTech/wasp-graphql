const mutate = require('./mutate');
/**
 * Configures a subscription in real time
 *
 * @param {string} websocket - The websocket for real time data
 * @param {string} prevField - The schema field that will be mutated in real time
 * @param {string} updatedField - The object that is updated in the schema
 *
 * @returns {promise} Will return a promise object
 *
 * @example
 * // Returns a promise object
 *
 * new SubscriptionServer({
 *   execute,
 *   subscribe,
 *    schema
 *  }, {
 *    server: ws,
 *    path: '/subscriptions',
 *  });
 * });
 *
 */

function addSubscribe(websocket, fields) {
  if (websocket === null) {
    throw new Error('Subscriptions require a websocket to work!');
  }
  return mutate.addMutate(websocket, fields);
}

function sendSubscribe(websocket, fields) {
  if (websocket === null) {
    throw new Error('Subscriptions require a websocket to work!');
  }
  return mutate.sendMutate(websocket, fields);
}

function destroySubscribe(websocket, prevField, updatedField) {
  if (websocket === null) {
    throw new Error('Subscriptions require a websocket to work!');
  }
  return mutate.destroyMutate(websocket, prevField, updatedField);
}

function updateSubscribe(websocket, prevField, updatedField) {
  if (websocket === null) {
    throw new Error('Subscriptions require a websocket to work!');
  }
  return mutate.updateMutate(websocket, prevField, updatedField);
}

module.exports = {
  addSubscribe,
  sendSubscribe,
  destroySubscribe,
  updateSubscribe
};
