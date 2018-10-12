'use strict';

const { graphql } = require('graphql');

const schema = require('../_internal/schemaMock');

describe('schema', () => {
  test('whether the mock works as intended', () => {
    const fields = `
      query scalars {
        anInt
        aString
        aBoolean
      }
    `;

    return graphql(schema, fields)
      .then(res => res.data)
      .then(data => {
        expect(data).toHaveProperty('anInt');
        expect(data).toHaveProperty('aString');
        expect(data).toHaveProperty('aBoolean');
        expect(data).toEqual(
          expect.objectContaining({
            anInt: expect.any(Number),
            aString: expect.any(String),
            aBoolean: expect.any(Boolean)
          })
        );
      });
  });

  test('whether the mock works as intended', () => {
    const fields = `
      query author {
        author(id: 2){
          id
          name
          posts(limit: 3) {
            title
          }
        }
      }
    `;

    return graphql(schema, fields)
      .then(res => res.data)
      .then(data => {
        const { author } = data;
        expect(author).toHaveProperty('id');
        expect(author).toHaveProperty('name');
        expect(author).toHaveProperty('posts');
        expect(author).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            posts: expect.any(Array)
          })
        );
      });
  });
});
