'use strict';

const { graphql } = require('graphql');

const schema = require('../_internal/schema');
const mocks = require('../_internal/mocks');

describe('mocks', () => {
  test('whether mock queries work as intended', () => {
    const fields = `
      query getPosts {
        posts {
          id
          title
          votes
          author {
            id
          }
        }
      }
    `;

    return graphql(schema, fields)
      .then(res => {
        expect(res.errors).toBeFalsy();
        return res.data;
      })
      .then(data => {
        expect(data).toHaveProperty('posts');
        expect(Array.isArray(data.posts)).toBe(true);
      });
  });

  test('whether mock mutations work as intended', () => {
    const fields = `
      mutation {
        upvotePost (postId: 1) {
          id
          title
          votes
          author {
            id
          }
        }
      }
    `;
    const posts = mocks.data.posts;

    return graphql(schema, fields)
      .then(res => {
        expect(res.errors).toBeFalsy();
        return res.data;
      })
      .then(data => {
        expect(data.upvotePost.votes).toEqual(posts[0].votes + 1);
      });
  });
});
