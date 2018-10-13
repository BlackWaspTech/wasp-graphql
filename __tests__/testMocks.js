'use strict';

const { graphql } = require('graphql');

const schema = require('../_internal/schema');

describe('schema', () => {
  const fields = `
      query getPosts {
        posts {
          id
          title
          votes
        }
      }
    `;

  test('whether any query can work as intended', () => {
    return graphql(schema, fields)
      .then(res => res.data)
      .then(data => {
        expect(data).toHaveProperty('posts');
        expect(Array.isArray(data.posts)).toBe(true);
      });
  });
});
