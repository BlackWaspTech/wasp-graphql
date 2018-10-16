# wasp-graphql

[![npm](https://img.shields.io/npm/v/wasp-graphql.svg)](https://www.npmjs.com/package/wasp-graphql)
[![Build Status](https://travis-ci.com/dentemple/wasp-graphql.svg?branch=master)](https://travis-ci.com/dentemple/wasp-graphql)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/wasp-graphql.svg)](https://www.npmjs.com/package/wasp-graphql) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/BlackWaspTech/wasp-graphql/issues)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/dentemple/wasp-graphql)

Execute a GraphQL query exactly like you would a `fetch` request. No dependencies included.

Takes a `url` and an `init` object as input. Returns a Promise containing the results of the request.

```js
// fetch
fetch('/graphql', { body: JSON.stringify({ query: '{ foo { bar baz } }' }) });

// query
import { query } from 'wasp-graphql';
query('/graphql', { fields: '{ foo { bar baz } }' });

// Logging the results
fetch(url, init)
  .then(res => res.json())
  .then(json => console.log(json));
query(url, init)
  .then(res => res.json())
  .then(json => console.log(json));
```

**For additional features unique to [Redux](https://redux.js.org/), check out [`redux-wasp`](https://github.com/BlackWaspTech/redux-wasp) and [`redux-wasp-apollo`](https://github.com/BlackWaspTech/redux-wasp-apollo).**

**For a live, full-stack application showcasing this library in action, visit [The Buzz](https://github.com/BlackWaspTech/the-buzz).**

## Installation

**Install via npm:**

```js
npm install --save wasp-graphql
```

**Install via yarn:**

```js
yarn add wasp-graphql
```

**Requires `fetch` to be in scope.**

- Modern browsers ([Can I Use It?](https://caniuse.com/#search=fetch))
- [`what-wg-fetch`/ Window.Fetch polyfill](https://github.com/github/fetch)
- [`cross-fetch`](https://github.com/lquixada/cross-fetch)
- [`node-fetch`](https://github.com/bitinn/node-fetch)
- etc.

**Use**

```js
// ES6 (with Destructuring)
import { query } from 'wasp-graphql';

// ES6
import Wasp from 'wasp-graphql';
const query = Wasp.query;

// ES5
var Wasp = require('wasp-graphql');
var query = Wasp.query;
```

## How It Works

[How to query a GraphQL server.](https://graphql.org/learn/queries/)

Write a string to request data (["fields"](https://graphql.org/learn/queries/#fields)) from a GraphQL endpoint.

Given an example string:

```js
var myFields = `{
  hero {
    name
    friends {
      name
    }
  }
}`;
```

Pass the query string alone as the second argument...

```js
import { query } from 'wasp-graphql';
query('/my/url/endpoint', myFields);
```

Or as a property called `fields` for the second argument...

```js
import { query } from 'wasp-graphql';

query('/my/url/endpoint', { fields: myFields });
// Any `fetch` init property can be included as well
query('/my/url/endpoint', { fields: myFields, mode: 'no-cors' });
```

Or as part of a fully customized `body` property (ADVANCED).

```js
import { query } from 'wasp-graphql';

// Remember that `body` must be a JSON parsable string. Also, many GQL
//    servers will expect fields to be sent under a `body.query` property.
const init = {
  body: JSON.stringify({
    query: myFields
  }),
  credentials: 'include'
};
query('/my/url/endpoint', init);
```

Then, you can unpack the results of query with `.json()`:

```js
import { query } from 'wasp-graphql';

query('/my/url/endpoint', init)
  .then(response => {
    console.log(response.json()); // my data
  })
  .catch(error => {
    console.log(error); // my error
  });
```

[As a thin wrapper over the Fetch API, anything that applies to `fetch` will also apply to `query` as well.](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Variables

[About dynamic arguments](https://graphql.org/learn/queries/#variables)

GraphQL variables can be passed on as a separate property named `variables`.

```js
import { query } from 'wasp-graphql';

query(url, { fields: myFields, variables: myVariables });
```

A longer example:

```js
import { query } from 'wasp-graphql';

const url = '/api/starwars';
const fields = `
  query HeroNameAndFriends($episode: Episode) {
    hero(episode: $episode) {
      name
      friends {
        name
      }
    }
  }
`;
const variables = {
  episode: 'JEDI'
};

query(url, { fields, variables })
  .then(res => res.json())
  .then(json => {
    console.log(json);
  });

// A custom body property can be used as well
query(url, { body: JSON.stringify({ fields, variables }) }).then(/* ... */);
```

### Examples of good SYNTAX

```js
import { query } from 'wasp-graphql'

// fields as a second argument
query('/foo/bar', '{foo { bar baz }}')  // good

// extended fields as a second argument
query('/myendpoint', 'query myQuery { field1 field2 { subfield1 } }')  // good

// with a fields as a property and the default settings
query('/myurl', { fields: '{foo { bar }}' })  // good

// with a fields as a property and custom fetch options
const config = {
  fields: 'query FooBarBaz {foo bar baz}',
  cache: 'no-cache',
  mode: "same-origin"
}
query('/myurl', config)  // good

// Remember that `body` must be a JSON parsable string. Also, many GQL
//    servers will expect fields to be sent under a `body.query` property.
//    GQL variables can be sent under `body.variables`.
const init = {
  body: JSON.stringify({
    query: myFields,
    variables: '{ "name": "Batman" }'
  }),
  credentials: 'include',
  mode: 'same-origin'
}
query('/my/url/endpoint', init)  // good

// With a fully custom init object.  Body must be a JSON parsable string
//    with a query property.
const init = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  body: JSON.stringify({
    query: myFields,
    variables: '{ "name": "Batman" }'
  }),
  credentials: 'include',
  mode: 'same-origin'
}
query('/my/url/endpoint', init)  // good
```

Important note: If you add your own headers to the init object, the default headers will be overwritten. If this causes an issue, including these with your custom headers should resolve it:

```js
{
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

### Examples of broken SYNTAX

```js
// No arguments
query(); // bad

// No second argument
query('/foo/bar'); // bad

// An invalid second argument
query('/foo/bar', []); // bad

// Empty strings
query('', ''); // bad

// Misconfigured init object (missing a body property)
query('/foo', { cache: 'no-cache' }); // bad

// Misconfigured body property (did not use JSON.stringify())
query('/foo', { body: { query: '{foo bar}' } }); // bad

// if the first argument isn't an endpoint, nothing is fetched
query('I AM NOT A URL', '{ foo bar baz }'); // bad

// if the second argument is a string, but not a valid query string,
//      then the server won't be able to do anything with it
query('/foo', 'I AM NOT A STRING OF GRAPHQL FIELDS'); // bad
```

---

## API

### Quick Reference

```js
import { query, mutation } from 'wasp-graphql';
```

### `query(url: string, init: string | Object)`

```js
/**
 * Provides a thin, GQL-compliant wrapper over the Fetch API.
 *
 * SYNTAX: query(url, init)

 * @param {string} url - The url for the intended resource
 * @param {(string|Object)} init - Can be a string of fields or a configuration object
 * @param {string} [init.fields] - GQL fields: Will be added to the body of the request
 * @param {Object} [init.variables] - GQL variables: Will be added to the body of the request
 * // For additional valid arguments, see the Fetch API:
 * // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 *
 * Default init properties
 * @param {string} [init.method='POST']
 * @param {Object} [init.headers={ 'Content-Type': 'application/json', 'Accept': 'application/json' }]
 *
 * @returns {Promise}
 */

import { query } from 'wasp-graphql';
```

### `mutation(url: string, init: string | Object)`

Alias for `query`.

---

## Changelog

View it [here](CHANGELOG.md)

## Contributing

[Read more](CONTRIBUTING.md)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/10323609?v=4" width="100px;"/><br /><sub><b>Denny Temple</b></sub>](https://dentemple.com/)<br /> | [<img src="https://avatars2.githubusercontent.com/u/19364468?v=4" width="100px;"/><br /><sub><b>Reynolds A Colon</b></sub>](http://www.realized-technologies.com)<br /> | [<img src="https://avatars2.githubusercontent.com/u/23730068?v=4" width="100px;"/><br /><sub><b>kamo31</b></sub>](https://github.com/kamo31)<br /> | [<img src="https://avatars2.githubusercontent.com/u/19240166?v=4" width="100px;"/><br /><sub><b>marceca</b></sub>](https://github.com/marceca)<br /> |
| :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Code of Conduct

Read our Code of Conduct [here](CODE-OF-CONDUCT.md).

## License

Free and Open Source under the [MIT License](LICENSE).
