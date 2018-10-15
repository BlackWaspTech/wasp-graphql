'use strict';

var query = require('./src/query');
// var subscription = require('./src/subscription');

module.exports = {
  query: query,
  // subscription: subscription,
  mutation: query
};
