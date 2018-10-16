'use strict';

const { query } = require('../index.js');

describe('query', () => {
  describe('unit tests', () => {
    const fields = '{ foo { bar } }';

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

    it('rejects null values', () => {
      return query('/foo', null).catch(e => {
        expect(e).toBeTruthy();
      });
    });

    it('rejects arrays', () => {
      return query('/foo', []).catch(e => {
        expect(e).toBeTruthy();
      });
    });

    it('can call an endpoint', () => {
      query('/api/ping', fields);

      expect(fetch).toBeCalled();
    });

    it('responds when receiving a query string', () => {
      return query('/foo', fields).then(res => {
        expect(res).toBeTruthy();
      });
    });

    it('responds when receiving a fields prop', () => {
      return query('/foo', { fields }).then(res => {
        expect(res).toBeTruthy();
      });
    });

    it('responds when receiving a body prop', () => {
      return query('/foo', { body: fields }).then(res => {
        expect(res).toBeTruthy();
      });
    });

    it('can call an endpoint and return data', () => {
      return query('/foo', { fields })
        .then(res => res.json())
        .then(json => {
          expect(json.data).toBe(42);
        });
    });

    it('can pass a query string as part of a request', () => {
      const fetchInit = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ query: fields })
      };
      const url = '/api/ping';

      query(url, fields);
      expect(fetch).toBeCalledWith(url, fetchInit);

      const body = fetch.mock.calls[0][1].body;
      expect(body).toMatch(/query/);
      expect(body).toMatch(/foo/);
    });

    it('can pass in variables as part of a request', () => {
      const fetchInit = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          query: fields,
          variables: { str: 'Hello, world!' }
        })
      };
      const url = '/api/ping';

      query(url, { fields, variables: { str: 'Hello, world!' } });
      expect(fetch).toBeCalledWith(url, fetchInit);

      const body = fetch.mock.calls[0][1].body;
      expect(body).toMatch(/variables/);
      expect(body).toMatch(/str/);
      expect(body).toMatch(/Hello, world!/);
    });
  });
});
