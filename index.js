'use strict';

var query = require('./src/query');
var subscribe = require('./src/subscribe');

module.exports = {
  query: query,
  mutate: query,
  subscribe: subscribe
};
