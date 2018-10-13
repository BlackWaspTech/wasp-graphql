'use strict';

const { query } = require('../index.js');

const { graphql } = require('graphql');
const schema = require('../_internal/schema');
const getPosts = require('../_internal/mocks').resolvers.Query.posts;

describe('query', () => {
  describe('matches on resolvers', () => {
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

    const posts = getPosts().map(post => {
      // Updating the test results to handle the "authorID" case
      //    When the GraphQL query executes, this gets converted
      //    to a nested object.
      post.author = { id: post.authorId };
      delete post.authorId;
      return post;
    });

    beforeEach(() => {
      fetch.resetMocks();
      fetch.once(posts);
    });

    it('has the ability to return data', () => {
      return query('any endpoint', 'any string')
        .then(res => res.body)
        .then(body => {
          expect(body).toBeTruthy();
          expect(Array.isArray(body)).toBe(true);
          expect(body).toEqual(posts);
        });
    });

    it('can reject an invalid GraphQL query', () => {
      return query('any endpoint', 'not a query, mate')
        .then(res => {
          expect(fetch).toBeCalled();
          const sentFields = JSON.parse(fetch.mock.calls[0][1].body).query;
          expect(res.body).toEqual(posts);
          return graphql(schema, sentFields);
        })
        .then(res => {
          expect(res.error).toBeTruthy;
        });
    });

    it('can send a valid GraphQL query', () => {
      return query('any endpoint', fields)
        .then(res => {
          expect(fetch).toBeCalled();
          const sentFields = JSON.parse(fetch.mock.calls[0][1].body).query;
          expect(res.body).toEqual(posts);
          return graphql(schema, sentFields);
        })
        .then(res => res.data)
        .then(data => {
          expect(data).toHaveProperty('posts');
          expect(data.posts).toEqual(posts);
          return graphql(schema, fields);
        })
        .then(res => res.data)
        .then(data => {
          expect(data).toHaveProperty('posts');
          expect(data.posts).toEqual(posts);
        });
    });
  });
});
