'use strict';

const { graphql } = require('graphql');

const { query } = require('../index.js');
const schema = require('../_internal/schemaMock');

describe("query's fetch functionality", () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.once(JSON.stringify({ data: 42 }));
  });

  it('returns a promise on error', () => {
    return query().catch(e => {
      expect(e).toBeTruthy();
    });
  });

  it('rejects if the first argument is invalid', () => {
    return query('').catch(e => {
      expect(e).toBeTruthy();
    });
  });

  it('rejects if the second argument is invalid', () => {
    return query('/foo', '').catch(e => {
      expect(e).toBeTruthy();
    });
  });

  it('catches a null second value', () => {
    return query('/foo', null).catch(e => {
      expect(e).toBeTruthy();
    });
  });

  it('catches an array second value', () => {
    return query('/foo', []).catch(e => {
      expect(e).toBeTruthy();
    });
  });

  it('succeeds when receiving a query string', () => {
    return query('/foo', '{ foo { bar } }').then(res => {
      expect(res).toBeTruthy();
    });
  });

  it('succeeds when receiving a fields prop', () => {
    return query('/foo', { fields: 'bar' }).then(res => {
      expect(res).toBeTruthy();
    });
  });

  it('succeeds when receiving a body prop', () => {
    return query('/foo', { body: 'bar' }).then(res => {
      expect(res).toBeTruthy();
    });
  });

  it('can call an endpoint and return data', () => {
    return query('/foo', { fields: 'bar' })
      .then(res => res.json())
      .then(json => {
        expect(json.data).toBe(42);
      });
  });
});

describe("query's graphQL functionality", () => {
  var fields = `
      query scalars {
        anInt
        aString
        aBoolean
      }
    `;

  beforeEach(() => {
    fetch.resetMocks();
    graphql(schema, fields).then(res => {
      fetch.once(JSON.stringify(res));
    });
  });

  it('returns valid GraphQL data', () => {
    return query('/api/graphql', fields)
      .then(res => res.json())
      .then(results => {
        expect(results).toBeTruthy();
      });
  });

  it('returns the correct results', () => {
    return query('/api/graphql', fields)
      .then(res => res.json())
      .then(json => json.data)
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
});
